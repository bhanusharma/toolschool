/**
 * Migration script to re-categorize tools to new 10 categories
 * Run with: NODE_ENV=production npx tsx scripts/migrate-categories.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Category IDs from production database
const CATEGORIES = {
  writing: 2,
  curating: 3,    // OLD - to be removed
  building: 4,
  video: 5,
  audio: 6,
  design: 7,      // OLD - migrate to image
  '3d': 8,
  image: 9,       // NEW
  automation: 10, // NEW
  chatbots: 11,   // NEW
  marketing: 12,  // NEW
  data: 13,       // NEW
  creating: 1,    // OLD - migrate to image
}

// Migration mapping: tool slug -> new category ID
const migrations: Record<string, number> = {
  // Creating -> Image (visual content tools)
  'tome': CATEGORIES.marketing,          // Presentation tool -> Marketing
  'gamma': CATEGORIES.marketing,         // Presentation tool -> Marketing
  'runway-ml': CATEGORIES.video,         // Video tool
  
  // Design -> Image
  'canva-magic-studio': CATEGORIES.image,
  'adobe-firefly': CATEGORIES.image,
  'figma-ai': CATEGORIES.image,
  
  // No category -> Image (image generation)
  'dall-e-3': CATEGORIES.image,
  'stable-diffusion': CATEGORIES.image,
  'midjourney': CATEGORIES.image,
  'stability-ai': CATEGORIES.image,
  'leonardo-ai': CATEGORIES.image,
  'ideogram': CATEGORIES.image,
  'maker': CATEGORIES.image,
  
  // No category -> Correct categories
  'chatgpt': CATEGORIES.chatbots,        // Conversational AI
  'eleven-labs': CATEGORIES.audio,
  'pika': CATEGORIES.video,
  'character-ai': CATEGORIES.chatbots,
  'notebooklm': CATEGORIES.chatbots,     // AI assistant/research
  'flux': CATEGORIES.image,              // Image gen, not video
  
  // Re-categorize from Writing
  'zapier-ai': CATEGORIES.automation,    // Workflow automation
  'clay': CATEGORIES.marketing,          // Sales/data enrichment
  'perplexity': CATEGORIES.chatbots,     // AI search assistant
  'google-gemini': CATEGORIES.chatbots,  // Conversational AI
  'deepseek': CATEGORIES.chatbots,       // Conversational AI
  'harvey-ai': CATEGORIES.chatbots,      // Legal AI assistant
}

async function migrate() {
  console.log('🔄 Starting category migration...\n')
  
  const payload = await getPayload({ config })
  
  let updated = 0
  let skipped = 0
  let errors = 0
  
  for (const [slug, newCategoryId] of Object.entries(migrations)) {
    try {
      // Find the tool
      const result = await payload.find({
        collection: 'tools',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      
      if (result.docs.length === 0) {
        console.log(`  ⏭️  Not found: ${slug}`)
        skipped++
        continue
      }
      
      const tool = result.docs[0]
      const currentCatId = typeof tool.toolCategory === 'object' 
        ? tool.toolCategory?.id 
        : tool.toolCategory
      
      if (currentCatId === newCategoryId) {
        console.log(`  ⏭️  Already correct: ${tool.title}`)
        skipped++
        continue
      }
      
      // Update the tool
      await payload.update({
        collection: 'tools',
        id: tool.id,
        data: {
          toolCategory: newCategoryId,
        },
      })
      
      console.log(`  ✅ Updated: ${tool.title} -> Category ID ${newCategoryId}`)
      updated++
    } catch (error: any) {
      console.log(`  ❌ Error: ${slug} - ${error.message}`)
      errors++
    }
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('📊 Migration Summary:')
  console.log(`   Updated: ${updated}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Errors: ${errors}`)
  console.log('='.repeat(50))
  
  process.exit(0)
}

migrate().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
