import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'

async function getHomePageData() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [tools, categories, builders, posts] = await Promise.all([
    payload.find({
      collection: 'tools',
      limit: 8,
      sort: '-createdAt',
      where: {
        featured: { equals: true },
      },
    }),
    payload.find({
      collection: 'tool-categories',
      limit: 8,
    }),
    payload.find({
      collection: 'builders',
      limit: 4,
      where: {
        featured: { equals: true },
      },
    }),
    payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-createdAt',
    }),
  ])

  return {
    tools: tools.docs,
    categories: categories.docs,
    builders: builders.docs,
    posts: posts.docs,
    totalTools: tools.totalDocs,
  }
}

// Category data with descriptions and colors
const categoryData: { [key: string]: { description: string; emoji: string; color: string } } = {
  'image-generation': {
    description: 'Create stunning visuals with AI',
    emoji: '🎨',
    color: '#e7131a',
  },
  'text-copywriting': {
    description: 'Generate and enhance written content',
    emoji: '✍️',
    color: '#1a73e8',
  },
  'music-audio': {
    description: 'Compose and produce AI music',
    emoji: '🎵',
    color: '#34a853',
  },
  'video-film': {
    description: 'Edit and generate video content',
    emoji: '🎬',
    color: '#fbbc04',
  },
  'graphic-design': {
    description: 'Design tools powered by AI',
    emoji: '🖌️',
    color: '#9c27b0',
  },
  'website-app': {
    description: 'Build websites with AI assistance',
    emoji: '🌐',
    color: '#00bcd4',
  },
  coding: {
    description: 'Code generation and assistance',
    emoji: '💻',
    color: '#ff5722',
  },
  '3d': {
    description: '3D modeling and rendering',
    emoji: '🎲',
    color: '#673ab7',
  },
  animation: {
    description: 'Animate with AI tools',
    emoji: '🎞️',
    color: '#e91e63',
  },
}

export default async function HomePage() {
  const { tools, categories, builders, posts } = await getHomePageData()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Bold Editorial Design */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-black overflow-hidden">
          {/* Geometric background pattern */}
          <div className="absolute inset-0">
            {/* Large red diagonal accent */}
            <div
              className="absolute -right-20 top-0 w-[600px] h-[600px] bg-[#e7131a] animate-geometric"
              style={{
                clipPath: 'polygon(100% 0, 100% 100%, 30% 100%, 60% 0)',
              }}
            />
            {/* Grid lines */}
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

          <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Column - Typography */}
              <div className="max-w-[600px]">
                <div className="flex items-center gap-3 mb-8 animate-hero">
                  <div className="w-2 h-2 bg-[#e7131a]" />
                  <span className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.2em] uppercase text-white/60">
                    AI Creator Platform
                  </span>
                </div>

                <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] xl:text-[84px] leading-[0.95] font-gilda-display text-white mb-8 animate-hero-delay-1">
                  Where
                  <br />
                  <span className="text-[#e7131a]">Creators</span>
                  <br />
                  Find AI Tools
                </h1>

                <p className="font-ibm-plex-sans text-[16px] sm:text-[18px] leading-[1.6] text-white/70 mb-10 max-w-[440px] animate-hero-delay-2">
                  Discover curated AI tools, showcase your creations, and connect with
                  innovators building the future.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-hero-delay-3">
                  <Link
                    href="/tools"
                    className="group bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white hover:text-black inline-flex items-center justify-center gap-3"
                  >
                    Explore Tools
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/learn"
                    className="group border border-white/30 text-white px-8 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white inline-flex items-center justify-center gap-3"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>

              {/* Right Column - Category Showcase */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Floating category cards - stacked asymmetrically */}
                  <div className="space-y-4">
                    {categories.slice(0, 4).map((category: any, index: number) => {
                      const data = categoryData[category.slug] || {
                        description: 'Explore AI tools',
                        emoji: '🤖',
                        color: '#e7131a',
                      }
                      const offsets = ['ml-0', 'ml-12', 'ml-6', 'ml-16']
                      const staggerClasses = ['stagger-4', 'stagger-5', 'stagger-6', 'stagger-7']
                      return (
                        <Link
                          key={category.id}
                          href={`/tools?category=${category.slug}`}
                          className={`block ${offsets[index]} group animate-slide-left ${staggerClasses[index]}`}
                        >
                          <div className="bg-white/5 backdrop-blur border border-white/10 p-5 flex items-center gap-5 transition-all duration-300 hover:bg-white hover:border-white group-hover:translate-x-2">
                            <div
                              className="w-12 h-12 flex items-center justify-center text-2xl transition-colors"
                              style={{ backgroundColor: `${data.color}20` }}
                            >
                              {data.emoji}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-ibm-plex-sans-condensed text-[14px] tracking-[0.1em] uppercase text-white group-hover:text-black transition-colors">
                                {category.title}
                              </h3>
                              <p className="font-ibm-plex-sans text-[13px] text-white/50 group-hover:text-black/60 transition-colors mt-0.5">
                                {data.description}
                              </p>
                            </div>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="text-white/30 group-hover:text-black/50 transition-all group-hover:translate-x-1"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Ticker */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-[#e7131a] overflow-hidden">
          <div className="flex items-center justify-between px-6 lg:px-12 py-4">
            <div className="flex items-center gap-8 lg:gap-16">
              <div className="flex items-center gap-3">
                <span className="font-gilda-display text-[28px] lg:text-[36px] text-white">50+</span>
                <span className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.15em] uppercase text-white/80">
                  AI Tools
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span className="font-gilda-display text-[28px] lg:text-[36px] text-white">8</span>
                <span className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.15em] uppercase text-white/80">
                  Categories
                </span>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <span className="font-gilda-display text-[28px] lg:text-[36px] text-white">Daily</span>
                <span className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.15em] uppercase text-white/80">
                  Updates
                </span>
              </div>
            </div>
            <Link
              href="/tools"
              className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.15em] uppercase text-white hover:underline"
            >
              Browse All →
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Section - Split Layout */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Left - Featured Tools */}
            <div className="px-6 lg:px-12 py-16 lg:py-20 border-r border-black/10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#e7131a]" />
                  <h2 className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.2em] uppercase text-black/50">
                    Featured Tools
                  </h2>
                </div>
                <Link
                  href="/tools"
                  className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-6">
                {tools.slice(0, 4).map((tool: any, index: number) => {
                  const categoryColor = categoryData[tool.toolCategory?.slug]?.color || '#e7131a'
                  return (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      className="group flex items-start gap-5 p-5 -mx-5 hover:bg-[#f6f4f1] transition-colors"
                    >
                      <div
                        className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${categoryColor}15` }}
                      >
                        {tool.logo?.url ? (
                          <Image
                            src={tool.logo.url}
                            alt={tool.title}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        ) : (
                          <span
                            className="text-xl font-gilda-display"
                            style={{ color: categoryColor }}
                          >
                            {tool.title.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-gilda-display text-[20px] text-black group-hover:text-[#e7131a] transition-colors">
                            {tool.title}
                          </h3>
                          {index === 0 && (
                            <span className="px-2 py-0.5 bg-black text-white text-[9px] font-ibm-plex-sans-condensed tracking-wider uppercase">
                              New
                            </span>
                          )}
                        </div>
                        <p className="font-ibm-plex-sans text-[14px] text-black/60 line-clamp-1">
                          {tool.tagline}
                        </p>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black/20 group-hover:text-[#e7131a] transition-all flex-shrink-0 mt-2 group-hover:translate-x-1"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Right - Latest from Blog/Builders */}
            <div className="px-6 lg:px-12 py-16 lg:py-20">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black" />
                  <h2 className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.2em] uppercase text-black/50">
                    Latest News
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-8">
                {posts.slice(0, 3).map((post: any, index: number) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group block"
                  >
                    <div className="flex items-start gap-5">
                      <span className="font-gilda-display text-[32px] text-black/10 leading-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <span className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.15em] uppercase text-[#e7131a] mb-2 block">
                          {post.categoryBadge || 'News'}
                        </span>
                        <h3 className="font-gilda-display text-[20px] leading-[1.3] text-black group-hover:text-[#e7131a] transition-colors">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Featured Builder Spotlight */}
              {builders[0] && (
                <div className="mt-12 pt-12 border-t border-black/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 bg-[#e7131a]" />
                    <h2 className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.2em] uppercase text-black/50">
                      Builder Spotlight
                    </h2>
                  </div>
                  <Link href={`/builders/${builders[0].slug}`} className="group flex items-center gap-5">
                    <div className="w-16 h-16 bg-[#f6f4f1] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {typeof builders[0].profileImage === 'object' && builders[0].profileImage?.url ? (
                        <Image
                          src={builders[0].profileImage.url}
                          alt={builders[0].title}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-xl font-gilda-display text-black/30">
                          {builders[0].title?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-gilda-display text-[18px] text-black group-hover:text-[#e7131a] transition-colors">
                        {builders[0].title}
                      </h3>
                      <p className="font-ibm-plex-sans text-[13px] text-black/50 line-clamp-1 mt-0.5">
                        {builders[0].bio}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid - Bold Treatment */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-[#f6f4f1] py-16 lg:py-24 px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-gilda-display text-[32px] lg:text-[40px] text-black">
              Browse by Category
            </h2>
            <Link
              href="/tools"
              className="hidden sm:inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[12px] tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors"
            >
              View All Categories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.slice(0, 8).map((category: any) => {
              const data = categoryData[category.slug] || {
                description: 'Explore AI tools',
                emoji: '🤖',
                color: '#e7131a',
              }
              return (
                <Link
                  key={category.id}
                  href={`/tools?category=${category.slug}`}
                  className="group bg-white p-6 lg:p-8 border border-black/5 hover:border-black transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: `${data.color}15` }}
                  >
                    {data.emoji}
                  </div>
                  <h3 className="font-gilda-display text-[18px] lg:text-[20px] text-black group-hover:text-[#e7131a] transition-colors mb-1">
                    {category.title}
                  </h3>
                  <p className="font-ibm-plex-sans text-[13px] text-black/50 hidden sm:block">
                    {data.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section - Bold Black */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-black overflow-hidden">
          {/* Geometric accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[200px] bg-[#e7131a]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)' }}
          />

          <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-20">
            <div className="max-w-[700px] mx-auto text-center">
              <h2 className="font-gilda-display text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.1] text-white mb-6">
                Ready to Create
                <br />
                <span className="text-[#e7131a]">with AI?</span>
              </h2>
              <p className="font-ibm-plex-sans text-[16px] lg:text-[18px] text-white/60 mb-10 max-w-[500px] mx-auto">
                Join creators discovering the best AI tools. Start exploring
                and unlock your creative potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools"
                  className="group bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white hover:text-black inline-flex items-center justify-center gap-3"
                >
                  Browse All Tools
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="/builders"
                  className="group border border-white/30 text-white px-8 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white inline-flex items-center justify-center"
                >
                  Meet the Builders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Clean */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white py-16 lg:py-20 px-6 lg:px-12 border-t border-black/10">
          <div className="max-w-[500px] mx-auto text-center">
            <h2 className="font-gilda-display text-[28px] lg:text-[32px] text-black mb-3">
              Stay Updated
            </h2>
            <p className="font-ibm-plex-sans text-[15px] text-black/50 mb-8">
              Get the latest AI tools and news delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-[#f6f4f1] border-0 font-ibm-plex-sans text-[15px] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#e7131a]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
