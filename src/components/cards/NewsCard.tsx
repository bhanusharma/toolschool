'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, TrendingUp, Zap, BookOpen, FileText, Lightbulb, Shield, FlaskConical } from 'lucide-react'

// Badge colors with enhanced styling
const badgeColors: { [key: string]: { bg: string; text: string; icon?: any } } = {
  TRENDING: { bg: '#e7131a', text: '#ffffff', icon: TrendingUp },
  BREAKING: { bg: '#000000', text: '#ffffff', icon: Zap },
  'NEW RELEASE': { bg: '#1a73e8', text: '#ffffff', icon: Zap },
  'NEW-RELEASE': { bg: '#1a73e8', text: '#ffffff', icon: Zap },
  ANALYSIS: { bg: '#9c27b0', text: '#ffffff', icon: Lightbulb },
  INDUSTRY: { bg: '#ff5722', text: '#ffffff', icon: FileText },
  POLICY: { bg: '#34a853', text: '#ffffff', icon: Shield },
  RESEARCH: { bg: '#673ab7', text: '#ffffff', icon: FlaskConical },
  TUTORIAL: { bg: '#fbbc04', text: '#000000', icon: BookOpen },
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
    const FeaturedBadgeIcon = badgeStyle.icon
    return (
      <Link
        href={`/news/${post.slug}`}
        className={`group block bg-white border-2 border-[#e5e5e5] overflow-hidden transition-all duration-300 hover:border-black ${className}`}
      >
        {/* Large Image with enhanced overlay */}
        <div className="aspect-[16/9] relative overflow-hidden">
          {post.featuredImage?.url ? (
            <>
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
              <span className="text-7xl font-gilda-display text-white/5">
                {post.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Badge - Enhanced */}
          {badge && (
            <div
              className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 text-[10px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
            >
              {FeaturedBadgeIcon && <FeaturedBadgeIcon className="w-3.5 h-3.5" />}
              <span>{badge}</span>
            </div>
          )}

          {/* Read time badge */}
          {post.readTime && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-[10px] font-ibm-plex-sans-condensed tracking-wider text-white">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </div>
          )}
        </div>

        {/* Content - Enhanced */}
        <div className="p-7">
          {/* Date with decorative line */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#e7131a]" />
            <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-black/40">
              {formatDate(dateStr)}
            </span>
          </div>

          <h3 className="font-gilda-display text-[24px] leading-[1.25] text-black mb-4 group-hover:text-[#e7131a] transition-colors duration-300">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="font-ibm-plex-sans text-[14px] leading-[1.7] text-black/55 mb-6 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Bottom action bar */}
          <div className="flex items-center justify-between pt-5 border-t border-[#e5e5e5]">
            <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-black/40 group-hover:text-[#e7131a] transition-colors">
              Read Full Story
            </span>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default variant - Enhanced Editorial Style
  const BadgeIcon = badgeStyle.icon
  return (
    <Link
      href={`/news/${post.slug}`}
      className={`group block bg-white border-2 border-[#e5e5e5] overflow-hidden transition-all duration-300 hover:border-black ${className}`}
    >
      {/* Image with overlay effects */}
      <div className="aspect-[16/10] relative overflow-hidden">
        {post.featuredImage?.url ? (
          <>
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
            <span className="text-5xl font-gilda-display text-white/10">
              {post.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Badge - Enhanced with icon */}
        {badge && (
          <div
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase"
            style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
          >
            {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
            <span>{badge}</span>
          </div>
        )}

        {/* Read time overlay */}
        {post.readTime && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-[9px] font-ibm-plex-sans-condensed tracking-wider text-white/80">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-[1px] bg-[#e7131a]" />
          <span className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-black/40">
            {getRelativeTime(dateStr)}
          </span>
        </div>

        <h3 className="font-gilda-display text-[19px] leading-[1.3] text-black mb-3 group-hover:text-[#e7131a] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="font-ibm-plex-sans text-[13px] leading-[1.6] text-black/55 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Bottom action */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#e5e5e5]">
          <span className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-black/40 group-hover:text-[#e7131a] transition-colors">
            Read Article
          </span>
          <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </Link>
  )
}
