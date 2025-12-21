import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

interface SearchResult {
  id: string | number
  title: string
  slug: string
  type: 'tool' | 'builder' | 'project' | 'post' | 'tutorial'
  description?: string
  category?: string
  score: number
  image?: string
}

// Simple relevance scoring based on match position and field importance
function calculateScore(
  query: string,
  title: string,
  description?: string,
  isFeatured?: boolean
): number {
  const q = query.toLowerCase()
  const t = title.toLowerCase()
  const d = (description || '').toLowerCase()

  let score = 0

  // Exact title match (highest priority)
  if (t === q) score += 100

  // Title starts with query
  if (t.startsWith(q)) score += 50

  // Title contains query
  if (t.includes(q)) score += 30

  // Description contains query
  if (d.includes(q)) score += 10

  // Featured boost
  if (isFeatured) score += 15

  return score
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const limit = Math.min(parseInt(searchParams.get('limit') || '14'), 50)
  const types = searchParams.get('types')?.split(',') || ['tool', 'builder', 'project', 'post', 'tutorial']

  if (!query.trim()) {
    return NextResponse.json({
      results: [],
      query: '',
      total: 0,
    })
  }

  try {
    const payload = await getPayload({ config })

    // Run all searches in parallel for maximum performance
    const searchPromises: Promise<SearchResult[]>[] = []

    // Tools search
    if (types.includes('tool')) {
      searchPromises.push(
        payload
          .find({
            collection: 'tools',
            where: {
              or: [
                { title: { contains: query } },
                { tagline: { contains: query } },
                { excerpt: { contains: query } },
              ],
            },
            limit: limit,
            depth: 1,
          })
          .then((res) =>
            res.docs.map((doc) => ({
              id: doc.id,
              title: doc.title,
              slug: doc.slug,
              type: 'tool' as const,
              description: doc.tagline || doc.excerpt || undefined,
              category: typeof doc.toolCategory === 'object' ? doc.toolCategory?.title : undefined,
              score: calculateScore(query, doc.title, doc.tagline || doc.excerpt, doc.featured),
              image: typeof doc.logo === 'object' ? doc.logo?.url : undefined,
            }))
          )
          .catch((): SearchResult[] => [])
      )
    }

    // Builders search
    if (types.includes('builder')) {
      searchPromises.push(
        payload
          .find({
            collection: 'builders',
            where: {
              or: [
                { title: { contains: query } },
                { bio: { contains: query } },
              ],
            },
            limit: Math.ceil(limit / 3),
            depth: 1,
          })
          .then((res) =>
            res.docs.map((doc) => ({
              id: doc.id,
              title: doc.title,
              slug: doc.slug,
              type: 'builder' as const,
              description: doc.bio || undefined,
              category: Array.isArray(doc.specialties) && doc.specialties[0] && typeof doc.specialties[0] === 'object' ? (doc.specialties[0] as { title?: string }).title : undefined,
              score: calculateScore(query, doc.title, doc.bio, doc.featured),
              image: typeof doc.profileImage === 'object' ? doc.profileImage?.url : undefined,
            }))
          )
          .catch((): SearchResult[] => [])
      )
    }

    // Projects search
    if (types.includes('project')) {
      searchPromises.push(
        payload
          .find({
            collection: 'projects',
            where: {
              or: [
                { title: { contains: query } },
                { excerpt: { contains: query } },
              ],
            },
            limit: Math.ceil(limit / 3),
            depth: 1,
          })
          .then((res) =>
            res.docs.map((doc) => ({
              id: doc.id,
              title: doc.title,
              slug: doc.slug,
              type: 'project' as const,
              description: doc.excerpt || undefined,
              category: typeof doc.communityType === 'object' ? doc.communityType?.title : undefined,
              score: calculateScore(query, doc.title, doc.excerpt, doc.featuredInHero || doc.featuredInShowcase),
              image: typeof doc.featuredImage === 'object' ? doc.featuredImage?.url : undefined,
            }))
          )
          .catch((): SearchResult[] => [])
      )
    }

    // Posts search
    if (types.includes('post')) {
      searchPromises.push(
        payload
          .find({
            collection: 'posts',
            where: {
              or: [
                { title: { contains: query } },
                { excerpt: { contains: query } },
              ],
            },
            limit: Math.ceil(limit / 3),
            depth: 1,
          })
          .then((res) =>
            res.docs.map((doc) => ({
              id: doc.id,
              title: doc.title,
              slug: doc.slug,
              type: 'post' as const,
              description: doc.excerpt || undefined,
              category: doc.categoryBadge || undefined,
              score: calculateScore(query, doc.title, doc.excerpt, false),
              image: typeof doc.featuredImage === 'object' ? doc.featuredImage?.url : undefined,
            }))
          )
          .catch((): SearchResult[] => [])
      )
    }

    // Tutorials search
    if (types.includes('tutorial')) {
      searchPromises.push(
        payload
          .find({
            collection: 'tutorials',
            where: {
              or: [
                { title: { contains: query } },
                { subtitle: { contains: query } },
                { excerpt: { contains: query } },
              ],
            },
            limit: Math.ceil(limit / 3),
            depth: 1,
          })
          .then((res) =>
            res.docs.map((doc) => ({
              id: doc.id,
              title: doc.title,
              slug: doc.slug,
              type: 'tutorial' as const,
              description: doc.subtitle || doc.excerpt || undefined,
              category: doc.difficulty || undefined,
              score: calculateScore(query, doc.title, doc.subtitle || doc.excerpt, doc.featured),
              image: typeof doc.featuredImage === 'object' ? doc.featuredImage?.url : undefined,
            }))
          )
          .catch((): SearchResult[] => [])
      )
    }

    // Wait for all searches to complete
    const allResults = await Promise.all(searchPromises)

    // Flatten, sort by score, and limit results
    const results = allResults
      .flat()
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)

    return NextResponse.json({
      results,
      query,
      total: results.length,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [], query, total: 0 },
      { status: 500 }
    )
  }
}
