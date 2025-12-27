/**
 * Seed Tool Logos Script
 * Run with: npx tsx scripts/seed-logos.ts
 *
 * This script:
 * 1. Fetches all tools from the database
 * 2. Uses Clearbit Logo API to get logos based on tool domains
 * 3. Downloads and uploads logos to Payload Media collection
 * 4. Updates each tool with the logo reference
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Map of tool slugs to their official domains for Clearbit Logo API
// Clearbit returns high-quality logos when given the domain
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
  'notebooklm': 'notebooklm.google.com',

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

  // Video Generation
  'runway': 'runwayml.com',
  'pika': 'pika.art',
  'synthesia': 'synthesia.io',
  'heygen': 'heygen.com',
  'descript': 'descript.com',
  'luma-ai': 'lumalabs.ai',
  'kling': 'klingai.com',
  'invideo': 'invideo.io',
  'pictory': 'pictory.ai',
  'wondershare-filmora': 'filmora.wondershare.com',
  'capcut': 'capcut.com',
  'opus-clip': 'opus.pro',
  'veed': 'veed.io',
  'maker': 'maker.co',

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
  'v0': 'v0.dev',
  'bolt': 'bolt.new',
  'lovable': 'lovable.dev',
  'windsurf': 'codeium.com',

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

  // Other
  'zapier': 'zapier.com',
  'make': 'make.com',
  'photoroom': 'photoroom.com',
  'remove-bg': 'remove.bg',
  'cutout-pro': 'cutout.pro',
  'lensa': 'lensa.ai',
}

// Alternative domains to try if primary fails
const fallbackDomains: Record<string, string[]> = {
  'chatgpt': ['chat.openai.com', 'openai.com'],
  'dall-e': ['openai.com', 'labs.openai.com'],
  'github-copilot': ['copilot.github.com', 'github.com'],
  'notebooklm': ['notebooklm.google', 'google.com'],
}

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      return null
    }

    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    return null
  }
}

async function getLogoFromClearbit(domain: string): Promise<Buffer | null> {
  // Clearbit Logo API - free, no auth required
  const url = `https://logo.clearbit.com/${domain}`
  return downloadImage(url)
}

async function getLogoFromGoogle(domain: string): Promise<Buffer | null> {
  // Google's favicon service as fallback (lower quality)
  const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  return downloadImage(url)
}

async function seedLogos() {
  console.log('🖼️  Starting logo seed process...\n')

  const payload = await getPayload({ config })

  // Create temp directory for logos
  const tempDir = path.join(__dirname, '../.temp-logos')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  // Fetch all tools
  console.log('📥 Fetching tools from database...')
  const toolsResult = await payload.find({
    collection: 'tools',
    limit: 200,
    depth: 1,
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

    // Skip if tool already has a logo
    if (tool.logo) {
      console.log(`⏭️  ${title}: Already has logo`)
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
      console.log(`❌ ${title}: No domain found`)
      failCount++
      continue
    }

    console.log(`🔍 ${title}: Fetching logo from ${domain}...`)

    // Try to get logo from Clearbit
    let logoBuffer = await getLogoFromClearbit(domain)

    // Try fallback domains if available
    if (!logoBuffer && fallbackDomains[slug]) {
      for (const fallbackDomain of fallbackDomains[slug]) {
        logoBuffer = await getLogoFromClearbit(fallbackDomain)
        if (logoBuffer) break
      }
    }

    // Try Google favicon as last resort
    if (!logoBuffer) {
      logoBuffer = await getLogoFromGoogle(domain)
    }

    if (!logoBuffer) {
      console.log(`   ❌ Failed to fetch logo`)
      failCount++
      continue
    }

    // Save to temp file
    const tempFile = path.join(tempDir, `${slug}.png`)
    fs.writeFileSync(tempFile, logoBuffer)

    try {
      // Upload to Payload Media
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `${title} logo`,
        },
        filePath: tempFile,
      })

      // Update tool with logo reference
      await payload.update({
        collection: 'tools',
        id: tool.id,
        data: {
          logo: mediaDoc.id,
        },
      })

      console.log(`   ✅ Uploaded and linked logo`)
      successCount++
    } catch (error) {
      console.log(`   ❌ Upload failed:`, error instanceof Error ? error.message : error)
      failCount++
    }

    // Clean up temp file
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile)
    }

    // Small delay to be nice to the APIs
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir, { recursive: true })
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ⏭️  Skipped: ${skipCount}`)
  console.log(`   ❌ Failed: ${failCount}`)
  console.log('='.repeat(50))
  console.log('\n✨ Logo seed complete!')

  process.exit(0)
}

seedLogos().catch((error) => {
  console.error('Logo seed failed:', error)
  process.exit(1)
})
