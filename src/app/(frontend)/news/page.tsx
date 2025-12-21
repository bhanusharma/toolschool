import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Newspaper, Clock, ArrowRight, X } from 'lucide-react'
import { NewsCard, EmptyState } from '@/components/cards'

export const revalidate = 300 // 5 minutes ISR

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

// Category colors for visual distinction
const categoryColors: { [key: string]: string } = {
  'text': '#1a73e8',
  'image': '#e7131a',
  'video': '#fbbc04',
  'music': '#34a853',
  'code': '#ff5722',
  'web': '#9c27b0',
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

const categories = [
  { icon: '📝', label: 'TEXT', slug: 'text' },
  { icon: '🖼', label: 'IMAGE', slug: 'image' },
  { icon: '🎬', label: 'VIDEO', slug: 'video' },
  { icon: '🎵', label: 'MUSIC', slug: 'music' },
  { icon: '💻', label: 'CODE', slug: 'code' },
  { icon: '🌐', label: 'WEB / APP', slug: 'web' }
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

  // Server-side filtering
  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((article) => {
        const category = getArticleCategory(article)
        return category.toUpperCase().includes(selectedCategory.toUpperCase())
      })

  // Server-side pagination
  const heroArticlesCount = Math.min(7, filteredArticles.length)
  const remainingArticles = filteredArticles.slice(heroArticlesCount)
  const totalPages = Math.ceil(remainingArticles.length / articlesPerPage)
  const paginatedArticles = remainingArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  // If no articles, show empty state
  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f8f8]">
        {/* Hero Section */}
        <section className="relative bg-black overflow-hidden">
          <div className="absolute inset-0">
            {/* Geometric background - different from builders (bottom-right accent) */}
            <div
              className="absolute bottom-0 right-0 w-[40%] h-[70%] bg-[#e7131a] opacity-90 animate-geometric"
              style={{ clipPath: 'polygon(100% 30%, 100% 100%, 30% 100%)' }}
            />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  linear-gradient(to right, white 1px, transparent 1px),
                  linear-gradient(to bottom, white 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
              }} />
            </div>
          </div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 mb-6 animate-hero">
                <Newspaper className="w-4 h-4 text-[#e7131a]" />
                <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/80">
                  AI News & Insights
                </span>
              </div>

              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[0.95] font-gilda-display text-white mb-6 animate-hero-delay-1">
                Latest
                <br />
                <span className="text-[#e7131a]">Updates</span>
              </h1>

              <p className="font-ibm-plex-sans text-[16px] md:text-[18px] leading-relaxed text-white/70 max-w-md animate-hero-delay-2">
                Stay ahead with breaking news, trends, and insights from the world of AI creation.
              </p>
            </div>
          </div>
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
      {/* Hero Section with Featured Article */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          {/* Geometric background - bottom-right triangle accent */}
          <div
            className="absolute bottom-0 right-0 w-[40%] h-[70%] bg-[#e7131a] opacity-90 animate-geometric"
            style={{ clipPath: 'polygon(100% 30%, 100% 100%, 30% 100%)' }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }} />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Title and Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 mb-6 animate-hero">
                <Newspaper className="w-4 h-4 text-[#e7131a]" />
                <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/80">
                  AI News & Insights
                </span>
              </div>

              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[0.95] font-gilda-display text-white mb-6 animate-hero-delay-1">
                Latest
                <br />
                <span className="text-[#e7131a]">Updates</span>
              </h1>

              <p className="font-ibm-plex-sans text-[16px] md:text-[18px] leading-relaxed text-white/70 max-w-md mb-8 animate-hero-delay-2">
                Stay ahead with breaking news, trends, and insights from the world of AI creation.
              </p>

              {/* Quick stats */}
              <div className="flex items-center gap-8 pt-8 border-t border-white/20 animate-hero-delay-3">
                <div>
                  <div className="text-[32px] font-gilda-display text-white">{articles.length}+</div>
                  <div className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/50">Articles</div>
                </div>
                <div>
                  <div className="text-[32px] font-gilda-display text-white">{categories.length}</div>
                  <div className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/50">Categories</div>
                </div>
              </div>
            </div>

            {/* Right - Featured Article Preview */}
            {articles[0] && !hasActiveFilters && (
              <div className="hidden lg:block animate-slide-left stagger-4">
                <NewsCard post={transformPostForCard(articles[0])} variant="featured" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Cards (when not filtering) */}
      {!hasActiveFilters && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white border-b border-[#e5e5e5]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => {
              const color = categoryColors[cat.slug] || '#000'
              const staggerClass = `stagger-${index + 1}`
              return (
                <Link
                  key={cat.label}
                  href={`/news?category=${cat.label}`}
                  className={`group p-6 border border-[#e5e5e5] hover:border-black transition-all duration-200 animate-slide-up ${staggerClass}`}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4 text-2xl"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="font-gilda-display text-[14px] text-black group-hover:text-[#e7131a] transition-colors">
                    {cat.label}
                  </h3>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-4 bg-white border-b border-[#e5e5e5] sticky top-14 md:top-16 lg:top-20 z-40">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {/* All Articles */}
          <Link
            href="/news"
            className={`flex-shrink-0 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase border transition-all ${
              !hasActiveFilters
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/70 border-[#e5e5e5] hover:border-black hover:text-black'
            }`}
          >
            All Articles ({articles.length})
          </Link>

          {/* Category Filters */}
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.label
            const color = categoryColors[cat.slug] || '#000'

            return (
              <Link
                key={cat.label}
                href={buildFilterUrl(params, 'category', isActive ? null : cat.label)}
                className={`flex-shrink-0 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase border transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-white border-transparent'
                    : 'bg-white text-black/70 border-[#e5e5e5] hover:border-black hover:text-black'
                }`}
                style={isActive ? { backgroundColor: color } : {}}
              >
                <span className="text-[14px]">{cat.icon}</span>
                {cat.label}
                {isActive && <X className="w-3 h-3 ml-1" />}
              </Link>
            )
          })}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <>
              <div className="w-px h-6 bg-[#e5e5e5] mx-2 flex-shrink-0" />
              <Link
                href="/news"
                className="flex-shrink-0 flex items-center gap-1 text-[12px] font-ibm-plex-sans text-[#e7131a] hover:underline"
              >
                <X className="w-3 h-3" />
                Clear
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-3 bg-[#f6f4f1] border-b border-[#e5e5e5]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-ibm-plex-sans text-black/50">Filtering by:</span>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e5] text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase hover:border-black transition-colors"
            >
              {selectedCategory}
              <X className="w-3 h-3" />
            </Link>
          </div>
        </section>
      )}

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
                        <h3 className="font-ibm-plex-sans text-[18px] leading-[28px] text-black group-hover:text-[#E7131A] transition-colors line-clamp-2">
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
                        <h3 className="font-ibm-plex-sans text-[18px] leading-[28px] text-black group-hover:text-[#E7131A] transition-colors line-clamp-2">
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
                  <h1 className="font-gilda-display text-[36px] leading-[48px] text-center text-black group-hover:text-[#E7131A] transition-colors">
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
                        <h3 className="font-ibm-plex-sans text-[16px] leading-[24px] text-black group-hover:text-[#E7131A] transition-colors line-clamp-2">
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
                  className="inline-flex items-center gap-2 bg-[#e7131a] text-white px-6 py-3 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-[#c10e14] transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Article Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[24px] font-gilda-display text-black">
              {hasActiveFilters ? 'Filtered Articles' : 'All Articles'}
            </h2>
            <p className="text-[14px] font-ibm-plex-sans text-black/50 mt-1">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        {(hasActiveFilters ? filteredArticles : paginatedArticles).length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(hasActiveFilters ? filteredArticles : paginatedArticles).map((article, index) => (
              <div key={article.id} className={`animate-slide-up stagger-${Math.min(index + 1, 12)}`}>
                <NewsCard post={transformPostForCard(article)} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            type="news"
            searchQuery={selectedCategory !== 'All' ? selectedCategory : undefined}
            actionLabel="Clear Filters"
            actionHref="/news"
          />
        )}

        {/* Pagination */}
        {!hasActiveFilters && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            {[...Array(totalPages)].map((_, index) => (
              <Link
                key={index}
                href={`/news?page=${index + 1}`}
                className={`w-10 h-10 flex items-center justify-center font-ibm-plex-sans-condensed text-[14px] border transition-all ${
                  currentPage === index + 1
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-[#e5e5e5] hover:border-black'
                }`}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mb-12">
        <div className="relative bg-black py-16 px-8 md:px-12 overflow-hidden">
          {/* Geometric accent - bottom-left triangle */}
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-[#e7131a] opacity-90"
            style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
          />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <h2 className="text-[32px] md:text-[40px] font-gilda-display text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="font-ibm-plex-sans text-[16px] text-white/70 mb-8">
              Get the latest AI news and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 font-ibm-plex-sans text-[14px] bg-white text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[#e7131a]"
              />
              <button className="bg-[#e7131a] text-white px-6 py-3 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-[#c10e14] transition-colors flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
