import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  Newspaper,
  ArrowRight,
  X,
  Sparkles,
  TrendingUp,
  Zap,
  Lightbulb,
  FileText,
  Shield,
  FlaskConical,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import { NewsCard, EmptyState } from '@/components/cards'

// Force dynamic rendering - D1 database not available during static build in CI
export const dynamic = 'force-dynamic'

interface Post {
  id: number | string
  title: string
  slug: string
  excerpt?: string
  content?: any
  featuredImage?: {
    url?: string
    alt?: string
  } | number
  categoryBadge?: string
  newsCategory?: {
    title: string
    slug: string
    color?: string
  } | number
  author?: {
    email: string
  } | number
  publicationDateOverride?: string
  createdAt: string
}

// Category colors for visual distinction (matching NewsCard badge colors)
const categoryColors: { [key: string]: string } = {
  'trending': '#6366f1',
  'breaking': '#000000',
  'new-release': '#1a73e8',
  'analysis': '#9c27b0',
  'industry': '#ff5722',
  'policy': '#34a853',
  'research': '#673ab7',
  'tutorial': '#fbbc04',
}

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

const getArticleCategory = (post: Post) => {
  return post.categoryBadge?.toUpperCase() ||
         (typeof post.newsCategory === 'object' && post.newsCategory?.title?.toUpperCase()) ||
         'NEWS'
}

// Get the raw category slug for filtering (lowercase, hyphenated)
const getArticleCategorySlug = (post: Post) => {
  return post.categoryBadge?.toLowerCase() ||
         (typeof post.newsCategory === 'object' && post.newsCategory?.slug) ||
         ''
}

const getReadingTime = (content: any) => {
  const text = typeof content === 'string' ? content : JSON.stringify(content || '')
  const wordsPerMinute = 200
  const wordCount = text.split(' ').length || 0
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} MIN READ`
}

const getImageUrl = (post: Post) => {
  if (typeof post.featuredImage !== 'object' || !post.featuredImage?.url) {
    return '/placeholder-news.jpg'
  }
  return post.featuredImage.url
}

// News categories matching the categoryBadge field options
const categories: Array<{ icon: LucideIcon; label: string; slug: string }> = [
  { icon: TrendingUp, label: 'Trending', slug: 'trending' },
  { icon: Zap, label: 'Breaking', slug: 'breaking' },
  { icon: Sparkles, label: 'New Release', slug: 'new-release' },
  { icon: Lightbulb, label: 'Analysis', slug: 'analysis' },
  { icon: FileText, label: 'Industry', slug: 'industry' },
  { icon: Shield, label: 'Policy', slug: 'policy' },
  { icon: FlaskConical, label: 'Research', slug: 'research' },
  { icon: BookOpen, label: 'Tutorial', slug: 'tutorial' },
]

type SearchParams = Promise<{ category?: string; page?: string }>

async function getNewsData() {
  try {
    const payload = await getPayload({ config })
    const posts = await payload.find({
      collection: 'posts',
      limit: 50,
      sort: '-createdAt',
      depth: 2,
    })
    return posts.docs as Post[]
  } catch (error) {
    console.error('Failed to fetch news data:', error)
    return []
  }
}

// Transform post for NewsCard component
function transformPostForCard(post: Post): any {
  return {
    id: String(post.id),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    categoryBadge: post.categoryBadge,
    createdAt: post.createdAt,
    publishedDate: post.publicationDateOverride,
    readTime: getReadingTime(post.content),
    featuredImage: typeof post.featuredImage === 'object' && post.featuredImage?.url
      ? { url: post.featuredImage.url, alt: post.featuredImage.alt }
      : undefined,
    newsCategory: typeof post.newsCategory === 'object'
      ? { id: String((post.newsCategory as any).id || ''), title: (post.newsCategory as any).title }
      : undefined,
  }
}

function buildFilterUrl(
  currentParams: { [key: string]: string | string[] | undefined },
  key: string,
  value: string | null
) {
  const params = new URLSearchParams()

  for (const [k, v] of Object.entries(currentParams)) {
    if (k !== key && v && typeof v === 'string') {
      params.set(k, v)
    }
  }

  if (value !== null) {
    params.set(key, value)
  }

  const queryString = params.toString()
  return queryString ? `/news?${queryString}` : '/news'
}

export default async function NewsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const articles = await getNewsData()

  const selectedCategory = params.category || 'All'
  const currentPage = parseInt(params.page || '1', 10)
  const articlesPerPage = 9
  const hasActiveFilters = selectedCategory !== 'All'

  // Server-side filtering - compare using slug values
  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((article) => {
        const categorySlug = getArticleCategorySlug(article)
        return categorySlug === selectedCategory.toLowerCase()
      })

  // Server-side pagination
  const heroArticlesCount = Math.min(7, filteredArticles.length)
  const remainingArticles = filteredArticles.slice(heroArticlesCount)
  const totalPages = Math.ceil(remainingArticles.length / articlesPerPage)
  const paginatedArticles = remainingArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  // If no articles, show empty state with matching 2026 design
  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f8f8]">
        {/* Hero Section - 2026 Design */}
        <section className="relative bg-[#0a0a0a] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]" />
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-indigo-500/[0.04] via-transparent to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-purple-500/[0.03] via-transparent to-transparent blur-3xl" />
            <div className="absolute inset-0 opacity-[0.12]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }} />
          </div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-28">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-8 animate-hero">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]">
                  <Newspaper className="w-4 h-4 text-white/50" />
                  <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-white/60">
                    AI News & Insights
                  </span>
                </div>
              </div>

              <h1 className="text-[52px] md:text-[72px] lg:text-[88px] leading-[0.9] font-gilda-display text-white mb-8 animate-hero-delay-1">
                <span className="block">The</span>
                <span className="block bg-gradient-to-r from-white/70 via-white/50 to-white/30 bg-clip-text text-transparent italic">Pulse</span>
                <span className="block text-[0.5em] text-white/35 font-ibm-plex-sans tracking-[0.25em] uppercase mt-3">of AI Creation</span>
              </h1>

              <p className="font-ibm-plex-sans text-[17px] md:text-[19px] leading-[1.7] text-white/55 max-w-md animate-hero-delay-2">
                Stay ahead with breaking news, trends, and insights from the world of AI creation.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.08]" />
        </section>

        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
          <EmptyState
            type="news"
            title="No articles yet"
            description="Check back soon for the latest AI news and insights"
          />
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section - 2026 Editorial Design */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        {/* Modern 2026 background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]" />
          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-indigo-500/[0.04] via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-purple-500/[0.03] via-transparent to-transparent blur-3xl" />
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.12]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-16 items-center">
            {/* Left - Title and Info */}
            <div>
              <div className="inline-flex items-center gap-3 mb-8 animate-hero">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]">
                  <div className="w-2 h-2 bg-white/40 animate-pulse" />
                  <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-white/60">
                    Live Updates
                  </span>
                </div>
                <div className="px-4 py-2 bg-white/[0.06] border border-white/[0.08]">
                  <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-white/50">
                    {articles.length} Stories
                  </span>
                </div>
              </div>

              <h1 className="text-[52px] md:text-[72px] lg:text-[88px] leading-[0.9] font-gilda-display text-white mb-8 animate-hero-delay-1">
                <span className="block">The</span>
                <span className="block bg-gradient-to-r from-white/70 via-white/50 to-white/30 bg-clip-text text-transparent italic">Pulse</span>
                <span className="block text-[0.5em] text-white/35 font-ibm-plex-sans tracking-[0.25em] uppercase mt-3">of AI Creation</span>
              </h1>

              <p className="font-ibm-plex-sans text-[17px] md:text-[19px] leading-[1.7] text-white/55 max-w-md mb-10 animate-hero-delay-2">
                Breaking news, deep analyses, and insider insights from the frontier of artificial intelligence.
              </p>

              {/* Stats row - 2026 style with dividers */}
              <div className="flex items-stretch gap-0 animate-hero-delay-3">
                <div className="pr-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-gilda-display text-white">{articles.length}</span>
                    <span className="text-[14px] font-ibm-plex-sans-condensed text-white/40">+</span>
                  </div>
                  <div className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-white/40 mt-1">Articles</div>
                </div>
                <div className="w-px bg-white/[0.12]" />
                <div className="px-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-gilda-display text-white">{categories.length}</span>
                  </div>
                  <div className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-white/40 mt-1">Categories</div>
                </div>
                <div className="w-px bg-white/[0.12]" />
                <div className="pl-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-gilda-display text-white">24</span>
                    <span className="text-[14px] font-ibm-plex-sans-condensed text-white/50">hrs</span>
                  </div>
                  <div className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-white/40 mt-1">Freshness</div>
                </div>
              </div>
            </div>

            {/* Right - Featured Article with magazine treatment */}
            {articles[0] && !hasActiveFilters && (
              <div className="hidden lg:block animate-slide-left stagger-4">
                <div className="relative">
                  {/* "Featured" label */}
                  <div className="absolute -top-4 -left-4 z-20 bg-black border border-white/20 px-4 py-2">
                    <span className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.25em] uppercase text-white flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-white/60" />
                      Editor&apos;s Pick
                    </span>
                  </div>
                  <NewsCard post={transformPostForCard(articles[0])} variant="featured" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom edge accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
      </section>

      {/* Category Cards - Magazine Section Navigation */}
      {!hasActiveFilters && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 bg-white border-b border-[#e5e5e5]">
          {/* Section header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px] bg-black" />
              <h2 className="text-[13px] font-ibm-plex-sans-condensed tracking-[0.25em] uppercase text-black/60">
                Browse by Topic
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[12px] font-ibm-plex-sans text-black/40">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending: AI Video, Code Assistants</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat, index) => {
              const color = categoryColors[cat.slug] || '#000'
              const staggerClass = `stagger-${index + 1}`
              const IconComponent = cat.icon
              // Calculate a "count" for visual interest (can be replaced with real data)
              const articleCount = Math.floor(Math.random() * 8) + 3
              return (
                <Link
                  key={cat.slug}
                  href={`/news?category=${cat.slug}`}
                  className={`group relative p-5 border-2 border-[#e5e5e5] hover:border-black bg-white transition-all duration-300 animate-slide-up overflow-hidden ${staggerClass}`}
                >
                  {/* Hover background fill */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: `${color}08` }}
                  />

                  {/* Top accent line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: color }}
                  />

                  <div className="relative z-10">
                    {/* Icon with enhanced styling */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-11 h-11 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${color}12` }}
                      >
                        <IconComponent
                          size={20}
                          strokeWidth={1.5}
                          className="transition-colors duration-300"
                          style={{ color }}
                        />
                      </div>
                      {/* Article count badge */}
                      <div className="text-[10px] font-ibm-plex-sans-condensed tracking-wider text-black/30 group-hover:text-black/60 transition-colors">
                        {articleCount} articles
                      </div>
                    </div>

                    {/* Category name */}
                    <h3 className="font-ibm-plex-sans-condensed text-[14px] tracking-[0.1em] uppercase text-black group-hover:text-black transition-colors">
                      {cat.label}
                    </h3>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-[10px] font-ibm-plex-sans tracking-wider uppercase" style={{ color }}>
                        Explore
                      </span>
                      <ArrowRight className="w-3 h-3" style={{ color }} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Filter Bar - Enhanced Editorial Style */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-5 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] sticky top-14 md:top-16 lg:top-20 z-40">
        {/* Mobile scroll indicator */}
        <div className="relative">
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/95 to-transparent pointer-events-none z-10 lg:hidden" />
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1">
          {/* All Articles - Special treatment */}
          <Link
            href="/news"
            className={`flex-shrink-0 px-5 py-2.5 text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-2 ${
              !hasActiveFilters
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black hover:bg-black/5'
            }`}
          >
            <span className="font-bold">{articles.length}</span>
            <span>All Stories</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-8 bg-[#e5e5e5] mx-2 flex-shrink-0" />

          {/* Category Filters */}
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.slug
            const color = categoryColors[cat.slug] || '#000'
            const IconComponent = cat.icon

            return (
              <Link
                key={cat.slug}
                href={buildFilterUrl(params, 'category', isActive ? null : cat.slug)}
                className={`group flex-shrink-0 px-4 py-2.5 text-[11px] font-ibm-plex-sans-condensed tracking-[0.1em] uppercase transition-all duration-300 flex items-center gap-2.5 relative overflow-hidden ${
                  isActive
                    ? 'text-white'
                    : 'bg-transparent text-black/60 hover:text-black'
                }`}
                style={isActive ? { backgroundColor: color } : {}}
              >
                {/* Underline accent on hover (when not active) */}
                {!isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: color }}
                  />
                )}

                <IconComponent
                  size={14}
                  strokeWidth={1.5}
                  className={`transition-colors duration-300 ${isActive ? 'text-white' : ''}`}
                  style={!isActive ? { color } : {}}
                />
                <span>{cat.label}</span>
                {isActive && (
                  <X className="w-3.5 h-3.5 ml-1 opacity-70 hover:opacity-100" />
                )}
              </Link>
            )
          })}

          {/* Clear Filters - More prominent */}
          {hasActiveFilters && (
            <>
              <div className="w-px h-8 bg-[#e5e5e5] mx-3 flex-shrink-0" />
              <Link
                href="/news"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 text-[11px] font-ibm-plex-sans-condensed tracking-[0.1em] uppercase text-black/60 hover:text-black hover:bg-black/5 transition-all duration-300"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filter</span>
              </Link>
            </>
          )}
          </div>
        </div>
      </section>

      {/* Active Filters Display - Enhanced */}
      {hasActiveFilters && (() => {
        const activeCategory = categories.find(c => c.slug === selectedCategory.toLowerCase())
        const displayLabel = activeCategory?.label || selectedCategory
        return (
          <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-4 bg-gradient-to-r from-[#f6f4f1] to-white border-b border-[#e5e5e5]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-black/40" />
                <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.1em] uppercase text-black/50">
                  Viewing
                </span>
              </div>
              <Link
                href="/news"
                className="group inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-black/10 text-[12px] font-ibm-plex-sans-condensed tracking-[0.1em] uppercase hover:border-black hover:text-black transition-all duration-300"
                style={{ borderLeftColor: categoryColors[selectedCategory.toLowerCase()] || '#000', borderLeftWidth: '3px' }}
              >
                {displayLabel}
                <X className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </section>
        )
      })()}

      {/* Editorial Hero Layout (when not filtering) */}
      {!hasActiveFilters && articles.length >= 7 && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {/* Featured Article */}
            {articles[0] && (
              <div className="animate-slide-up stagger-1">
                <NewsCard post={transformPostForCard(articles[0])} variant="featured" />
              </div>
            )}

            {/* Other Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles.slice(1, 5).map((article, index) => (
                <div key={article.id} className={`animate-slide-up stagger-${index + 2}`}>
                  <NewsCard post={transformPostForCard(article)} variant="compact" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Three Column Editorial */}
          <div className="hidden lg:flex gap-6 items-start" style={{ height: '656px' }}>
            {/* Left Column - Two Trending Articles */}
            <div className="flex flex-col gap-6 h-full shrink-0 w-80 animate-slide-up stagger-1">
              {articles[0] && (
                <div className="flex-1 flex flex-col gap-6">
                  <Link href={`/news/${articles[0].slug}`} className="block group h-full">
                    <div className="flex flex-col gap-6 h-full">
                      <div
                        className="flex-1 bg-center bg-cover bg-no-repeat w-80 group-hover:opacity-90 transition-opacity"
                        style={{
                          backgroundImage: `url('${getImageUrl(articles[0])}')`
                        }}
                      />
                      <div className="flex flex-col gap-4 shrink-0 w-full">
                        <div className="flex justify-between items-center w-full">
                          <div className="font-ibm-plex-sans-condensed text-[14px] leading-[14px] tracking-[1.4px] uppercase text-black">
                            {getArticleCategory(articles[0])}
                          </div>
                          <div className="font-ibm-plex-sans-condensed font-medium text-[10px] leading-[14px] tracking-[1px] uppercase text-black">
                            {formatDate(articles[0].publicationDateOverride || articles[0].createdAt)}
                          </div>
                        </div>
                        <h3 className="font-ibm-plex-sans text-[18px] leading-[28px] text-black group-hover:text-black/70 transition-colors line-clamp-2">
                          {articles[0].title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              <div className="bg-black h-px shrink-0 w-full" />

              {articles[1] && (
                <div className="flex-1 flex flex-col gap-6">
                  <Link href={`/news/${articles[1].slug}`} className="block group h-full">
                    <div className="flex flex-col gap-6 h-full">
                      <div
                        className="flex-1 bg-center bg-cover bg-no-repeat w-80 group-hover:opacity-90 transition-opacity"
                        style={{
                          backgroundImage: `url('${getImageUrl(articles[1])}')`
                        }}
                      />
                      <div className="flex flex-col gap-4 shrink-0 w-full">
                        <div className="flex justify-between items-center w-full">
                          <div className="font-ibm-plex-sans-condensed text-[14px] leading-[14px] tracking-[1.4px] uppercase text-black">
                            {getArticleCategory(articles[1])}
                          </div>
                          <div className="font-ibm-plex-sans-condensed font-medium text-[10px] leading-[14px] tracking-[1px] uppercase text-black">
                            {formatDate(articles[1].publicationDateOverride || articles[1].createdAt)}
                          </div>
                        </div>
                        <h3 className="font-ibm-plex-sans text-[18px] leading-[28px] text-black group-hover:text-black/70 transition-colors line-clamp-2">
                          {articles[1].title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="bg-black h-full shrink-0 w-px" />

            {/* Center Column - Featured Article */}
            {articles[2] && (
              <Link href={`/news/${articles[2].slug}`} className="flex-1 flex flex-col gap-8 h-full group cursor-pointer animate-slide-up stagger-2">
                <div className="flex flex-col gap-6 items-center shrink-0 w-full">
                  <div className="flex flex-col gap-3 items-center">
                    <div className="font-ibm-plex-sans-condensed text-[14px] leading-[14px] tracking-[1.4px] uppercase text-black">
                      {getArticleCategory(articles[2])}
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="font-ibm-plex-sans-condensed font-medium text-[10px] leading-[14px] tracking-[1px] uppercase text-black">
                        {formatDate(articles[2].publicationDateOverride || articles[2].createdAt)}
                      </div>
                      <div className="w-1 h-1 border border-black rotate-45" />
                      <div className="font-ibm-plex-sans-condensed font-medium text-[10px] leading-[14px] tracking-[1px] uppercase text-black">
                        {getReadingTime(articles[2].content)}
                      </div>
                    </div>
                  </div>
                  <h1 className="font-gilda-display text-[36px] leading-[48px] text-center text-black group-hover:text-black/70 transition-colors">
                    {articles[2].title}
                  </h1>
                  {articles[2].excerpt && (
                    <p className="font-ibm-plex-sans text-[18px] leading-[28px] text-center text-black max-w-lg">
                      {articles[2].excerpt.substring(0, 150)}...
                    </p>
                  )}
                </div>
                <div
                  className="flex-1 w-full bg-center bg-cover bg-no-repeat group-hover:opacity-90 transition-opacity"
                  style={{
                    backgroundImage: `url('${getImageUrl(articles[2])}')`
                  }}
                />
              </Link>
            )}

            {/* Vertical Divider */}
            <div className="bg-black h-full shrink-0 w-px" />

            {/* Right Column - Small Articles */}
            <div className="w-80 shrink-0 animate-slide-up stagger-3">
              <div className="flex flex-col gap-6">
                {articles.slice(3, 7).map((article, index) => (
                  <React.Fragment key={article.id}>
                    <Link href={`/news/${article.slug}`} className="flex gap-4 items-center w-full group cursor-pointer">
                      <div className="flex items-center h-[70px]">
                        <div
                          className="bg-center bg-cover bg-no-repeat h-full shrink-0 w-[105px] group-hover:opacity-90 transition-opacity"
                          style={{
                            backgroundImage: `url('${getImageUrl(article)}')`
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                          <div className="font-ibm-plex-sans-condensed font-medium text-[10px] leading-[14px] tracking-[1px] uppercase text-black">
                            {formatDate(article.publicationDateOverride || article.createdAt)}
                          </div>
                          <div className="font-ibm-plex-sans-condensed text-[14px] leading-[14px] tracking-[1.4px] uppercase text-black">
                            {getArticleCategory(article)}
                          </div>
                        </div>
                        <h3 className="font-ibm-plex-sans text-[16px] leading-[24px] text-black group-hover:text-black/70 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </div>
                    </Link>
                    {index < 3 && <div className="bg-black h-px shrink-0 w-full" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Banner Section */}
      {!hasActiveFilters && articles[7] && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="relative overflow-hidden" style={{ height: '400px' }}>
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url('${getImageUrl(articles[7])}')`,
                filter: 'brightness(0.6)'
              }}
            />
            <div className="relative h-full flex items-center justify-center">
              <div className="px-6 lg:px-12 py-12 flex flex-col gap-8 items-center text-center">
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex flex-col gap-3 items-center">
                    <div className="font-ibm-plex-sans-condensed text-[14px] leading-[14px] tracking-[1.4px] uppercase text-white">
                      {getArticleCategory(articles[7])}
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="font-ibm-plex-sans-condensed font-medium text-[10px] leading-[14px] tracking-[1px] uppercase text-white">
                        {formatDate(articles[7].publicationDateOverride || articles[7].createdAt)}
                      </div>
                      <div className="w-1 h-1 border border-white rotate-45" />
                      <div className="font-ibm-plex-sans-condensed font-medium text-[10px] leading-[14px] tracking-[1px] uppercase text-white">
                        {getReadingTime(articles[7].content)}
                      </div>
                    </div>
                  </div>
                  <h2 className="font-gilda-display text-[32px] sm:text-[48px] leading-[40px] sm:leading-[56px] text-white capitalize max-w-[600px]">
                    {articles[7].title}
                  </h2>
                </div>
                <Link
                  href={`/news/${articles[7].slug}`}
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-neutral-100 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Article Grid - Enhanced Editorial Style */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        {/* Results Header with editorial styling */}
        <div className="flex items-end justify-between mb-12 pb-6 border-b border-[#e5e5e5]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-[1px] bg-black/20" />
              <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-black/40">
                {hasActiveFilters ? 'Filtered Results' : 'Latest Stories'}
              </span>
            </div>
            <h2 className="text-[32px] md:text-[40px] font-gilda-display text-black leading-tight">
              {hasActiveFilters
                ? (categories.find(c => c.slug === selectedCategory.toLowerCase())?.label || selectedCategory)
                : 'All Articles'}
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <div className="text-[28px] font-gilda-display text-black">{filteredArticles.length}</div>
              <div className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-black/40">
                {filteredArticles.length === 1 ? 'Story' : 'Stories'}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid with improved layout */}
        {(hasActiveFilters ? filteredArticles : paginatedArticles).length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {(hasActiveFilters ? filteredArticles : paginatedArticles).map((article, index) => (
              <div
                key={article.id}
                className={`animate-slide-up stagger-${Math.min(index + 1, 12)} ${
                  index === 0 && !hasActiveFilters ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <NewsCard post={transformPostForCard(article)} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            type="news"
            searchQuery={selectedCategory !== 'All'
              ? (categories.find(c => c.slug === selectedCategory.toLowerCase())?.label || selectedCategory)
              : undefined}
            actionLabel="Clear Filters"
            actionHref="/news"
          />
        )}

        {/* Pagination - Enhanced Editorial Style */}
        {!hasActiveFilters && totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 mt-20 pt-10 border-t border-[#e5e5e5]">
            {/* Previous */}
            {currentPage > 1 && (
              <Link
                href={`/news?page=${currentPage - 1}`}
                className="px-4 py-3 text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors"
              >
                ← Prev
              </Link>
            )}

            {/* Page numbers */}
            <div className="flex items-center gap-1 mx-4">
              {[...Array(totalPages)].map((_, index) => (
                <Link
                  key={index}
                  href={`/news?page=${index + 1}`}
                  className={`w-10 h-10 flex items-center justify-center font-ibm-plex-sans-condensed text-[13px] transition-all duration-300 ${
                    currentPage === index + 1
                      ? 'bg-black text-white'
                      : 'bg-transparent text-black/40 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {index + 1}
                </Link>
              ))}
            </div>

            {/* Next */}
            {currentPage < totalPages && (
              <Link
                href={`/news?page=${currentPage + 1}`}
                className="px-4 py-3 text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Newsletter CTA - 2026 Design */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mb-16">
        <div className="relative bg-[#0a0a0a] overflow-hidden">
          {/* Modern 2026 background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]" />
            {/* Gradient orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-indigo-500/[0.05] via-transparent to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-purple-500/[0.04] via-transparent to-transparent blur-3xl" />
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }} />
          </div>

          <div className="relative z-10 py-20 md:py-24 px-8 md:px-16">
            <div className="max-w-3xl mx-auto">
              {/* Top decorative element */}
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
                <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] border border-white/[0.08]">
                  <Sparkles className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-white/50">
                    Newsletter
                  </span>
                </div>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
              </div>

              {/* Main content */}
              <div className="text-center mb-12">
                <h2 className="text-[36px] md:text-[52px] font-gilda-display text-white mb-6 leading-tight">
                  Stay Ahead of the
                  <br />
                  <span className="bg-gradient-to-r from-white/60 via-white/45 to-white/30 bg-clip-text text-transparent italic">AI Revolution</span>
                </h2>
                <p className="font-ibm-plex-sans text-[16px] md:text-[18px] leading-relaxed text-white/45 max-w-lg mx-auto">
                  Weekly insights, breaking stories, and exclusive analyses delivered straight to your inbox. No spam, ever.
                </p>
              </div>

              {/* Form */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 font-ibm-plex-sans text-[14px] bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
                <button className="group bg-white text-black px-8 py-4 font-ibm-plex-sans-condensed text-[12px] tracking-[0.15em] uppercase hover:bg-neutral-100 transition-all duration-300 flex items-center justify-center gap-3">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-[11px] font-ibm-plex-sans text-white/30">
                  <div className="w-1.5 h-1.5 bg-white/40" />
                  <span>5,000+ readers</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-ibm-plex-sans text-white/30">
                  <div className="w-1.5 h-1.5 bg-white/40" />
                  <span>Weekly digest</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-ibm-plex-sans text-white/30">
                  <div className="w-1.5 h-1.5 bg-white/40" />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
