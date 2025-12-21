'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'

// Badge colors
const badgeColors: { [key: string]: { bg: string; text: string } } = {
  TRENDING: { bg: '#e7131a', text: '#ffffff' },
  BREAKING: { bg: '#000000', text: '#ffffff' },
  'NEW RELEASE': { bg: '#1a73e8', text: '#ffffff' },
  ANALYSIS: { bg: '#9c27b0', text: '#ffffff' },
  INDUSTRY: { bg: '#ff5722', text: '#ffffff' },
  POLICY: { bg: '#34a853', text: '#ffffff' },
  RESEARCH: { bg: '#673ab7', text: '#ffffff' },
  TUTORIAL: { bg: '#fbbc04', text: '#000000' },
}

interface NewsCardProps {
  post: {
    id: string
    slug: string
    title: string
    excerpt?: string
    categoryBadge?: string
    createdAt?: string
    publishedDate?: string
    readTime?: string
    author?: string
    featuredImage?: {
      url: string
      alt?: string
    }
    newsCategory?: {
      id: string
      title: string
    }
  }
  variant?: 'default' | 'compact' | 'featured' | 'headline'
  className?: string
}

function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function getRelativeTime(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 48) return 'Yesterday'
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
  return formatDate(dateString)
}

export function NewsCard({
  post,
  variant = 'default',
  className = '',
}: NewsCardProps) {
  const badge = post.categoryBadge || post.newsCategory?.title
  const badgeStyle = badgeColors[badge?.toUpperCase() || ''] || { bg: '#000000', text: '#ffffff' }
  const dateStr = post.publishedDate || post.createdAt

  if (variant === 'compact') {
    return (
      <Link
        href={`/news/${post.slug}`}
        className={`group flex items-start gap-4 p-4 bg-white border border-[#e5e5e5] transition-all duration-200 hover:border-black hover:shadow-md ${className}`}
      >
        {/* Thumbnail */}
        {post.featuredImage?.url && (
          <div className="w-20 h-14 flex-shrink-0 overflow-hidden bg-[#f6f4f1] relative">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {badge && (
            <span
              className="inline-block px-2 py-0.5 text-[9px] font-ibm-plex-sans-condensed tracking-wider uppercase mb-2"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
            >
              {badge}
            </span>
          )}
          <h3 className="font-gilda-display text-[14px] leading-tight text-black group-hover:text-[#e7131a] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-black/50 mt-1">
            <span>{getRelativeTime(dateStr)}</span>
            {post.readTime && (
              <>
                <span>&middot;</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </Link>
    )
  }

  if (variant === 'headline') {
    return (
      <Link
        href={`/news/${post.slug}`}
        className={`group block relative overflow-hidden ${className}`}
      >
        {/* Full-bleed image */}
        <div
          className="aspect-[21/9] md:aspect-[3/1] bg-center bg-cover bg-no-repeat relative"
          style={{
            backgroundImage: post.featuredImage?.url
              ? `url('${post.featuredImage.url}')`
              : 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
          }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            {badge && (
              <span
                className="inline-block w-fit px-3 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase mb-4"
                style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
              >
                {badge}
              </span>
            )}

            <h2 className="font-gilda-display text-[28px] md:text-[40px] leading-tight text-white mb-3 max-w-3xl">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="font-ibm-plex-sans text-[15px] text-white/70 max-w-2xl line-clamp-2 mb-4">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 text-[12px] text-white/60">
              <span>{formatDate(dateStr)}</span>
              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              )}
              {post.author && <span>by {post.author}</span>}
            </div>
          </div>

          {/* Hover arrow */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 px-4 py-2 bg-white text-black">
              <span className="text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase">Read Article</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/news/${post.slug}`}
        className={`group block bg-white border border-[#e5e5e5] overflow-hidden transition-all duration-300 hover:border-black hover:shadow-xl ${className}`}
      >
        {/* Large Image */}
        <div className="aspect-[16/9] relative overflow-hidden">
          {post.featuredImage?.url ? (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#333]">
              <span className="text-6xl font-gilda-display text-white/20">
                {post.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Badge */}
          {badge && (
            <span
              className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-gilda-display text-[22px] leading-tight text-black mb-3 group-hover:text-[#e7131a] transition-colors">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="font-ibm-plex-sans text-[14px] leading-relaxed text-black/60 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
            <div className="flex items-center gap-3 text-[12px] text-black/50">
              <span>{formatDate(dateStr)}</span>
              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/news/${post.slug}`}
      className={`group block bg-white border border-[#e5e5e5] overflow-hidden transition-all duration-300 hover:border-black hover:shadow-lg ${className}`}
    >
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden">
        {post.featuredImage?.url ? (
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#333]">
            <span className="text-4xl font-gilda-display text-white/20">
              {post.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase"
            style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-gilda-display text-[18px] leading-tight text-black mb-2 group-hover:text-[#e7131a] transition-colors line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="font-ibm-plex-sans text-[13px] leading-relaxed text-black/60 mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <div className="flex items-center gap-3 text-[11px] text-black/50">
            <span>{getRelativeTime(dateStr)}</span>
            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </div>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}
