/**
 * Seed script for ToolSchool Payload CMS
 * Run with: npx tsx scripts/seed.ts
 *
 * This script:
 * 1. Creates taxonomy entries (tool categories, creation types, etc.)
 * 2. Imports tools from WordPress data (if available)
 * 3. Creates sample makers and projects
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Tool Categories with colors
const toolCategories = [
  { title: 'Creating', slug: 'creating', description: 'Generate art, images, and creative content', color: '#e7131a' },
  { title: 'Writing', slug: 'writing', description: 'AI-powered text generation and editing', color: '#1a73e8' },
  { title: 'Curating', slug: 'curating', description: 'Discover and organize AI content', color: '#34a853' },
  { title: 'Building', slug: 'building', description: 'Develop AI-powered applications', color: '#fbbc04' },
  { title: 'Video', slug: 'video', description: 'AI video generation and editing', color: '#9c27b0' },
  { title: 'Audio', slug: 'audio', description: 'AI music and voice generation', color: '#ff5722' },
]

// Creation Types
const creationTypes = [
  { title: 'Image', slug: 'image' },
  { title: 'Video', slug: 'video' },
  { title: 'Audio', slug: 'audio' },
  { title: 'Text', slug: 'text' },
  { title: 'Code', slug: 'code' },
  { title: '3D', slug: '3d' },
  { title: 'Design', slug: 'design' },
]

// Maker Specialties
const makerSpecialties = [
  { title: 'AI Artist', slug: 'ai-artist' },
  { title: 'Prompt Engineer', slug: 'prompt-engineer' },
  { title: 'AI Developer', slug: 'ai-developer' },
  { title: 'AI Musician', slug: 'ai-musician' },
  { title: 'AI Writer', slug: 'ai-writer' },
  { title: 'AI Filmmaker', slug: 'ai-filmmaker' },
]

// Community Types
const communityTypes = [
  { title: 'Art', slug: 'art' },
  { title: 'Music', slug: 'music' },
  { title: 'Code', slug: 'code' },
  { title: 'Writing', slug: 'writing' },
  { title: 'Video', slug: 'video' },
  { title: 'Design', slug: 'design' },
]

// News Categories
const newsCategories = [
  { title: 'Product Launch', slug: 'product-launch' },
  { title: 'Industry News', slug: 'industry-news' },
  { title: 'Tutorial', slug: 'tutorial' },
  { title: 'Opinion', slug: 'opinion' },
  { title: 'Research', slug: 'research' },
]

// User Situations
const userSituations = [
  { title: 'Creator', slug: 'creator' },
  { title: 'Developer', slug: 'developer' },
  { title: 'Business', slug: 'business' },
  { title: 'Student', slug: 'student' },
  { title: 'Hobbyist', slug: 'hobbyist' },
]

// Sample tools data (fallback if no WP data)
const sampleTools = [
  {
    title: 'ChatGPT',
    slug: 'chatgpt',
    tagline: 'Advanced conversational AI for writing, coding, and creative tasks',
    excerpt: 'ChatGPT is an advanced conversational AI developed by OpenAI.',
    website: 'https://chat.openai.com',
    pricingModel: 'freemium',
    pricingSummary: 'Free / $20/month',
    difficulty: 'beginner',
    featured: true,
    category: 'writing',
    platforms: ['web', 'ios', 'android'],
    stats: {
      users: '200M+ weekly',
      rating: 4.8,
      company: 'OpenAI',
      launchYear: 2022,
    },
    keyFeatures: [
      { title: 'Natural Conversation', description: 'Engage in human-like dialogue' },
      { title: 'Code Generation', description: 'Write and debug code in multiple languages' },
      { title: 'Creative Writing', description: 'Generate stories, poems, and content' },
    ],
  },
  {
    title: 'Midjourney',
    slug: 'midjourney',
    tagline: 'AI image generation tool for creating stunning visual art',
    excerpt: 'Create dreamlike, artistic imagery from text descriptions.',
    website: 'https://midjourney.com',
    pricingModel: 'paid',
    pricingSummary: '$10-60/month',
    difficulty: 'intermediate',
    featured: true,
    category: 'creating',
    platforms: ['discord'],
    stats: {
      users: '15M+',
      rating: 4.9,
      company: 'Midjourney Inc',
      launchYear: 2022,
    },
    keyFeatures: [
      { title: 'Text-to-Image', description: 'Generate images from text prompts' },
      { title: 'Artistic Styles', description: 'Unique painterly aesthetic' },
      { title: 'High Resolution', description: 'Up to 2048x2048 images' },
    ],
  },
  {
    title: 'Claude',
    slug: 'claude',
    tagline: "Anthropic's helpful, harmless, and honest AI assistant",
    excerpt: 'Claude excels at analysis, writing, coding, and math.',
    website: 'https://claude.ai',
    pricingModel: 'freemium',
    pricingSummary: 'Free / $20/month',
    difficulty: 'beginner',
    featured: true,
    category: 'writing',
    platforms: ['web', 'api'],
    stats: {
      users: '100M+',
      rating: 4.7,
      company: 'Anthropic',
      launchYear: 2023,
    },
    keyFeatures: [
      { title: 'Long Context', description: '200K token context window' },
      { title: 'Artifacts', description: 'Create interactive documents and code' },
      { title: 'Safe AI', description: 'Constitutional AI for safety' },
    ],
  },
  {
    title: 'Cursor',
    slug: 'cursor',
    tagline: 'AI-first code editor for enhanced programming',
    excerpt: 'AI-powered code editor built for pair programming with AI.',
    website: 'https://cursor.sh',
    pricingModel: 'freemium',
    pricingSummary: 'Free / $20/month',
    difficulty: 'intermediate',
    featured: true,
    category: 'building',
    platforms: ['mac', 'windows', 'linux'],
    stats: {
      users: '1M+',
      rating: 4.8,
      company: 'Anysphere',
      launchYear: 2023,
    },
    keyFeatures: [
      { title: 'AI Code Completion', description: 'Context-aware suggestions' },
      { title: 'Chat Integration', description: 'Chat with your codebase' },
      { title: 'Multi-file Edits', description: 'Edit multiple files at once' },
    ],
  },
  {
    title: 'Runway',
    slug: 'runway',
    tagline: 'AI platform for video and creative content generation',
    excerpt: 'Industry-leading AI video generation and editing.',
    website: 'https://runwayml.com',
    pricingModel: 'freemium',
    pricingSummary: 'Free tier / $12+/month',
    difficulty: 'intermediate',
    featured: false,
    category: 'video',
    platforms: ['web'],
    stats: {
      users: '5M+',
      rating: 4.6,
      company: 'Runway',
      launchYear: 2018,
    },
    keyFeatures: [
      { title: 'Gen-3 Alpha', description: 'State-of-the-art video generation' },
      { title: 'Video Editing', description: 'AI-powered video editing tools' },
      { title: 'Image to Video', description: 'Animate still images' },
    ],
  },
  {
    title: 'Suno',
    slug: 'suno',
    tagline: 'Full song generation with AI',
    excerpt: 'Create complete songs with lyrics, vocals, and music.',
    website: 'https://suno.ai',
    pricingModel: 'freemium',
    pricingSummary: 'Free / $10+/month',
    difficulty: 'beginner',
    featured: false,
    category: 'audio',
    platforms: ['web'],
    stats: {
      users: '10M+',
      rating: 4.7,
      company: 'Suno AI',
      launchYear: 2023,
    },
    keyFeatures: [
      { title: 'Full Songs', description: 'Generate complete songs with lyrics' },
      { title: 'Multiple Genres', description: 'Create in any musical style' },
      { title: 'Custom Lyrics', description: 'Use your own lyrics' },
    ],
  },
]

async function seed() {
  console.log('🌱 Starting seed process...\n')

  const payload = await getPayload({ config })

  // Create taxonomies
  console.log('📁 Creating tool categories...')
  const categoryMap: Record<string, string> = {}
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
    } catch (error) {
      console.log(`  ❌ Error creating ${cat.title}:`, error)
    }
  }

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
    } catch (error) {
      console.log(`  ❌ Error creating ${item.title}:`, error)
    }
  }

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
    } catch (error) {
      console.log(`  ❌ Error creating ${item.title}:`, error)
    }
  }

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
    } catch (error) {
      console.log(`  ❌ Error creating ${item.title}:`, error)
    }
  }

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
    } catch (error) {
      console.log(`  ❌ Error creating ${item.title}:`, error)
    }
  }

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
    } catch (error) {
      console.log(`  ❌ Error creating ${item.title}:`, error)
    }
  }

  // Create tools
  console.log('\n🔧 Creating tools...')
  for (const tool of sampleTools) {
    try {
      const existing = await payload.find({
        collection: 'tools',
        where: { slug: { equals: tool.slug } },
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'tools',
          data: {
            title: tool.title,
            slug: tool.slug,
            tagline: tool.tagline,
            excerpt: tool.excerpt,
            website: tool.website,
            pricingModel: tool.pricingModel,
            pricingSummary: tool.pricingSummary,
            difficulty: tool.difficulty,
            featured: tool.featured,
            toolCategory: categoryMap[tool.category] || null,
            platforms: tool.platforms,
            stats: tool.stats,
            keyFeatures: tool.keyFeatures,
          },
        })
        console.log(`  ✅ Created: ${tool.title}`)
      } else {
        console.log(`  ⏭️  Exists: ${tool.title}`)
      }
    } catch (error) {
      console.log(`  ❌ Error creating ${tool.title}:`, error)
    }
  }

  console.log('\n✨ Seed complete!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
