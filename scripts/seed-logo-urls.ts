/**
 * Seed Tool Logo URLs Script
 * Run with: NODE_ENV=production npx tsx scripts/seed-logo-urls.ts
 *
 * This script:
 * 1. Fetches all tools from the database
 * 2. Maps tool slugs to their official domains
 * 3. Generates Clearbit Logo API URLs
 * 4. Updates each tool's logoUrl field
 *
 * Using Clearbit Logo API (free, no auth required):
 * https://logo.clearbit.com/{domain}
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Map of tool slugs to their official domains for Clearbit Logo API
const toolDomainMap: Record<string, string> = {
  // Writing/LLM Tools
  'chatgpt': 'openai.com',
  'claude': 'anthropic.com',
  'jasper-ai': 'jasper.ai',
  'copy-ai': 'copy.ai',
  'writesonic': 'writesonic.com',
  'notion-ai': 'notion.so',
  'grammarly': 'grammarly.com',
  'quillbot': 'quillbot.com',
  'sudowrite': 'sudowrite.com',
  'rytr': 'rytr.me',
  'wordtune': 'wordtune.com',
  'character-ai': 'character.ai',
  'perplexity': 'perplexity.ai',
  'notebooklm': 'google.com',
  'google-gemini': 'google.com',
  'deepseek': 'deepseek.com',

  // Image Generation
  'midjourney': 'midjourney.com',
  'dall-e': 'openai.com',
  'dall-e-3': 'openai.com',
  'stable-diffusion': 'stability.ai',
  'stability-ai': 'stability.ai',
  'leonardo-ai': 'leonardo.ai',
  'ideogram': 'ideogram.ai',
  'adobe-firefly': 'adobe.com',
  'canva-magic-studio': 'canva.com',
  'nightcafe': 'nightcafe.studio',
  'playground-ai': 'playground.com',
  'clipdrop': 'clipdrop.co',
  'flux': 'blackforestlabs.ai',
  'krea': 'krea.ai',
  'magnific': 'magnific.ai',
  'figma-ai': 'figma.com',

  // Video Generation
  'runway': 'runwayml.com',
  'runwayml': 'runwayml.com',
  'pika': 'pika.art',
  'synthesia': 'synthesia.io',
  'heygen': 'heygen.com',
  'descript': 'descript.com',
  'luma-ai': 'lumalabs.ai',
  'kling': 'klingai.com',
  'kling-ai': 'klingai.com',
  'hailuo-ai': 'minimaxi.com',
  'invideo': 'invideo.io',
  'pictory': 'pictory.ai',
  'wondershare-filmora': 'filmora.wondershare.com',
  'capcut': 'capcut.com',
  'opus-clip': 'opus.pro',
  'veed': 'veed.io',
  'maker': 'maker.co',
  'sora': 'openai.com',

  // Audio/Music
  'eleven-labs': 'elevenlabs.io',
  'elevenlabs': 'elevenlabs.io',
  'suno': 'suno.ai',
  'udio': 'udio.com',
  'mubert': 'mubert.com',
  'aiva': 'aiva.ai',
  'soundraw': 'soundraw.io',
  'murf-ai': 'murf.ai',
  'play-ht': 'play.ht',
  'resemble-ai': 'resemble.ai',

  // Code/Development
  'cursor': 'cursor.com',
  'github-copilot': 'github.com',
  'replit': 'replit.com',
  'tabnine': 'tabnine.com',
  'codeium': 'codeium.com',
  'sourcegraph': 'sourcegraph.com',
  'v0': 'vercel.com',
  'bolt': 'stackblitz.com',
  'lovable': 'lovable.dev',
  'windsurf': 'codeium.com',
  'warp-ai': 'warp.dev',

  // Web Building
  'framer-ai': 'framer.com',
  'webflow': 'webflow.com',
  'wix-adi': 'wix.com',
  'squarespace': 'squarespace.com',
  'durable': 'durable.co',
  '10web': '10web.io',
  'hostinger-ai': 'hostinger.com',
  'b12': 'b12.io',

  // 3D/Design
  'spline-ai': 'spline.design',
  'meshy': 'meshy.ai',
  'kaedim': 'kaedim.com',
  'luma-genie': 'lumalabs.ai',
  'polycam': 'poly.cam',

  // Presentations
  'tome': 'tome.app',
  'gamma': 'gamma.app',
  'beautiful-ai': 'beautiful.ai',
  'pitch': 'pitch.com',
  'slidesai': 'slidesai.io',

  // Automation/Other
  'zapier': 'zapier.com',
  'zapier-ai': 'zapier.com',
  'make': 'make.com',
  'photoroom': 'photoroom.com',
  'remove-bg': 'remove.bg',
  'cutout-pro': 'cutout.pro',
  'lensa': 'lensa.ai',
  'clay': 'clay.com',
  'harvey-ai': 'harvey.ai',
}

// Try multiple logo sources in order of preference
async function findLogoUrl(domain: string): Promise<string | null> {
  const sources = [
    // DuckDuckGo's icon service (no API key needed, high quality)
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    // Google's favicon service (reliable but lower res)
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    // Favicon Kit (good fallback)
    `https://api.faviconkit.com/${domain}/144`,
  ]

  for (const url of sources) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const contentType = response.headers.get('content-type')
        // Check if it's an image
        if (contentType?.includes('image')) {
          return url
        }
      }
    } catch {
      // Try next source
    }
  }

  return null
}

async function seedLogoUrls() {
  console.log('🖼️  Starting logo URL seed process...\n')

  const payload = await getPayload({ config })

  // Fetch all tools
  console.log('📥 Fetching tools from database...')
  const toolsResult = await payload.find({
    collection: 'tools',
    limit: 200,
    depth: 0,
  })

  const tools = toolsResult.docs
  console.log(`   Found ${tools.length} tools\n`)

  let successCount = 0
  let skipCount = 0
  let failCount = 0

  for (const tool of tools) {
    const slug = tool.slug as string
    const title = tool.title as string
    const website = (tool.website as string) || ''
    const existingLogoUrl = (tool as any).logoUrl as string | undefined

    // Skip if tool already has a logoUrl
    if (existingLogoUrl) {
      console.log(`⏭️  ${title}: Already has logoUrl`)
      skipCount++
      continue
    }

    // Get domain from our map or extract from website URL
    let domain = toolDomainMap[slug]
    if (!domain && website) {
      try {
        const url = new URL(website.startsWith('http') ? website : `https://${website}`)
        domain = url.hostname.replace('www.', '')
      } catch {
        // Invalid URL
      }
    }

    if (!domain) {
      console.log(`❌ ${title}: No domain found (slug: ${slug})`)
      failCount++
      continue
    }

    // Find a working logo URL from multiple sources
    const logoUrl = await findLogoUrl(domain)
    if (!logoUrl) {
      console.log(`❌ ${title}: No logo found for ${domain}`)
      failCount++
      continue
    }

    try {
      // Update tool with logoUrl
      await payload.update({
        collection: 'tools',
        id: tool.id,
        data: {
          logoUrl: logoUrl,
        },
      })

      console.log(`✅ ${title}: ${logoUrl}`)
      successCount++
    } catch (error) {
      console.log(`❌ ${title}: Update failed -`, error instanceof Error ? error.message : error)
      failCount++
    }

    // Small delay to be nice to the API
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ⏭️  Skipped: ${skipCount}`)
  console.log(`   ❌ Failed: ${failCount}`)
  console.log('='.repeat(50))
  console.log('\n✨ Logo URL seed complete!')

  process.exit(0)
}

seedLogoUrls().catch((error) => {
  console.error('Logo URL seed failed:', error)
  process.exit(1)
})
