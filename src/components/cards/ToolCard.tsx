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

// Styled letter fallback component
function LetterAvatar({
  letter,
  color,
  size = 'md'
}: {
  letter: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-5xl',
  }

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center font-gilda-display text-white shadow-lg`}
      style={{
        backgroundColor: color,
        boxShadow: `0 4px 14px ${color}40`
      }}
    >
      {letter.toUpperCase()}
    </div>
  )
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
    logo?: {
      url: string
      alt?: string
    }
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
  // Use logo from Payload CMS only
  const logoUrl = tool.logo?.url

  if (variant === 'compact') {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className={`group flex items-center gap-4 p-4 bg-white border border-[#e5e5e5] transition-all duration-200 hover:border-black hover:shadow-md ${className}`}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: logoUrl ? '#f6f4f1' : categoryColor }}
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={tool.logo?.alt || tool.title}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <span className="text-lg font-gilda-display font-bold text-white">
              {tool.title.charAt(0).toUpperCase()}
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
            background: logoUrl
              ? '#f6f4f1'
              : `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}05)`
          }}
        >
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black text-white">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase">Featured</span>
          </div>

          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={tool.logo?.alt || tool.title}
              width={160}
              height={160}
              className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <LetterAvatar letter={tool.title.charAt(0)} color={categoryColor} size="lg" />
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
      className={`group flex flex-col bg-white border border-[#e5e5e5] transition-all duration-300 hover:border-black hover:shadow-lg relative ${className}`}
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
          background: logoUrl
            ? '#f6f4f1'
            : `linear-gradient(135deg, ${categoryColor}15, ${categoryColor}05)`
        }}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={tool.logo?.alt || tool.title}
            width={96}
            height={96}
            className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <LetterAvatar letter={tool.title.charAt(0)} color={categoryColor} size="md" />
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
