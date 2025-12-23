import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getCloudflareContext } from '@opennextjs/cloudflare'

// Force dynamic to prevent prerendering issues
export const dynamic = 'force-dynamic'

interface SearchResult {
  id: string | number
  title: string
  slug: string
  type: 'tool' | 'builder' | 'project' | 'post' | 'tutorial'
  description?: string
  category?: string
  score: number
  image?: string
  semantic?: boolean // Flag for semantic search results
}

// Category keywords for boosting relevance (10 categories)
const categoryKeywords: Record<string, string[]> = {
  writing: ['write', 'text', 'content', 'copy', 'article', 'blog', 'essay', 'grammar', 'editor'],
  image: ['image', 'photo', 'picture', 'art', 'visual', 'design', 'generate', 'create'],
  video: ['video', 'film', 'movie', 'clip', 'animation', 'editing', 'footage'],
  audio: ['audio', 'music', 'sound', 'voice', 'song', 'podcast', 'speech'],
  automation: ['automate', 'workflow', 'integrate', 'zapier', 'task', 'process', 'bot'],
  chatbots: ['chat', 'conversation', 'assistant', 'ai', 'gpt', 'claude', 'gemini', 'llm'],
  marketing: ['marketing', 'seo', 'ads', 'content', 'social', 'campaign', 'analytics'],
  data: ['data', 'analytics', 'dashboard', 'visualization', 'chart', 'spreadsheet', 'ml'],
  building: ['build', 'code', 'app', 'website', 'develop', 'no-code', 'low-code'],
  '3d': ['3d', 'model', 'render', 'mesh', 'texture', 'sculpt', 'blender'],
}

// Simple relevance scoring based on match position and field importance
function calculateScore(
  query: string,
  title: string,
  description?: string,
  category?: string,
  isFeatured?: boolean
): number {
  const q = query.toLowerCase()
  const t = title.toLowerCase()
  const d = (description || '').toLowerCase()
  const cat = (category || '').toLowerCase()

  let score = 0

  // Exact title match (highest priority)
  if (t === q) score += 100

  // Title starts with query
  if (t.startsWith(q)) score += 50

  // Title contains query
  if (t.includes(q)) score += 30

  // Description contains query
  if (d.includes(q)) score += 10

  // Category match boost - if searching for a category name
  if (cat === q || cat.includes(q)) score += 40

  // Category keyword boost - if query matches category keywords
  for (const [catSlug, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => q.includes(kw) || kw.includes(q))) {
      if (cat === catSlug || cat.toLowerCase() === catSlug) {
        score += 25 // Boost if tool is in the matching category
      }
    }
  }

  // Featured boost
  if (isFeatured) score += 15

  return score
}

// Semantic search using Vectorize
async function performSemanticSearch(
  query: string,
  limit: number
): Promise<SearchResult[]> {
  try {
    const context = await getCloudflareContext({ async: true })
    const { VECTORIZE, AI } = context.env

    if (!VECTORIZE || !AI) {
      return [] // Fall back gracefully if bindings not available
    }

    // Generate embedding for the search query
    const embeddingResponse = await AI.run('@cf/baai/bge-base-en-v1.5', {
      text: [query],
    })

    // Type guard: check if it's the async response (no data) or the embedding response
    if (!('data' in embeddingResponse) || !embeddingResponse.data || embeddingResponse.data.length === 0) {
      return []
    }

    const queryEmbedding = embeddingResponse.data[0]

    // Query Vectorize for similar vectors
    const searchResults = await VECTORIZE.query(queryEmbedding, {
      topK: limit,
      returnMetadata: 'all',
    })

    // Transform to SearchResult format
    return searchResults.matches.map((match) => {
      const metadata = match.metadata as {
        title?: string
        slug?: string
        type?: string
        description?: string
        category?: string
        image?: string
      }
      return {
        id: match.id,
        title: metadata.title || '',
        slug: metadata.slug || '',
        type: (metadata.type || 'tool') as SearchResult['type'],
        description: metadata.description,
        category: metadata.category,
        score: Math.round(match.score * 100), // Normalize to 0-100 scale
        image: metadata.image,
        semantic: true,
      }
    })
  } catch (error) {
    console.error('Semantic search error:', error)
    return []
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const limit = Math.min(parseInt(searchParams.get('limit') || '14'), 50)
  const types = searchParams.get('types')?.split(',') || ['tool', 'builder', 'project', 'post', 'tutorial']
  const useHybrid = searchParams.get('hybrid') !== 'false' // Enable hybrid by default

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

    // Check if query matches a category name (for searches like "automation", "data tools", etc.)
    const categoryNames = ['writing', 'image', 'video', 'audio', 'automation', 'chatbots', 'marketing', 'data', 'building', '3d']
    const queryLower = query.toLowerCase()
    const matchedCategory = categoryNames.find(cat =>
      queryLower === cat ||
      queryLower.includes(cat) ||
      cat.includes(queryLower)
    )

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
            res.docs.map((doc) => {
              const category = typeof doc.toolCategory === 'object' ? doc.toolCategory?.title : undefined
              return {
                id: doc.id,
                title: doc.title,
                slug: doc.slug,
                type: 'tool' as const,
                description: doc.tagline || doc.excerpt || undefined,
                category,
                score: calculateScore(query, doc.title, doc.tagline || doc.excerpt, category, doc.featured),
                image: typeof doc.logo === 'object' ? doc.logo?.url : undefined,
              }
            })
          )
          .catch((): SearchResult[] => [])
      )

      // If query matches a category, also search for tools in that category
      if (matchedCategory) {
        searchPromises.push(
          payload
            .find({
              collection: 'tools',
              where: {
                'toolCategory.slug': { equals: matchedCategory },
              },
              limit: limit,
              depth: 1,
            })
            .then((res) =>
              res.docs.map((doc) => {
                const category = typeof doc.toolCategory === 'object' ? doc.toolCategory?.title : undefined
                return {
                  id: doc.id,
                  title: doc.title,
                  slug: doc.slug,
                  type: 'tool' as const,
                  description: doc.tagline || doc.excerpt || undefined,
                  category,
                  score: calculateScore(query, doc.title, doc.tagline || doc.excerpt, category, doc.featured) + 20, // Boost for category match
                  image: typeof doc.logo === 'object' ? doc.logo?.url : undefined,
                }
              })
            )
            .catch((): SearchResult[] => [])
        )
      }
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
            res.docs.map((doc) => {
              const category = Array.isArray(doc.specialties) && doc.specialties[0] && typeof doc.specialties[0] === 'object' ? (doc.specialties[0] as { title?: string }).title : undefined
              return {
                id: doc.id,
                title: doc.title,
                slug: doc.slug,
                type: 'builder' as const,
                description: doc.bio || undefined,
                category,
                score: calculateScore(query, doc.title, doc.bio, category, doc.featured),
                image: typeof doc.profileImage === 'object' ? doc.profileImage?.url : undefined,
              }
            })
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
            res.docs.map((doc) => {
              const category = typeof doc.communityType === 'object' ? doc.communityType?.title : undefined
              return {
                id: doc.id,
                title: doc.title,
                slug: doc.slug,
                type: 'project' as const,
                description: doc.excerpt || undefined,
                category,
                score: calculateScore(query, doc.title, doc.excerpt, category, doc.featuredInHero || doc.featuredInShowcase),
                image: typeof doc.featuredImage === 'object' ? doc.featuredImage?.url : undefined,
              }
            })
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
            res.docs.map((doc) => {
              const category = doc.categoryBadge || undefined
              return {
                id: doc.id,
                title: doc.title,
                slug: doc.slug,
                type: 'post' as const,
                description: doc.excerpt || undefined,
                category,
                score: calculateScore(query, doc.title, doc.excerpt, category, false),
                image: typeof doc.featuredImage === 'object' ? doc.featuredImage?.url : undefined,
              }
            })
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
            res.docs.map((doc) => {
              const category = doc.difficulty || undefined
              return {
                id: doc.id,
                title: doc.title,
                slug: doc.slug,
                type: 'tutorial' as const,
                description: doc.subtitle || doc.excerpt || undefined,
                category,
                score: calculateScore(query, doc.title, doc.subtitle || doc.excerpt, category, doc.featured),
                image: typeof doc.featuredImage === 'object' ? doc.featuredImage?.url : undefined,
              }
            })
          )
          .catch((): SearchResult[] => [])
      )
    }

    // Add semantic search if hybrid is enabled
    if (useHybrid) {
      searchPromises.push(performSemanticSearch(query, Math.ceil(limit / 2)))
    }

    // Wait for all searches to complete
    const allResults = await Promise.all(searchPromises)

    // Flatten all results
    const flatResults = allResults.flat()

    // Deduplicate results by slug+type (prefer keyword matches over semantic)
    const seen = new Set<string>()
    const deduped: SearchResult[] = []

    // Sort by score first to prioritize higher-scoring matches
    flatResults.sort((a, b) => b.score - a.score)

    for (const result of flatResults) {
      const key = `${result.type}-${result.slug}`
      if (!seen.has(key)) {
        seen.add(key)
        deduped.push(result)
      }
    }

    // Limit final results
    const results = deduped.slice(0, limit)

    return NextResponse.json({
      results,
      query,
      total: results.length,
      hybrid: useHybrid,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [], query, total: 0 },
      { status: 500 }
    )
  }
}
