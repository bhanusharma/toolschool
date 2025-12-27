/**
 * Migration script using direct D1 database access via wrangler
 * Run with: npx wrangler d1 execute toolschool-db --remote --command "SQL HERE"
 */

// Category IDs from production database
const CATEGORIES = {
  writing: 2,
  building: 4,
  video: 5,
  audio: 6,
  '3d': 8,
  image: 9,       // NEW
  automation: 10, // NEW
  chatbots: 11,   // NEW
  marketing: 12,  // NEW
  data: 13,       // NEW
}

// Migration mapping: tool slug -> new category ID
const migrations: Record<string, number> = {
  // Creating/Design -> Image (visual content tools)
  'tome': CATEGORIES.marketing,
  'gamma': CATEGORIES.marketing,
  'runway-ml': CATEGORIES.video,
  'canva-magic-studio': CATEGORIES.image,
  'adobe-firefly': CATEGORIES.image,
  'figma-ai': CATEGORIES.image,
  
  // No category -> Image
  'dall-e-3': CATEGORIES.image,
  'stable-diffusion': CATEGORIES.image,
  'midjourney': CATEGORIES.image,
  'stability-ai': CATEGORIES.image,
  'leonardo-ai': CATEGORIES.image,
  'ideogram': CATEGORIES.image,
  'maker': CATEGORIES.image,
  'flux': CATEGORIES.image,
  
  // No category -> Correct categories
  'chatgpt': CATEGORIES.chatbots,
  'eleven-labs': CATEGORIES.audio,
  'pika': CATEGORIES.video,
  'character-ai': CATEGORIES.chatbots,
  'notebooklm': CATEGORIES.chatbots,
  
  // Re-categorize from Writing
  'zapier-ai': CATEGORIES.automation,
  'clay': CATEGORIES.marketing,
  'perplexity': CATEGORIES.chatbots,
  'google-gemini': CATEGORIES.chatbots,
  'deepseek': CATEGORIES.chatbots,
  'harvey-ai': CATEGORIES.chatbots,
}

// Generate SQL UPDATE statements
console.log('-- Category Migration SQL Statements')
console.log('-- Run each with: npx wrangler d1 execute toolschool-db --remote --command "SQL"\n')

for (const [slug, categoryId] of Object.entries(migrations)) {
  console.log(\`UPDATE tools SET tool_category_id = \${categoryId} WHERE slug = '\${slug}';\`)
}
