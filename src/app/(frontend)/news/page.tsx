import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

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
  { icon: '📝', label: 'TEXT' },
  { icon: '🖼', label: 'IMAGE' },
  { icon: '🎬', label: 'VIDEO' },
  { icon: '🎵', label: 'MUSIC' },
  { icon: '💻', label: 'CODE' },
  { icon: '🌐', label: 'WEB / APP' }
]

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

export default async function NewsPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const params = await searchParams
  const articles = await getNewsData()

  const selectedCategory = params.category || 'All'
  const currentPage = parseInt(params.page || '1', 10)
  const articlesPerPage = 9

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
      <div className="min-h-screen bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
          <div className="text-center">
            <h1 className="font-gilda-display text-[36px] sm:text-[48px] text-black mb-4">
              Latest News & Updates
            </h1>
            <p className="font-ibm-plex-sans text-[18px] text-black/60 mb-8">
              Stay updated with the latest AI tools, trends, and creative breakthroughs
            </p>
            <div className="py-20 border border-dashed border-black/20 rounded-lg">
              <p className="font-ibm-plex-sans text-black/50">No articles published yet. Check back soon!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Top Articles */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Featured Article */}
          {articles[0] && (
            <Link href={`/news/${articles[0].slug}`} className="block group">
              <div className="relative aspect-[16/10] mb-4 overflow-hidden">
                <Image
                  src={getImageUrl(articles[0])}
                  alt={articles[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="100vw"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-[#e7131a]">
                    {getArticleCategory(articles[0])}
                  </span>
                  <span className="font-ibm-plex-sans-condensed text-[10px] tracking-wider uppercase text-black/50">
                    {formatDate(articles[0].publicationDateOverride || articles[0].createdAt)}
                  </span>
                </div>
                <h2 className="font-gilda-display text-[24px] leading-tight text-black group-hover:text-[#e7131a] transition-colors">
                  {articles[0].title}
                </h2>
                {articles[0].excerpt && (
                  <p className="font-ibm-plex-sans text-[14px] text-black/70 line-clamp-2">
                    {articles[0].excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Other Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {articles.slice(1, 5).map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="flex gap-4 group">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                  <Image
                    src={getImageUrl(article)}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="font-ibm-plex-sans-condensed text-[10px] tracking-wider uppercase text-black/50">
                    {formatDate(article.publicationDateOverride || article.createdAt)}
                  </span>
                  <h3 className="font-ibm-plex-sans text-[16px] leading-snug text-black group-hover:text-[#e7131a] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Three Column */}
        <div className="hidden lg:flex gap-6 items-start" style={{ height: '656px' }}>
          {/* Left Column - Two Trending Articles */}
          <div className="flex flex-col gap-6 h-full shrink-0 w-80">
            {articles[0] && (
              <div className="flex-1 flex flex-col gap-6">
                <Link href={`/news/${articles[0].slug}`} className="block group h-full">
                  <div className="flex flex-col gap-6 h-full">
                    <div
                      className="flex-1 bg-center bg-cover bg-no-repeat w-80"
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
                      className="flex-1 bg-center bg-cover bg-no-repeat w-80"
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
            <Link href={`/news/${articles[2].slug}`} className="flex-1 flex flex-col gap-8 h-full group cursor-pointer">
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
          <div className="w-80 shrink-0">
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

      {/* Featured Banner Section */}
      {articles[7] && (
        <section className="max-w-[1440px] mx-auto relative overflow-hidden" style={{ height: '400px' }}>
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
                className="font-ibm-plex-sans-condensed text-[14px] leading-[14px] tracking-[1.4px] uppercase text-white underline hover:no-underline transition-all"
              >
                READ MORE
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter Tabs */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 sticky top-14 md:top-16 lg:top-20 z-40 bg-white border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between py-4 lg:py-6 overflow-x-auto">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link
              href="/news"
              className={`flex items-center gap-2 font-ibm-plex-sans-condensed text-[12px] lg:text-[14px] leading-[14px] tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'text-[#E7131A]'
                  : 'text-black hover:text-[#E7131A]'
              }`}
            >
              <span>ALL</span>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.label}
                href={`/news?category=${selectedCategory === category.label ? 'All' : category.label}`}
                className={`flex items-center gap-2 font-ibm-plex-sans-condensed text-[12px] lg:text-[14px] leading-[14px] tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                  selectedCategory === category.label
                    ? 'text-[#E7131A]'
                    : 'text-black hover:text-[#E7131A]'
                }`}
              >
                <span className="text-[14px] lg:text-[16px]">{category.icon}</span>
                <span>{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Three Column Article Grid */}
      {paginatedArticles.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="block group">
                <article>
                  <div className="aspect-[16/10] relative mb-6 overflow-hidden">
                    <Image
                      src={getImageUrl(article)}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="font-ibm-plex-sans-condensed text-[10px] font-medium leading-[14px] tracking-[0.1em] uppercase text-black/50">
                      {formatDate(article.publicationDateOverride || article.createdAt)}
                    </div>
                    <h3 className="font-gilda-display text-[24px] leading-[32px] text-black group-hover:text-[#E7131A] transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="font-ibm-plex-sans text-[14px] leading-[24px] text-black line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <span className="inline-block font-ibm-plex-sans-condensed text-[14px] leading-[14px] tracking-[0.14em] uppercase text-black underline group-hover:text-[#E7131A] transition-colors">
                      READ MORE
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              {[...Array(totalPages)].map((_, index) => (
                <Link
                  key={index}
                  href={`/news?page=${index + 1}&category=${selectedCategory}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPage === index + 1
                      ? 'bg-black'
                      : 'bg-black/20 hover:bg-black/40'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* All Articles Section */}
      {filteredArticles.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 bg-[#F6F4F1]">
          <h2 className="font-gilda-display text-[28px] lg:text-[36px] leading-[48px] text-black mb-8 lg:mb-12">
            All Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 lg:gap-y-8 gap-x-8">
            {filteredArticles.slice(0, 9).map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="block group">
                <article className="flex gap-4">
                  <div className="w-[80px] lg:w-[100px] h-[80px] lg:h-[100px] relative flex-shrink-0 overflow-hidden">
                    <Image
                      src={getImageUrl(article)}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="space-y-1">
                      <div className="font-ibm-plex-sans-condensed text-[10px] font-medium leading-[14px] tracking-[0.1em] uppercase text-black/50">
                        {formatDate(article.publicationDateOverride || article.createdAt)}
                      </div>
                      <div className="font-ibm-plex-sans-condensed text-[10px] leading-[14px] tracking-[0.1em] uppercase text-black">
                        {getArticleCategory(article)}
                      </div>
                    </div>
                    <h3 className="font-gilda-display text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] text-black group-hover:text-[#E7131A] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {filteredArticles.length > 9 && (
            <div className="flex justify-center mt-12 lg:mt-16">
              <Link
                href={`/news?category=${selectedCategory}&showAll=true`}
                className="font-ibm-plex-sans-condensed text-[14px] leading-[14px] tracking-[0.14em] uppercase text-black border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-300"
              >
                LOAD MORE
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Newsletter Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="bg-black px-6 lg:px-12 py-12 lg:py-16 text-center">
          <h2 className="font-gilda-display text-[28px] lg:text-[36px] leading-[36px] lg:leading-[48px] text-white mb-6 lg:mb-8">
            Get the latest in AI: subscribe to our newsletter.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 font-ibm-plex-sans text-[14px] bg-white text-black placeholder:text-black/50 focus:outline-none"
            />
            <button className="bg-[#e7131a] text-white px-8 py-3 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-[#c10e14] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
