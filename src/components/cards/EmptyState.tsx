'use client'

import Link from 'next/link'
import { Search, Wrench, Users, FolderOpen, Newspaper, BookOpen, ArrowRight } from 'lucide-react'

type EmptyStateType = 'tools' | 'builders' | 'projects' | 'news' | 'tutorials' | 'search' | 'generic'

interface EmptyStateProps {
  type?: EmptyStateType
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  searchQuery?: string
  className?: string
}

const emptyStateConfig: Record<EmptyStateType, {
  icon: typeof Search
  defaultTitle: string
  defaultDescription: string
  illustration: string
  color: string
}> = {
  tools: {
    icon: Wrench,
    defaultTitle: 'No tools found',
    defaultDescription: 'Try adjusting your filters or explore our curated categories',
    illustration: '🔧',
    color: '#e7131a',
  },
  builders: {
    icon: Users,
    defaultTitle: 'No builders found',
    defaultDescription: 'Try adjusting your filters to discover talented AI creators',
    illustration: '👥',
    color: '#1a73e8',
  },
  projects: {
    icon: FolderOpen,
    defaultTitle: 'No projects found',
    defaultDescription: 'Explore our showcase of AI-powered creative work',
    illustration: '📁',
    color: '#fbbc04',
  },
  news: {
    icon: Newspaper,
    defaultTitle: 'No articles found',
    defaultDescription: 'Check back soon for the latest AI news and insights',
    illustration: '📰',
    color: '#9c27b0',
  },
  tutorials: {
    icon: BookOpen,
    defaultTitle: 'No tutorials found',
    defaultDescription: 'New learning content is being added regularly',
    illustration: '📚',
    color: '#34a853',
  },
  search: {
    icon: Search,
    defaultTitle: 'No results found',
    defaultDescription: 'Try different keywords or browse our categories',
    illustration: '🔍',
    color: '#000000',
  },
  generic: {
    icon: FolderOpen,
    defaultTitle: 'Nothing here yet',
    defaultDescription: 'Check back soon for new content',
    illustration: '📦',
    color: '#666666',
  },
}

export function EmptyState({
  type = 'generic',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  searchQuery,
  className = '',
}: EmptyStateProps) {
  const config = emptyStateConfig[type]
  const Icon = config.icon

  const displayTitle = title || (searchQuery ? `No results for "${searchQuery}"` : config.defaultTitle)
  const displayDescription = description || config.defaultDescription

  return (
    <div className={`relative bg-white border border-[#e5e5e5] py-16 md:py-24 px-6 ${className}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-5" style={{ backgroundColor: config.color }} />
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5" style={{ backgroundColor: config.color }} />

      <div className="relative z-10 max-w-md mx-auto text-center">
        {/* Icon container */}
        <div
          className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2"
          style={{ borderColor: `${config.color}30` }}
        >
          <Icon className="w-8 h-8" style={{ color: config.color }} />
        </div>

        {/* Large decorative emoji */}
        <div className="text-6xl mb-6 opacity-20">
          {config.illustration}
        </div>

        {/* Title */}
        <h3 className="font-gilda-display text-[24px] md:text-[28px] text-black mb-3">
          {displayTitle}
        </h3>

        {/* Description */}
        <p className="font-ibm-plex-sans text-[15px] text-black/60 leading-relaxed mb-8 max-w-sm mx-auto">
          {displayDescription}
        </p>

        {/* Action button */}
        {(actionLabel || actionHref || onAction) && (
          actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-6 py-3 text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: config.color }}
            >
              <span className="font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase">
                {actionLabel || 'Explore'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : onAction ? (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 px-6 py-3 text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: config.color }}
            >
              <span className="font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase">
                {actionLabel || 'Try Again'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null
        )}

        {/* Suggestions for search */}
        {type === 'search' && searchQuery && (
          <div className="mt-8 pt-8 border-t border-[#e5e5e5]">
            <p className="font-ibm-plex-sans-condensed text-[11px] tracking-wider uppercase text-black/40 mb-4">
              Search suggestions
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['AI Art', 'Writing', 'Video', 'Music', 'Code'].map((suggestion) => (
                <Link
                  key={suggestion}
                  href={`/search?q=${encodeURIComponent(suggestion)}`}
                  className="px-3 py-1.5 border border-[#e5e5e5] text-[12px] font-ibm-plex-sans text-black/70 hover:border-black hover:text-black transition-colors"
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Geometric accent line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1"
        style={{ backgroundColor: config.color }}
      />
    </div>
  )
}
