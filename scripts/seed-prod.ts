/**
 * Production Seed Script for ToolSchool
 * Fetches data from WordPress GraphQL and seeds to remote D1 database
 *
 * Run with: NODE_ENV=production npx tsx scripts/seed-prod.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const GRAPHQL_ENDPOINT = 'https://vibemakeprod.wpenginepowered.com/graphql'

// GraphQL query for tools
const GET_ALL_TOOLS = `
  query GetAllTools($first: Int = 100) {
    tools(first: $first) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        toolCategories {
          nodes {
            id
            name
            slug
            description
          }
        }
        toolFields {
          toolTagline
          toolWebsite
          toolFeatured
          toolPricingModel
          toolPricingSummary
          toolDifficulty
          toolUseCases
          toolPlatforms
          toolLogo {
            node {
              sourceUrl
              altText
              mediaItemUrl
            }
          }
          toolKeyFeatures {
            featureIcon
            featureTitle
            featureDescription
          }
          toolStats {
            statUsers
            statRating
            statCompany
            statYear
          }
        }
      }
    }
  }
`

// Map WordPress categories to our categories
const categoryMapping: Record<string, { slug: string; title: string; description: string; color: string }> = {
  'text-copywriting': { slug: 'writing', title: 'Writing', description: 'AI-powered text generation and editing', color: '#1a73e8' },
  'text / copywriting': { slug: 'writing', title: 'Writing', description: 'AI-powered text generation and editing', color: '#1a73e8' },
  'coding': { slug: 'building', title: 'Building', description: 'Develop AI-powered applications', color: '#fbbc04' },
  'image-generation': { slug: 'creating', title: 'Creating', description: 'Generate art, images, and creative content', color: '#e7131a' },
  'image generation': { slug: 'creating', title: 'Creating', description: 'Generate art, images, and creative content', color: '#e7131a' },
  'video-film': { slug: 'video', title: 'Video', description: 'AI video generation and editing', color: '#9c27b0' },
  'video / film': { slug: 'video', title: 'Video', description: 'AI video generation and editing', color: '#9c27b0' },
  'music-audio': { slug: 'audio', title: 'Audio', description: 'AI music and voice generation', color: '#ff5722' },
  'music / audio': { slug: 'audio', title: 'Audio', description: 'AI music and voice generation', color: '#ff5722' },
  'graphic-design': { slug: 'design', title: 'Design', description: 'AI-powered graphic design tools', color: '#00bcd4' },
  'graphic design': { slug: 'design', title: 'Design', description: 'AI-powered graphic design tools', color: '#00bcd4' },
  '3d': { slug: '3d', title: '3D', description: 'AI 3D modeling and generation', color: '#673ab7' },
  'website-app': { slug: 'building', title: 'Building', description: 'Develop AI-powered applications', color: '#fbbc04' },
  'website / app': { slug: 'building', title: 'Building', description: 'Develop AI-powered applications', color: '#fbbc04' },
  'presentation': { slug: 'creating', title: 'Creating', description: 'Generate art, images, and creative content', color: '#e7131a' },
}

// Tool categories for our system
const toolCategories = [
  { title: 'Creating', slug: 'creating', description: 'Generate art, images, and creative content', color: '#e7131a' },
  { title: 'Writing', slug: 'writing', description: 'AI-powered text generation and editing', color: '#1a73e8' },
  { title: 'Curating', slug: 'curating', description: 'Discover and organize AI content', color: '#34a853' },
  { title: 'Building', slug: 'building', description: 'Develop AI-powered applications', color: '#fbbc04' },
  { title: 'Video', slug: 'video', description: 'AI video generation and editing', color: '#9c27b0' },
  { title: 'Audio', slug: 'audio', description: 'AI music and voice generation', color: '#ff5722' },
  { title: 'Design', slug: 'design', description: 'AI-powered graphic design tools', color: '#00bcd4' },
  { title: '3D', slug: '3d', description: 'AI 3D modeling and generation', color: '#673ab7' },
]

// Other taxonomies
const creationTypes = [
  { title: 'Image', slug: 'image' },
  { title: 'Video', slug: 'video' },
  { title: 'Audio', slug: 'audio' },
  { title: 'Text', slug: 'text' },
  { title: 'Code', slug: 'code' },
  { title: '3D', slug: '3d' },
  { title: 'Design', slug: 'design' },
]

const makerSpecialties = [
  { title: 'AI Artist', slug: 'ai-artist' },
  { title: 'Prompt Engineer', slug: 'prompt-engineer' },
  { title: 'AI Developer', slug: 'ai-developer' },
  { title: 'AI Musician', slug: 'ai-musician' },
  { title: 'AI Writer', slug: 'ai-writer' },
  { title: 'AI Filmmaker', slug: 'ai-filmmaker' },
]

const communityTypes = [
  { title: 'Art', slug: 'art' },
  { title: 'Music', slug: 'music' },
  { title: 'Code', slug: 'code' },
  { title: 'Writing', slug: 'writing' },
  { title: 'Video', slug: 'video' },
  { title: 'Design', slug: 'design' },
]

const newsCategories = [
  { title: 'Product Launch', slug: 'product-launch' },
  { title: 'Industry News', slug: 'industry-news' },
  { title: 'Tutorial', slug: 'tutorial' },
  { title: 'Opinion', slug: 'opinion' },
  { title: 'Research', slug: 'research' },
]

const userSituations = [
  { title: 'Creator', slug: 'creator' },
  { title: 'Developer', slug: 'developer' },
  { title: 'Business', slug: 'business' },
  { title: 'Student', slug: 'student' },
  { title: 'Hobbyist', slug: 'hobbyist' },
]

function stripHtml(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

function mapPricingModel(wpModel: string): string {
  const mapping: Record<string, string> = {
    'freemium': 'freemium',
    'free': 'free',
    'paid': 'paid',
    'subscription': 'paid',
    'enterprise': 'enterprise',
  }
  return mapping[wpModel?.toLowerCase()] || 'freemium'
}

function mapDifficulty(wpDifficulty: string): string {
  const mapping: Record<string, string> = {
    'beginner': 'beginner',
    'intermediate': 'intermediate',
    'advanced': 'advanced',
  }
  return mapping[wpDifficulty?.toLowerCase()] || 'beginner'
}

async function fetchToolsFromWordPress(): Promise<any[]> {
  console.log('📡 Fetching tools from WordPress GraphQL...')

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GET_ALL_TOOLS, variables: { first: 100 } }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  if (data.errors) {
    console.error('GraphQL errors:', data.errors)
    throw new Error('GraphQL query failed')
  }

  return data.data?.tools?.nodes || []
}

async function seed() {
  console.log('🌱 Starting production seed process...\n')
  console.log('Environment:', process.env.NODE_ENV)

  const payload = await getPayload({ config })

  // Create taxonomies first
  console.log('\n📁 Creating tool categories...')
  const categoryMap: Record<string, number> = {}

  for (const cat of toolCategories) {
    try {
      const existing = await payload.find({
        collection: 'tool-categories',
        where: { slug: { equals: cat.slug } },
      })
      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'tool-categories',
          data: cat,
        })
        categoryMap[cat.slug] = created.id
        console.log(`  ✅ Created: ${cat.title}`)
      } else {
        categoryMap[cat.slug] = existing.docs[0].id
        console.log(`  ⏭️  Exists: ${cat.title}`)
      }
    } catch (error: any) {
      console.log(`  ❌ Error: ${cat.title} - ${error.message}`)
    }
  }

  // Creation types
  console.log('\n📁 Creating creation types...')
  for (const item of creationTypes) {
    try {
      const existing = await payload.find({
        collection: 'creation-types',
        where: { slug: { equals: item.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'creation-types', data: item })
        console.log(`  ✅ Created: ${item.title}`)
      } else {
        console.log(`  ⏭️  Exists: ${item.title}`)
      }
    } catch (error: any) {
      console.log(`  ❌ Error: ${item.title} - ${error.message}`)
    }
  }

  // Maker specialties
  console.log('\n📁 Creating maker specialties...')
  for (const item of makerSpecialties) {
    try {
      const existing = await payload.find({
        collection: 'maker-specialties',
        where: { slug: { equals: item.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'maker-specialties', data: item })
        console.log(`  ✅ Created: ${item.title}`)
      } else {
        console.log(`  ⏭️  Exists: ${item.title}`)
      }
    } catch (error: any) {
      console.log(`  ❌ Error: ${item.title} - ${error.message}`)
    }
  }

  // Community types
  console.log('\n📁 Creating community types...')
  for (const item of communityTypes) {
    try {
      const existing = await payload.find({
        collection: 'community-types',
        where: { slug: { equals: item.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'community-types', data: item })
        console.log(`  ✅ Created: ${item.title}`)
      } else {
        console.log(`  ⏭️  Exists: ${item.title}`)
      }
    } catch (error: any) {
      console.log(`  ❌ Error: ${item.title} - ${error.message}`)
    }
  }

  // News categories
  console.log('\n📁 Creating news categories...')
  for (const item of newsCategories) {
    try {
      const existing = await payload.find({
        collection: 'news-categories',
        where: { slug: { equals: item.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'news-categories', data: item })
        console.log(`  ✅ Created: ${item.title}`)
      } else {
        console.log(`  ⏭️  Exists: ${item.title}`)
      }
    } catch (error: any) {
      console.log(`  ❌ Error: ${item.title} - ${error.message}`)
    }
  }

  // User situations
  console.log('\n📁 Creating user situations...')
  for (const item of userSituations) {
    try {
      const existing = await payload.find({
        collection: 'user-situations',
        where: { slug: { equals: item.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'user-situations', data: item })
        console.log(`  ✅ Created: ${item.title}`)
      } else {
        console.log(`  ⏭️  Exists: ${item.title}`)
      }
    } catch (error: any) {
      console.log(`  ❌ Error: ${item.title} - ${error.message}`)
    }
  }

  // Fetch and import tools from WordPress
  console.log('\n🔧 Fetching and importing tools from WordPress...')
  const wpTools = await fetchToolsFromWordPress()
  console.log(`   Found ${wpTools.length} tools in WordPress\n`)

  // Track unique slugs to avoid duplicates
  const processedSlugs = new Set<string>()
  let created = 0
  let skipped = 0
  let errors = 0

  for (const wpTool of wpTools) {
    // Normalize slug - remove -2 suffix if exists
    let slug = wpTool.slug.replace(/-2$/, '')

    // Skip if already processed this slug
    if (processedSlugs.has(slug)) {
      console.log(`  ⏭️  Duplicate slug skipped: ${wpTool.title} (${wpTool.slug})`)
      skipped++
      continue
    }

    try {
      // Check if tool exists
      const existing = await payload.find({
        collection: 'tools',
        where: { slug: { equals: slug } },
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭️  Exists: ${wpTool.title}`)
        processedSlugs.add(slug)
        skipped++
        continue
      }

      // Map category
      let categoryId = null
      if (wpTool.toolCategories?.nodes?.length > 0) {
        const wpCatSlug = wpTool.toolCategories.nodes[0].slug.toLowerCase()
        const wpCatName = wpTool.toolCategories.nodes[0].name.toLowerCase()
        const mappedCat = categoryMapping[wpCatSlug] || categoryMapping[wpCatName]
        if (mappedCat) {
          categoryId = categoryMap[mappedCat.slug]
        }
      }

      // Parse key features
      const keyFeatures = wpTool.toolFields?.toolKeyFeatures?.map((f: any) => ({
        title: f.featureTitle || '',
        description: f.featureDescription || '',
      })).filter((f: any) => f.title) || []

      // Build tool data - ensure tagline has a value (max 120 chars)
      let tagline = wpTool.toolFields?.toolTagline || stripHtml(wpTool.excerpt) || `${wpTool.title} - AI Tool`
      // Truncate tagline to 120 chars if needed
      if (tagline.length > 120) {
        tagline = tagline.substring(0, 117) + '...'
      }
      const toolData: any = {
        title: wpTool.title,
        slug: slug,
        tagline: tagline,
        excerpt: stripHtml(wpTool.excerpt) || tagline,
        website: wpTool.toolFields?.toolWebsite || '',
        pricingModel: mapPricingModel(wpTool.toolFields?.toolPricingModel),
        pricingSummary: wpTool.toolFields?.toolPricingSummary || '',
        difficulty: mapDifficulty(wpTool.toolFields?.toolDifficulty),
        featured: wpTool.toolFields?.toolFeatured || false,
        toolCategory: categoryId,
        keyFeatures: keyFeatures.slice(0, 6),
        stats: {
          users: wpTool.toolFields?.toolStats?.statUsers || '',
          rating: wpTool.toolFields?.toolStats?.statRating || null,
          company: wpTool.toolFields?.toolStats?.statCompany || '',
          launchYear: wpTool.toolFields?.toolStats?.statYear || null,
        },
      }

      await payload.create({
        collection: 'tools',
        data: toolData,
      })

      processedSlugs.add(slug)
      created++
      console.log(`  ✅ Created: ${wpTool.title}`)
    } catch (error: any) {
      errors++
      // Get more error details
      const errDetails = error.data?.errors?.[0]?.message || error.message
      console.log(`  ❌ Error: ${wpTool.title} - ${errDetails}`)
      if (error.data?.errors) {
        console.log(`     Details: ${JSON.stringify(error.data.errors)}`)
      }
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary:')
  console.log(`   Tools created: ${created}`)
  console.log(`   Tools skipped: ${skipped}`)
  console.log(`   Errors: ${errors}`)
  console.log('='.repeat(50))

  console.log('\n✨ Production seed complete!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
