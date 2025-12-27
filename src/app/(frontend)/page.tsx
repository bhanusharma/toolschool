import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  Sparkles,
  PenLine,
  Music,
  Video,
  Hammer,
  Box,
  Zap,
  MessageSquare,
  TrendingUp,
  BarChart,
  type LucideIcon,
} from 'lucide-react'
// ASCII Hero commented out for now - may use elsewhere later
// import { AsciiHero } from '@/components/AsciiHero'

// Force dynamic rendering - D1 database not available during static build in CI
export const dynamic = 'force-dynamic'

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

// Category data with descriptions, icons, and colors (10 categories)
const categoryData: { [key: string]: { description: string; icon: LucideIcon; color: string } } = {
  writing: {
    description: 'Generate and enhance written content',
    icon: PenLine,
    color: '#1a73e8',
  },
  image: {
    description: 'Create stunning visuals with AI',
    icon: Sparkles,
    color: '#8b5cf6',
  },
  video: {
    description: 'Edit and generate video content',
    icon: Video,
    color: '#9c27b0',
  },
  audio: {
    description: 'Compose and produce AI music',
    icon: Music,
    color: '#ff5722',
  },
  automation: {
    description: 'Automate workflows and tasks',
    icon: Zap,
    color: '#10b981',
  },
  chatbots: {
    description: 'Conversational AI and agents',
    icon: MessageSquare,
    color: '#6366f1',
  },
  marketing: {
    description: 'SEO, ads, and content strategy',
    icon: TrendingUp,
    color: '#f59e0b',
  },
  data: {
    description: 'Analytics and visualization',
    icon: BarChart,
    color: '#06b6d4',
  },
  building: {
    description: 'Build apps and websites with AI',
    icon: Hammer,
    color: '#fbbc04',
  },
  '3d': {
    description: '3D modeling and rendering',
    icon: Box,
    color: '#673ab7',
  },
}

export default async function HomePage() {
  const { tools, categories, builders, posts } = await getHomePageData()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Bold Editorial Design */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-black overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0">
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111] to-black" />
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
                  <div className="w-8 h-[1px] bg-white/40" />
                  <span className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.2em] uppercase text-white/60">
                    AI Creator Platform
                  </span>
                </div>

                <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] xl:text-[84px] leading-[0.95] font-gilda-display text-white mb-8 animate-hero-delay-1">
                  Where
                  <br />
                  <span className="text-white/50">Creators</span>
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
                    className="group bg-white text-black px-8 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/90 inline-flex items-center justify-center gap-3"
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
                    className="group bg-black border border-white/20 text-white px-8 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/40 inline-flex items-center justify-center gap-3"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>

              {/* Right Column - Category Showcase */}
              {/* Mobile: 2x2 grid */}
              <div className="lg:hidden mt-8">
                <div className="grid grid-cols-2 gap-3">
                  {categories.slice(0, 4).map((category: any, index: number) => {
                    const data = categoryData[category.slug] || {
                      description: 'Explore AI tools',
                      icon: Sparkles,
                      color: '#6366f1',
                    }
                    const IconComponent = data.icon
                    return (
                      <Link
                        key={category.id}
                        href={`/tools?category=${category.slug}`}
                        className={`group animate-slide-up stagger-${index + 4}`}
                      >
                        <div className="relative bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] p-4 transition-all duration-300 hover:bg-white/[0.1]">
                          <div
                            className="w-9 h-9 flex items-center justify-center mb-3"
                            style={{ backgroundColor: `${data.color}20` }}
                          >
                            <IconComponent
                              size={18}
                              strokeWidth={1.5}
                              style={{ color: data.color }}
                            />
                          </div>
                          <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.1em] uppercase text-white/90">
                            {category.title}
                          </h3>
                          <p className="font-ibm-plex-sans text-[11px] text-white/40 mt-1 line-clamp-1">
                            {data.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Desktop: Stacked cards with offsets */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="space-y-3">
                    {categories.slice(0, 4).map((category: any, index: number) => {
                      const data = categoryData[category.slug] || {
                        description: 'Explore AI tools',
                        icon: Sparkles,
                        color: '#6366f1',
                      }
                      const IconComponent = data.icon
                      const offsets = ['ml-0', 'ml-8', 'ml-4', 'ml-12']
                      const staggerClasses = ['stagger-4', 'stagger-5', 'stagger-6', 'stagger-7']
                      return (
                        <Link
                          key={category.id}
                          href={`/tools?category=${category.slug}`}
                          className={`block ${offsets[index]} group animate-slide-left ${staggerClasses[index]}`}
                        >
                          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-5 flex items-center gap-5 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 group-hover:translate-x-2 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div
                              className="relative w-11 h-11 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                              style={{ backgroundColor: `${data.color}15` }}
                            >
                              <IconComponent
                                size={22}
                                strokeWidth={1.5}
                                className="transition-colors"
                                style={{ color: data.color }}
                              />
                            </div>
                            <div className="relative flex-1">
                              <h3 className="font-ibm-plex-sans-condensed text-[13px] tracking-[0.12em] uppercase text-white/90 group-hover:text-white transition-colors">
                                {category.title}
                              </h3>
                              <p className="font-ibm-plex-sans text-[12px] text-white/40 group-hover:text-white/60 transition-colors mt-0.5">
                                {data.description}
                              </p>
                            </div>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="relative text-white/20 group-hover:text-white/50 transition-all duration-300 group-hover:translate-x-1"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - Modern 2026 */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-[#fafafa] border-y border-black/[0.06] overflow-hidden">
          <div className="relative flex items-center justify-between px-6 lg:px-12 py-6">
            <div className="flex items-center gap-10 lg:gap-20">
              <div className="flex items-center gap-4 group/stat cursor-default">
                <span className="font-gilda-display text-[32px] lg:text-[40px] text-black/90 transition-all duration-300 group-hover/stat:text-black">50+</span>
                <div className="flex flex-col">
                  <span className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.2em] uppercase text-black/40">
                    Curated
                  </span>
                  <span className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.15em] uppercase text-black/70">
                    AI Tools
                  </span>
                </div>
              </div>
              <div className="hidden sm:block w-[1px] h-8 bg-black/10" />
              <div className="hidden sm:flex items-center gap-4 group/stat cursor-default">
                <span className="font-gilda-display text-[32px] lg:text-[40px] text-black/90 transition-all duration-300 group-hover/stat:text-black">8</span>
                <div className="flex flex-col">
                  <span className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.2em] uppercase text-black/40">
                    Creative
                  </span>
                  <span className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.15em] uppercase text-black/70">
                    Categories
                  </span>
                </div>
              </div>
              <div className="hidden md:block w-[1px] h-8 bg-black/10" />
              <div className="hidden md:flex items-center gap-4 group/stat cursor-default">
                <span className="font-gilda-display text-[32px] lg:text-[40px] text-black/90 transition-all duration-300 group-hover/stat:text-black">Daily</span>
                <div className="flex flex-col">
                  <span className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.2em] uppercase text-black/40">
                    Fresh
                  </span>
                  <span className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.15em] uppercase text-black/70">
                    Updates
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/tools"
              className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.2em] uppercase text-black/40 hover:text-black transition-all duration-300 flex items-center gap-2 group/link"
            >
              Browse All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover/link:translate-x-1">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Section - Modern Split Layout */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Left - Featured Tools */}
            <div className="px-6 lg:px-12 py-20 lg:py-24 border-r border-black/[0.06]">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[1px] bg-gradient-to-r from-black/30 to-transparent" />
                  <h2 className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.25em] uppercase text-black/40">
                    Featured Tools
                  </h2>
                </div>
                <Link
                  href="/tools"
                  className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.2em] uppercase text-black/40 hover:text-black transition-all duration-300 group/viewall flex items-center gap-1.5"
                >
                  View All
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover/viewall:translate-x-0.5">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-3">
                {tools.length > 0 ? (
                  tools.slice(0, 4).map((tool: any, index: number) => {
                    const categoryColor = categoryData[tool.toolCategory?.slug]?.color || '#6366f1'
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className={`group relative flex items-start gap-5 p-5 -mx-5 transition-all duration-500 animate-slide-up stagger-${index + 1} overflow-hidden`}
                      >
                        {/* Hover background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div
                          className="relative w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{ backgroundColor: `${categoryColor}10` }}
                        >
                          {tool.logo?.url ? (
                            <Image
                              src={tool.logo.url}
                              alt={tool.title}
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          ) : (
                            <span
                              className="text-lg font-gilda-display"
                              style={{ color: categoryColor }}
                            >
                              {tool.title.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="relative flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                            <h3 className="font-gilda-display text-[18px] text-black group-hover:text-black/80 transition-colors">
                              {tool.title}
                            </h3>
                            {index === 0 && (
                              <span className="px-2 py-0.5 bg-black text-white text-[8px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase">
                                New
                              </span>
                            )}
                          </div>
                          <p className="font-ibm-plex-sans text-[13px] text-black/50 line-clamp-1 leading-relaxed">
                            {tool.tagline}
                          </p>
                        </div>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="relative text-black/15 group-hover:text-black/40 transition-all duration-300 flex-shrink-0 mt-1.5 group-hover:translate-x-1"
                        >
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    )
                  })
                ) : (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-start gap-5 p-5 -mx-5">
                        <div className="w-12 h-12 bg-black/[0.03] animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-black/[0.03] animate-pulse w-32" />
                          <div className="h-4 bg-black/[0.03] animate-pulse w-48" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right - Latest News */}
            <div className="px-6 lg:px-12 py-20 lg:py-24">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-black/80" />
                  <h2 className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.25em] uppercase text-black/40">
                    Latest News
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="font-ibm-plex-sans-condensed text-[11px] tracking-[0.2em] uppercase text-black/40 hover:text-black transition-all duration-300 group/viewall flex items-center gap-1.5"
                >
                  View All
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover/viewall:translate-x-0.5">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-5">
                {posts.slice(0, 3).map((post: any, index: number) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className={`group relative block p-4 -mx-4 transition-all duration-500 animate-slide-up stagger-${index + 5} overflow-hidden`}
                  >
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-start gap-5">
                      <span className="font-gilda-display text-[28px] text-black/[0.08] leading-none transition-colors duration-300 group-hover:text-black/15">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <span className="font-ibm-plex-sans-condensed text-[9px] tracking-[0.2em] uppercase text-black/35 mb-2 block">
                          {post.categoryBadge || 'News'}
                        </span>
                        <h3 className="font-gilda-display text-[18px] leading-[1.35] text-black group-hover:text-black/75 transition-colors duration-300">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Featured Builder Spotlight - Hidden for now
              {builders[0] && (
                <div className="mt-12 pt-12 border-t border-black/10 animate-slide-up stagger-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 bg-[#e7131a] animate-pulse-soft" />
                    <h2 className="font-ibm-plex-sans-condensed text-[12px] tracking-[0.2em] uppercase text-black/50">
                      Builder Spotlight
                    </h2>
                  </div>
                  <Link href={`/builders/${builders[0].slug}`} className="group flex items-center gap-5 p-4 -mx-4 hover:bg-[#f6f4f1] transition-all duration-300">
                    <div className="w-16 h-16 bg-[#f6f4f1] flex items-center justify-center flex-shrink-0 overflow-hidden transition-transform group-hover:scale-105">
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
              */}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid - Modern 2026 */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-gradient-to-b from-[#f8f8f8] to-[#f4f4f4] py-20 lg:py-28 px-6 lg:px-12 overflow-hidden">
          {/* Subtle decorative gradient orb */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-black/[0.02] via-transparent to-transparent blur-3xl" />

          <div className="relative flex items-center justify-between mb-14">
            <div>
              <span className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.25em] uppercase text-black/40 block mb-2">
                Discover
              </span>
              <h2 className="font-gilda-display text-[34px] lg:text-[44px] text-black leading-[1.1]">
                Browse by Category
              </h2>
            </div>
            <Link
              href="/tools"
              className="hidden sm:inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[11px] tracking-[0.2em] uppercase text-black/40 hover:text-black transition-all duration-300 group/link"
            >
              View All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover/link:translate-x-1">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {categories.length > 0 ? (
              categories.slice(0, 8).map((category: any, index: number) => {
                const data = categoryData[category.slug] || {
                  description: 'Explore AI tools',
                  icon: Sparkles,
                  color: '#6366f1',
                }
                const IconComponent = data.icon
                return (
                  <Link
                    key={category.id}
                    href={`/tools?category=${category.slug}`}
                    className={`group relative bg-white p-6 lg:p-7 border border-black/[0.04] hover:border-black/20 transition-all duration-500 animate-scale-in stagger-${index + 1} overflow-hidden`}
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Colored accent line at top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{ backgroundColor: data.color }}
                    />
                    <div
                      className="relative w-11 h-11 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                      style={{ backgroundColor: `${data.color}12` }}
                    >
                      <IconComponent
                        size={22}
                        strokeWidth={1.5}
                        style={{ color: data.color }}
                      />
                    </div>
                    <h3 className="relative font-gilda-display text-[17px] lg:text-[19px] text-black group-hover:text-black/80 transition-colors mb-1.5">
                      {category.title}
                    </h3>
                    <p className="relative font-ibm-plex-sans text-[12px] text-black/45 hidden sm:block leading-relaxed">
                      {data.description}
                    </p>
                  </Link>
                )
              })
            ) : (
              // Empty state - show placeholder cards
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white p-6 lg:p-7 border border-black/[0.04]">
                  <div className="w-11 h-11 bg-black/5 animate-pulse mb-5" />
                  <div className="h-5 bg-black/5 animate-pulse w-24 mb-2" />
                  <div className="h-4 bg-black/5 animate-pulse w-32 hidden sm:block" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CTA Section - Modern 2026 */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-[#0a0a0a] overflow-hidden">
          {/* Modern gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
            {/* Subtle colored gradient orbs */}
            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/[0.04] via-transparent to-transparent blur-3xl transform -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-purple-500/[0.03] via-transparent to-transparent blur-3xl" />
            {/* Fine dot pattern */}
            <div className="absolute inset-0 opacity-[0.1]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          <div className="relative z-10 px-6 lg:px-12 py-24 lg:py-32">
            <div className="max-w-[680px] mx-auto text-center">
              <span className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-6">
                Get Started
              </span>
              <h2 className="font-gilda-display text-[34px] sm:text-[44px] lg:text-[58px] leading-[1.05] text-white mb-6">
                Ready to Create
                <br />
                <span className="bg-gradient-to-r from-white/70 via-white/50 to-white/30 bg-clip-text text-transparent">with AI?</span>
              </h2>
              <p className="font-ibm-plex-sans text-[15px] lg:text-[17px] text-white/45 mb-12 max-w-[460px] mx-auto leading-relaxed">
                Join creators discovering the best AI tools. Start exploring
                and unlock your creative potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools"
                  className="group bg-white text-black px-8 py-4 font-ibm-plex-sans-condensed text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] inline-flex items-center justify-center gap-3"
                >
                  Browse All Tools
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/learn"
                  className="group border border-white/15 backdrop-blur-sm text-white px-8 py-4 font-ibm-plex-sans-condensed text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/30 inline-flex items-center justify-center"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Modern 2026 */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white py-20 lg:py-24 px-6 lg:px-12 border-t border-black/[0.06] overflow-hidden">
          <div className="relative max-w-[480px] mx-auto text-center">
            <span className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.3em] uppercase text-black/50 block mb-4">
              Newsletter
            </span>
            <h2 className="font-gilda-display text-[30px] lg:text-[36px] text-black mb-4 leading-[1.15]">
              Stay Updated
            </h2>
            <p className="font-ibm-plex-sans text-[14px] text-black/45 mb-10 leading-relaxed">
              Get the latest AI tools and news delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-[#fafafa] border border-black/[0.06] font-ibm-plex-sans text-[14px] placeholder:text-black/45 focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 font-ibm-plex-sans-condensed text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-black/85"
              >
                Subscribe
              </button>
            </form>
            <p className="font-ibm-plex-sans text-[11px] text-black/45 mt-5">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
