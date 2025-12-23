'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowRight } from 'lucide-react'

// Category colors for visual distinction (10 categories)
const categoryColors: { [key: string]: string } = {
  Writing: '#1a73e8',
  Image: '#e7131a',
  Video: '#9c27b0',
  Audio: '#ff5722',
  Automation: '#10b981',
  Chatbots: '#6366f1',
  Marketing: '#f59e0b',
  Data: '#06b6d4',
  Building: '#fbbc04',
  '3D': '#673ab7',
}

// Map of tool slugs to their official domains for logo fetching
const toolDomainMap: Record<string, string> = {
  'chatgpt': 'openai.com',
  'claude': 'anthropic.com',
  'midjourney': 'midjourney.com',
  'dall-e-3': 'openai.com',
  'stable-diffusion': 'stability.ai',
  'stability-ai': 'stability.ai',
  'leonardo-ai': 'leonardo.ai',
  'ideogram': 'ideogram.ai',
  'runway': 'runwayml.com',
  'runway-ml': 'runwayml.com',
  'runwayml': 'runwayml.com',
  'pika': 'pika.art',
  'eleven-labs': 'elevenlabs.io',
  'elevenlabs': 'elevenlabs.io',
  'suno': 'suno.ai',
  'suno-ai': 'suno.ai',
  'cursor': 'cursor.com',
  'github-copilot': 'github.com',
  'replit': 'replit.com',
  'replit-ai': 'replit.com',
  'framer-ai': 'framer.com',
  'canva-magic-studio': 'canva.com',
  'adobe-firefly': 'adobe.com',
  'figma-ai': 'figma.com',
  'notion-ai': 'notion.so',
  'jasper-ai': 'jasper.ai',
  'copy-ai': 'copy.ai',
  'character-ai': 'character.ai',
  'perplexity': 'perplexity.ai',
  'notebooklm': 'google.com',
  'google-gemini': 'google.com',
  'flux': 'blackforestlabs.ai',
  'maker': 'maker.co',
  'tome': 'tome.app',
  'gamma': 'gamma.app',
  'durable': 'durable.co',
  '10web': '10web.io',
  'spline-ai': 'spline.design',
  'meshy': 'meshy.ai',
  'invideo': 'invideo.io',
  'veed': 'veed.io',
  'bolt': 'stackblitz.com',
  'v0': 'vercel.com',
  'v0-by-vercel': 'vercel.com',
  'zapier-ai': 'zapier.com',
  'udio': 'udio.com',
  'mubert': 'mubert.com',
  'deepseek': 'deepseek.com',
  'warp-ai': 'warp.dev',
  'clay': 'clay.com',
  'harvey-ai': 'harvey.ai',
  'captions': 'captions.ai',
  'clipchamp': 'clipchamp.com',
  'kling-ai': 'klingai.com',
  'hailuo-ai': 'hailuoai.video',
  'sora': 'openai.com',
  // Data tools
  'julius-ai': 'julius.ai',
  'equals': 'equals.com',
  'obviously-ai': 'obviously.ai',
  'akkio': 'akkio.com',
  'hex': 'hex.tech',
  // Automation tools
  'make': 'make.com',
  'n8n': 'n8n.io',
  'bardeen': 'bardeen.ai',
  'relay': 'relay.app',
  'activepieces': 'activepieces.com',
  // Marketing tools
  'jasper': 'jasper.ai',
  'surfer-seo': 'surferseo.com',
  'clearscope': 'clearscope.io',
  'writesonic': 'writesonic.com',
  // 3D tools
  'luma-ai': 'lumalabs.ai',
  'kaedim': 'kaedim3d.com',
  'csm-ai': 'csm.ai',
  'tripo-ai': 'tripo3d.ai',
  // Writing tools
  'grammarly': 'grammarly.com',
  'sudowrite': 'sudowrite.com',
  'wordtune': 'wordtune.com',
  // Chatbot tools
  'pi': 'pi.ai',
  'poe': 'poe.com',
  'grok': 'x.ai',
}

// Generate high-res logo URL using Google's favicon service
function getLogoUrl(slug: string, website?: string): string | null {
  // First try to get domain from our mapping
  let domain = toolDomainMap[slug]

  // If not in mapping, try to extract from website URL
  if (!domain && website) {
    try {
      const url = new URL(website.startsWith('http') ? website : `https://${website}`)
      domain = url.hostname.replace('www.', '')
    } catch {
      // Invalid URL
    }
  }

  if (!domain) return null

  // Use Google's favicon service with size parameter for higher resolution (up to 256px)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

interface ToolCardProps {
  tool: {
    id: string
    slug: string
    title: string
    tagline?: string
    excerpt?: string
    toolCategory?: {
      id: string
      title: string
      slug: string
    }
    pricingModel?: string
    featured?: boolean
    featuredImage?: {
      url: string
      alt?: string
    }
    logo?: {
      url: string
      alt?: string
    }
    logoUrl?: string
    website?: string
  }
  variant?: 'default' | 'compact' | 'featured'
  showCategory?: boolean
  showPricing?: boolean
  className?: string
}

function getExcerptText(excerpt: string | undefined): string {
  if (!excerpt) return ''
  return excerpt.replace(/<[^>]*>/g, '').trim()
}

export function ToolCard({
  tool,
  variant = 'default',
  showCategory = true,
  showPricing = true,
  className = '',
}: ToolCardProps) {
  const categoryColor = categoryColors[tool.toolCategory?.title || ''] || '#e7131a'
  // Try multiple sources for logo: featuredImage > logo > logoUrl > generated from domain
  const imageUrl = tool.featuredImage?.url || tool.logo?.url || tool.logoUrl || getLogoUrl(tool.slug, tool.website)

  if (variant === 'compact') {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className={`group flex items-center gap-4 p-4 bg-white border border-[#e5e5e5] transition-all duration-200 hover:border-black hover:shadow-md ${className}`}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: `${categoryColor}15` }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={tool.logo?.alt || tool.title}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <span
              className="text-lg font-gilda-display font-bold"
              style={{ color: categoryColor }}
            >
              {tool.title.charAt(0)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-gilda-display text-[16px] text-black group-hover:text-[#e7131a] transition-colors truncate">
            {tool.title}
          </h3>
          {tool.tagline && (
            <p className="text-[12px] text-black/60 truncate mt-0.5">
              {tool.tagline}
            </p>
          )}
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all flex-shrink-0" />
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className={`group block bg-white border border-[#e5e5e5] transition-all duration-300 hover:border-black hover:shadow-xl ${className}`}
      >
        {/* Large Image Area */}
        <div
          className="aspect-[4/3] p-12 flex items-center justify-center relative overflow-hidden"
          style={{
            background: imageUrl
              ? '#f6f4f1'
              : `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}05)`
          }}
        >
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black text-white">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase">Featured</span>
          </div>

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={tool.featuredImage?.alt || tool.logo?.alt || tool.title}
              width={160}
              height={160}
              className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-32 h-32 flex items-center justify-center"
              style={{ backgroundColor: categoryColor }}
            >
              <span className="text-5xl font-gilda-display text-white">
                {tool.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-gilda-display text-[24px] leading-tight text-black mb-3 group-hover:text-[#e7131a] transition-colors">
            {tool.title}
          </h3>

          <p className="font-ibm-plex-sans text-[14px] leading-relaxed text-black/60 mb-4 line-clamp-2">
            {tool.tagline || getExcerptText(tool.excerpt)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {showCategory && tool.toolCategory && (
              <span
                className="inline-block px-3 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase"
                style={{
                  backgroundColor: `${categoryColor}15`,
                  color: categoryColor
                }}
              >
                {tool.toolCategory.title}
              </span>
            )}
            {showPricing && tool.pricingModel && (
              <span className={`inline-block px-3 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase ${
                tool.pricingModel === 'free' ? 'bg-green-500/10 text-green-600' :
                tool.pricingModel === 'freemium' ? 'bg-blue-500/10 text-blue-600' :
                'bg-purple-500/10 text-purple-600'
              }`}>
                {tool.pricingModel}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
            <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black group-hover:text-[#e7131a] transition-colors">
              Explore Tool
            </span>
            <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group flex flex-col bg-white border border-[#e5e5e5] transition-all duration-300 hover:border-black hover:shadow-lg ${className}`}
    >
      {/* Featured Badge */}
      {tool.featured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 bg-black text-white">
          <Sparkles className="w-3 h-3" />
          <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase">Featured</span>
        </div>
      )}

      {/* Tool Logo/Icon */}
      <div
        className="aspect-square p-8 flex items-center justify-center relative overflow-hidden"
        style={{
          background: imageUrl
            ? '#f6f4f1'
            : `linear-gradient(135deg, ${categoryColor}15, ${categoryColor}05)`
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={tool.featuredImage?.alt || tool.logo?.alt || tool.title}
            width={96}
            height={96}
            className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-24 h-24 flex items-center justify-center shadow-lg"
            style={{ backgroundColor: categoryColor }}
          >
            <span className="text-4xl font-gilda-display text-white">
              {tool.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Tool Info */}
      <div className="p-5 flex-1 flex flex-col relative">
        <h3 className="font-gilda-display text-[20px] leading-[28px] text-black mb-2 group-hover:text-[#e7131a] transition-colors">
          {tool.title}
        </h3>

        <p className="font-ibm-plex-sans text-[13px] leading-[20px] text-black/60 mb-4 flex-1 line-clamp-2">
          {tool.tagline || getExcerptText(tool.excerpt)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {showCategory && tool.toolCategory && (
            <span
              className="inline-block px-2.5 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase"
              style={{
                backgroundColor: `${categoryColor}10`,
                color: categoryColor
              }}
            >
              {tool.toolCategory.title}
            </span>
          )}
          {showPricing && tool.pricingModel && (
            <span className={`inline-block px-2.5 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase ${
              tool.pricingModel === 'free' ? 'bg-green-500/10 text-green-600' :
              tool.pricingModel === 'freemium' ? 'bg-blue-500/10 text-blue-600' :
              'bg-purple-500/10 text-purple-600'
            }`}>
              {tool.pricingModel}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e5e5e5]">
          <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black group-hover:text-[#e7131a] transition-colors">
            Learn More
          </span>
          <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}
