import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

async function getHomePageData() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [tools, categories] = await Promise.all([
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
  ])

  return { tools: tools.docs, categories: categories.docs }
}

// Category data with descriptions
const categoryData: { [key: string]: { description: string; emoji: string } } = {
  'image-generation': {
    description: 'Create stunning visuals with AI',
    emoji: '🎨',
  },
  'text-copywriting': {
    description: 'Generate and enhance written content',
    emoji: '✍️',
  },
  'music-audio': {
    description: 'Compose and produce AI music',
    emoji: '🎵',
  },
  'video-film': {
    description: 'Edit and generate video content',
    emoji: '🎬',
  },
  'graphic-design': {
    description: 'Design tools powered by AI',
    emoji: '🖌️',
  },
  'website-app': {
    description: 'Build websites with AI assistance',
    emoji: '🌐',
  },
  coding: {
    description: 'Code generation and assistance',
    emoji: '💻',
  },
  '3d': {
    description: '3D modeling and rendering',
    emoji: '🎲',
  },
  animation: {
    description: 'Animate with AI tools',
    emoji: '🎞️',
  },
}

export default async function HomePage() {
  const { tools, categories } = await getHomePageData()

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
              }}
            />
          </div>

          {/* Animated background circles */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#e7131a]/10 to-transparent animate-pulse" />
            <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#1a73e8]/10 to-transparent animate-pulse animation-delay-2000" />
            <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[#34a853]/10 to-transparent animate-pulse animation-delay-4000" />
          </div>

          <div className="relative z-10 py-[120px] md:py-[160px] px-6 lg:px-12">
            <div className="max-w-[980px] mx-auto text-center">
              <span className="inline-block px-4 py-1 bg-[#e7131a] text-white text-xs font-ibm-plex-sans-condensed tracking-wider uppercase rounded-full mb-6">
                50+ AI Tools Curated
              </span>

              <h1 className="text-[48px] sm:text-[64px] lg:text-[80px] leading-[1] font-gilda-display font-normal text-white mb-6">
                Discover the Best
                <br />
                AI Creation Tools
              </h1>

              <p className="font-ibm-plex-sans text-[18px] sm:text-[20px] leading-[30px] text-white/80 max-w-[680px] mx-auto mb-10">
                The premier discovery platform for AI creators. Find groundbreaking tools, showcase
                your creations, and connect with fellow innovators.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools"
                  className="bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14] inline-flex items-center justify-center gap-2"
                >
                  EXPLORE TOOLS
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
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
                  href="/makers"
                  className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-white/20 inline-flex items-center justify-center"
                >
                  MEET THE MAKERS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-[#f6f4f1]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-black/10">
            <div className="px-6 py-8 text-center">
              <div className="text-[32px] text-black mb-1 font-gilda-display">50+</div>
              <div className="font-ibm-plex-sans text-[14px] text-black/60 uppercase tracking-wider">
                AI Tools
              </div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-[32px] text-black mb-1 font-gilda-display">8</div>
              <div className="font-ibm-plex-sans text-[14px] text-black/60 uppercase tracking-wider">
                Categories
              </div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-[32px] text-black mb-1 font-gilda-display">Free</div>
              <div className="font-ibm-plex-sans text-[14px] text-black/60 uppercase tracking-wider">
                To Explore
              </div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-[32px] text-black mb-1 font-gilda-display">Daily</div>
              <div className="font-ibm-plex-sans text-[14px] text-black/60 uppercase tracking-wider">
                Updates
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white py-20 px-6 lg:px-12">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-[36px] font-gilda-display font-normal text-black">
              Browse by Category
            </h2>
            <Link
              href="/tools"
              className="hidden sm:inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[14px] tracking-[1.4px] uppercase text-black/60 hover:text-black transition-colors"
            >
              VIEW ALL
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

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {categories.slice(0, 9).map((category: any) => {
              const data = categoryData[category.slug] || {
                description: category.description || 'Explore AI tools',
                emoji: '🤖',
              }
              return (
                <Link
                  key={category.id}
                  href={`/tools?category=${category.slug}`}
                  className="group flex items-center gap-6 p-8 border border-[#e5e5e5] bg-white hover:border-black hover:bg-[#f6f4f1] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#f6f4f1] rounded-full flex items-center justify-center text-2xl group-hover:bg-white">
                    {data.emoji}
                  </div>
                  <div>
                    <h3 className="font-gilda-display text-[24px] leading-[32px] text-black">
                      {category.title}
                    </h3>
                    <p className="font-ibm-plex-sans text-[14px] leading-[22px] text-black/60 mt-1">
                      {data.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Featured Tools Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-[#f6f4f1] py-20 px-6 lg:px-12">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-[36px] font-gilda-display font-normal text-black">
                Featured Tools
              </h2>
              <p className="font-ibm-plex-sans text-[16px] text-black/60 mt-2">
                Hand-picked AI tools loved by creators
              </p>
            </div>
            <Link
              href="/tools"
              className="hidden sm:inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[14px] tracking-[1.4px] uppercase text-black/60 hover:text-black transition-colors"
            >
              VIEW ALL TOOLS
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

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool: any) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group flex flex-col bg-white border border-[#e5e5e5] transition-all duration-300 hover:border-black cursor-pointer"
              >
                {/* Tool Logo/Icon */}
                <div className="aspect-square bg-[#f8f8f8] p-12 flex items-center justify-center">
                  <div className="w-24 h-24 bg-black/10 rounded-lg flex items-center justify-center">
                    <span className="text-4xl font-gilda-display text-black/30">
                      {tool.title.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Tool Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-gilda-display text-[24px] leading-[32px] text-black mb-2">
                    {tool.title}
                  </h3>

                  <p className="font-ibm-plex-sans text-[14px] leading-[22px] text-black/60 mb-4 flex-1 line-clamp-2">
                    {tool.tagline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.toolCategory && (
                      <span className="inline-block bg-[#f6f4f1] px-3 py-1 font-ibm-plex-sans-condensed text-[12px] tracking-[1px] uppercase text-black/60">
                        {tool.toolCategory.title}
                      </span>
                    )}
                    {tool.featured && (
                      <span className="inline-block bg-[#e7131a] px-3 py-1 font-ibm-plex-sans-condensed text-[12px] tracking-[1px] uppercase text-white">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-ibm-plex-sans-condensed text-[14px] tracking-[1.4px] uppercase text-black group-hover:underline">
                      LEARN MORE
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-black"
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
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="text-center mt-12 sm:hidden">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-black/80"
            >
              VIEW ALL TOOLS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
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
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-black py-20 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-[36px] sm:text-[48px] font-gilda-display font-normal text-white mb-6">
              Ready to Create with AI?
            </h2>
            <p className="font-ibm-plex-sans text-[18px] text-white/70 mb-10 max-w-[600px] mx-auto">
              Join thousands of creators discovering the best AI tools. Start exploring now and
              unlock your creative potential.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14]"
            >
              BROWSE ALL TOOLS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
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
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-[#f6f4f1] py-20 px-6 lg:px-12">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[36px] font-gilda-display font-normal text-black mb-4">
              Stay Updated
            </h2>
            <p className="font-ibm-plex-sans text-[16px] text-black/60 mb-8">
              Get the latest AI tools and news delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white border border-[#e5e5e5] font-ibm-plex-sans text-[16px] placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14]"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
