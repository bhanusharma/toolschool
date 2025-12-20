import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import NewsArticleClient from './NewsArticleClient'

export const revalidate = 600 // 10 minutes ISR

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
    id: number | string
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
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getArticleCategory = (post: Post) => {
  return post.categoryBadge?.toUpperCase() ||
         (typeof post.newsCategory === 'object' && post.newsCategory?.title?.toUpperCase()) ||
         'NEWS'
}

const getImageUrl = (post: Post) => {
  if (typeof post.featuredImage !== 'object' || !post.featuredImage?.url) {
    return null
  }
  return post.featuredImage.url
}

// Render rich text content from Payload
function RenderRichText({ content }: { content: any }) {
  if (!content) return null

  // If it's already a string, return it
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  // If it's Payload's Lexical/Slate format
  if (content.root?.children || Array.isArray(content)) {
    const nodes = content.root?.children || content

    return (
      <div className="prose prose-lg max-w-none font-ibm-plex-sans">
        {nodes.map((node: any, index: number) => {
          if (node.type === 'paragraph') {
            const text = node.children?.map((child: any) => child.text || '').join('') || ''
            return <p key={index} className="mb-4 text-[16px] leading-[28px] text-black/80">{text}</p>
          }
          if (node.type === 'heading') {
            const text = node.children?.map((child: any) => child.text || '').join('') || ''
            if (node.tag === 2) {
              return <h2 key={index} className="font-gilda-display text-[24px] mt-8 mb-4 text-black">{text}</h2>
            }
            return <h3 key={index} className="font-gilda-display text-[20px] mt-6 mb-3 text-black">{text}</h3>
          }
          if (node.type === 'list') {
            const ListTag = node.listType === 'number' ? 'ol' : 'ul'
            return (
              <ListTag key={index} className="mb-4 pl-6 list-disc">
                {node.children?.map((item: any, i: number) => (
                  <li key={i} className="mb-2 text-[16px] leading-[28px] text-black/80">
                    {item.children?.map((child: any) => child.text || '').join('')}
                  </li>
                ))}
              </ListTag>
            )
          }
          // Default: try to render text
          const text = node.children?.map((child: any) => child.text || '').join('') || node.text || ''
          return text ? <p key={index} className="mb-4 text-[16px] leading-[28px] text-black/80">{text}</p> : null
        })}
      </div>
    )
  }

  return null
}

async function getArticle(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config })
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug }
      },
      depth: 2,
      limit: 1,
    })
    return posts.docs[0] as Post || null
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}

async function getRelatedArticles(categoryId: string | number | undefined, excludeSlug: string): Promise<Post[]> {
  try {
    const payload = await getPayload({ config })
    const query: any = {
      collection: 'posts',
      depth: 2,
      limit: 3,
      where: {
        slug: { not_equals: excludeSlug }
      },
      sort: '-createdAt',
    }

    if (categoryId) {
      query.where.newsCategory = { equals: categoryId }
    }

    const posts = await payload.find(query)
    return posts.docs as Post[]
  } catch (error) {
    console.error('Failed to fetch related articles:', error)
    return []
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const categoryId = typeof article.newsCategory === 'object' ? article.newsCategory?.id : article.newsCategory
  const relatedArticles = await getRelatedArticles(categoryId, slug)
  const imageUrl = getImageUrl(article)

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section with Featured Image */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white">
          <div
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-center bg-cover bg-no-repeat relative"
            style={{
              backgroundImage: imageUrl
                ? `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url('${imageUrl}')`
                : 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)',
              backgroundColor: '#1a1a1a'
            }}
          >
            <div className="flex items-end h-full">
              <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-8">
                {/* Category Badge */}
                <span className="bg-[#e7131a] text-white px-3 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase">
                  {getArticleCategory(article)}
                </span>

                {/* Title */}
                <h1 className="text-[28px] sm:text-[36px] lg:text-[48px] leading-tight text-white mt-4 mb-4 font-gilda-display">
                  {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-white/80 text-[14px] font-ibm-plex-sans">
                  <span>{formatDate(article.publicationDateOverride || article.createdAt)}</span>
                  {article.author && typeof article.author === 'object' && article.author.email && (
                    <>
                      <span>•</span>
                      <span>by {article.author.email.split('@')[0]}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white px-6 sm:px-8 lg:px-12 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt */}
            {article.excerpt && (
              <div className="text-[18px] sm:text-[20px] font-ibm-plex-sans text-black/80 mb-8 leading-relaxed">
                {article.excerpt}
              </div>
            )}

            {/* Main Content */}
            <RenderRichText content={article.content} />

            {/* Share Section - Client Component */}
            <NewsArticleClient title={article.title} />
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1440px] bg-white border-t border-black/10 px-6 sm:px-8 lg:px-12 py-12">
            <h2 className="text-[28px] sm:text-[32px] text-black mb-8 font-gilda-display">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle.id} href={`/news/${relatedArticle.slug}`}>
                  <div className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {getImageUrl(relatedArticle) ? (
                        <Image
                          src={getImageUrl(relatedArticle)!}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-[20px] text-black mb-2 group-hover:text-[#e7131a] transition-colors font-gilda-display line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      {relatedArticle.excerpt && (
                        <p className="font-ibm-plex-sans text-[14px] text-black/70 mb-4 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      )}
                      <div className="text-[12px] font-ibm-plex-sans text-black/50">
                        {formatDate(relatedArticle.publicationDateOverride || relatedArticle.createdAt)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to News */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] bg-white px-6 sm:px-8 lg:px-12 py-8 border-t border-black/10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase text-black hover:text-[#e7131a] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>
        </div>
      </div>
    </div>
  )
}
