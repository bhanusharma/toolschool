/**
 * Script to seed Vectorize index with all existing content
 * Run with: npx tsx scripts/seed-vectorize.ts
 *
 * Note: This script must be run after deploying to Cloudflare Workers
 * as it uses the deployed API endpoint to index content.
 */

import 'dotenv/config'

const API_BASE = process.env.SITE_URL || 'https://toolschool.bhanusharma.workers.dev'

interface ContentItem {
  id: string | number
  title: string
  slug: string
  type: string
  description?: string
  category?: string
  image?: string
}

async function fetchAllContent(): Promise<ContentItem[]> {
  const items: ContentItem[] = []

  // Fetch tools
  try {
    const toolsRes = await fetch(`${API_BASE}/api/tools?limit=1000`)
    const toolsData = await toolsRes.json()
    if (toolsData.docs) {
      for (const tool of toolsData.docs) {
        items.push({
          id: tool.id,
          title: tool.title,
          slug: tool.slug,
          type: 'tool',
          description: tool.tagline || tool.excerpt,
          category: tool.toolCategory?.title,
          image: tool.logo?.url,
        })
      }
    }
    console.log(`Fetched ${toolsData.docs?.length || 0} tools`)
  } catch (error) {
    console.error('Error fetching tools:', error)
  }

  // Fetch builders
  try {
    const buildersRes = await fetch(`${API_BASE}/api/builders?limit=1000`)
    const buildersData = await buildersRes.json()
    if (buildersData.docs) {
      for (const builder of buildersData.docs) {
        items.push({
          id: builder.id,
          title: builder.title,
          slug: builder.slug,
          type: 'builder',
          description: builder.bio,
          category: builder.specialties?.[0]?.title,
          image: builder.profileImage?.url,
        })
      }
    }
    console.log(`Fetched ${buildersData.docs?.length || 0} builders`)
  } catch (error) {
    console.error('Error fetching builders:', error)
  }

  // Fetch projects
  try {
    const projectsRes = await fetch(`${API_BASE}/api/projects?limit=1000`)
    const projectsData = await projectsRes.json()
    if (projectsData.docs) {
      for (const project of projectsData.docs) {
        items.push({
          id: project.id,
          title: project.title,
          slug: project.slug,
          type: 'project',
          description: project.excerpt,
          category: project.communityType?.title,
          image: project.featuredImage?.url,
        })
      }
    }
    console.log(`Fetched ${projectsData.docs?.length || 0} projects`)
  } catch (error) {
    console.error('Error fetching projects:', error)
  }

  // Fetch posts
  try {
    const postsRes = await fetch(`${API_BASE}/api/posts?limit=1000`)
    const postsData = await postsRes.json()
    if (postsData.docs) {
      for (const post of postsData.docs) {
        items.push({
          id: post.id,
          title: post.title,
          slug: post.slug,
          type: 'post',
          description: post.excerpt,
          category: post.categoryBadge,
          image: post.featuredImage?.url,
        })
      }
    }
    console.log(`Fetched ${postsData.docs?.length || 0} posts`)
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  // Fetch tutorials
  try {
    const tutorialsRes = await fetch(`${API_BASE}/api/tutorials?limit=1000`)
    const tutorialsData = await tutorialsRes.json()
    if (tutorialsData.docs) {
      for (const tutorial of tutorialsData.docs) {
        items.push({
          id: tutorial.id,
          title: tutorial.title,
          slug: tutorial.slug,
          type: 'tutorial',
          description: tutorial.subtitle || tutorial.excerpt,
          category: tutorial.difficulty,
          image: tutorial.featuredImage?.url,
        })
      }
    }
    console.log(`Fetched ${tutorialsData.docs?.length || 0} tutorials`)
  } catch (error) {
    console.error('Error fetching tutorials:', error)
  }

  return items
}

async function indexContent(items: ContentItem[]): Promise<void> {
  // Batch items in groups of 20 (Workers AI has limits)
  const batchSize = 20
  let indexed = 0

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)

    try {
      const response = await fetch(`${API_BASE}/api/semantic-search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: batch }),
      })

      if (response.ok) {
        const result = await response.json()
        indexed += result.indexed || batch.length
        console.log(`Indexed batch ${Math.floor(i / batchSize) + 1}: ${result.indexed || batch.length} items`)
      } else {
        const error = await response.text()
        console.error(`Error indexing batch ${Math.floor(i / batchSize) + 1}:`, error)
      }
    } catch (error) {
      console.error(`Error indexing batch ${Math.floor(i / batchSize) + 1}:`, error)
    }

    // Small delay between batches to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log(`\nTotal indexed: ${indexed} items`)
}

async function main() {
  console.log('Starting Vectorize index seeding...')
  console.log(`API Base: ${API_BASE}\n`)

  const items = await fetchAllContent()
  console.log(`\nTotal items to index: ${items.length}\n`)

  if (items.length === 0) {
    console.log('No items to index. Exiting.')
    return
  }

  await indexContent(items)
  console.log('\nVectorize index seeding complete!')
}

main().catch(console.error)
