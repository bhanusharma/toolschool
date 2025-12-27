import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  Sparkles,
  PenLine,
  Music,
  Video,
  Palette,
  Hammer,
  Layers,
  Box,
  type LucideIcon,
} from 'lucide-react'

// Force dynamic rendering to avoid prerender errors
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
      limit: 6,
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

const categoryData: { [key: string]: { description: string; icon: LucideIcon; color: string } } = {
  '3d': { description: '3D modeling and rendering', icon: Box, color: '#673ab7' },
  design: { description: 'Design tools powered by AI', icon: Palette, color: '#9c27b0' },
  audio: { description: 'Compose and produce AI music', icon: Music, color: '#34a853' },
  video: { description: 'Edit and generate video content', icon: Video, color: '#fbbc04' },
  building: { description: 'Build apps and websites with AI', icon: Hammer, color: '#ff5722' },
  curating: { description: 'Organize and manage content', icon: Layers, color: '#00bcd4' },
  writing: { description: 'Generate and enhance written content', icon: PenLine, color: '#1a73e8' },
  creating: { description: 'Create stunning visuals with AI', icon: Sparkles, color: '#e91e63' },
}

const defaultCategories = [
  { slug: 'creating', title: 'Creating' },
  { slug: 'writing', title: 'Writing' },
  { slug: 'video', title: 'Video' },
  { slug: 'audio', title: 'Audio' },
  { slug: 'design', title: 'Design' },
  { slug: 'building', title: 'Building' },
  { slug: '3d', title: '3D' },
  { slug: 'curating', title: 'Curating' },
]

export default async function HomePageV2() {
  const { tools, categories, builders } = await getHomePageData()
  const displayCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8E0F8] via-[#F0E8F4] to-[#E0F0F8]">
            {/* Cyan blob left */}
            <div
              className="absolute -left-32 top-1/4 w-[500px] h-[500px]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,212,200,0.6) 0%, rgba(127,255,224,0.3) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            {/* Cyan blob right */}
            <div
              className="absolute -right-20 top-0 w-[400px] h-[400px]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,229,212,0.5) 0%, rgba(127,255,240,0.2) 50%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            {/* Halftone pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(0,180,170,0.4) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
          </div>

          <div className="relative z-10 px-8 lg:px-16 py-20 lg:py-28 text-center">
            <h1 className="text-[52px] sm:text-[72px] lg:text-[88px] font-black tracking-tight leading-[0.95] text-black mb-6">
              THE ULTIMATE
              <br />
              AI CREATOR HUB
            </h1>
            <p className="text-[17px] lg:text-[19px] text-black/60 mb-10 max-w-[520px] mx-auto leading-relaxed">
              Discover curated AI tools, showcase your creations, and connect with innovators building the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center bg-black text-white px-7 py-3.5 text-[14px] font-semibold rounded-full transition-all hover:bg-black/80"
              >
                Explore tools
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center bg-white text-black px-7 py-3.5 text-[14px] font-semibold rounded-full border border-black/10 transition-all hover:bg-black/5"
              >
                Start learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote + Stats Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Quote */}
          <div>
            <h2 className="text-[26px] lg:text-[32px] font-bold text-black mb-5 leading-tight">
              Why ToolSchool?
            </h2>
            <p className="text-[17px] text-black/60 leading-relaxed mb-6">
              &ldquo;We connect creators with the best AI tools to build, design, and innovate. Quality over quantity—helping you find exactly what you need to bring your ideas to life.&rdquo;
            </p>
            <p className="text-[14px] text-black/40 cursor-pointer hover:text-black/60 transition-colors">
              Watch video →
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <p className="text-[44px] lg:text-[52px] font-black text-black leading-none mb-1">50+</p>
              <p className="text-[13px] text-black/50 font-medium">AI Tools</p>
            </div>
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <p className="text-[44px] lg:text-[52px] font-black text-black leading-none mb-1">8</p>
              <p className="text-[13px] text-black/50 font-medium">Categories</p>
            </div>
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <p className="text-[44px] lg:text-[52px] font-black text-black leading-none mb-1">100+</p>
              <p className="text-[13px] text-black/50 font-medium">Tutorials</p>
            </div>
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <p className="text-[44px] lg:text-[52px] font-black text-black leading-none mb-1">Daily</p>
              <p className="text-[13px] text-black/50 font-medium">Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 border-t border-black/5">
        <p className="text-center text-[13px] text-black/40 mb-6">
          Featuring tools from leading AI companies
        </p>
        <div className="flex items-center justify-center gap-10 lg:gap-14 flex-wrap opacity-50 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-500">
          {tools.slice(0, 6).map((tool: any) => (
            <div key={tool.id} className="flex items-center gap-2">
              {tool.logo?.url ? (
                <Image src={tool.logo.url} alt={tool.title} width={24} height={24} className="object-contain" />
              ) : (
                <div className="w-6 h-6 bg-black/10 rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-black/40">{tool.title?.charAt(0)}</span>
                </div>
              )}
              <span className="text-[13px] font-medium text-black/70">{tool.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Big Number Section - Cyan */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <div className="bg-[#00E5D4] rounded-3xl px-8 lg:px-16 py-20 lg:py-28 text-center relative overflow-hidden">
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative z-10">
            <p className="text-[100px] sm:text-[140px] lg:text-[180px] font-black text-black leading-none tracking-tight mb-4">
              50,000+
            </p>
            <p className="text-[16px] lg:text-[18px] text-black/60 mb-8">
              Creators using AI tools to build amazing things
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center bg-black text-white px-7 py-3.5 text-[14px] font-semibold rounded-full transition-all hover:bg-black/80"
            >
              Find your tools
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <h2 className="text-[28px] lg:text-[36px] font-bold text-black text-center mb-4 leading-tight">
          A creator-first platform
          <br />
          built for AI innovation
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {[
            { title: 'Curated, quality tools', desc: 'Every tool is hand-selected and reviewed to ensure it meets our quality standards for creative professionals.' },
            { title: 'Community-driven', desc: 'Join a thriving community of creators sharing their work, tips, and discoveries with AI tools.' },
            { title: 'Learn by doing', desc: 'Step-by-step tutorials and real-world examples help you master AI tools quickly and effectively.' },
          ].map((feature, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-[#E8F8F6] rounded-2xl flex items-center justify-center">
                <div className="w-6 h-6 bg-[#00D4C8] rounded-lg" />
              </div>
              <h3 className="text-[17px] font-bold text-black mb-2">{feature.title}</h3>
              <p className="text-[14px] text-black/50 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creators Section - Cyan Background */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <div className="bg-[#00E5D4] rounded-3xl px-8 lg:px-12 py-16 lg:py-20">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-black text-center mb-12">
            Meet the creators using ToolSchool
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {builders.slice(0, 3).map((builder: any) => (
              <Link key={builder.id} href={`/builders/${builder.slug}`} className="group">
                {/* Card with gradient image */}
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div
                    className="aspect-[4/3] relative"
                    style={{ background: 'linear-gradient(135deg, #00D4C8 0%, #B8FF00 100%)' }}
                  >
                    {typeof builder.profileImage === 'object' && builder.profileImage?.url ? (
                      <Image
                        src={builder.profileImage.url}
                        alt={builder.title}
                        fill
                        className="object-cover mix-blend-luminosity opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="text-[22px] lg:text-[26px] font-black text-black leading-none">
                        {builder.title?.split(' ').map((word: string, i: number) => (
                          <span key={i} className="block">{word.toUpperCase()}</span>
                        ))}
                      </p>
                    </div>
                    {/* Play button */}
                    <div className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent ml-0.5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[15px] font-semibold text-black mb-0.5 line-clamp-1">
                      {builder.bio?.slice(0, 45) || 'AI Creator'}...
                    </p>
                    <p className="text-[13px] text-black/40">{builder.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[15px] text-black/60 mb-6 max-w-[500px] mx-auto">
              Join thousands of creators discovering AI tools, sharing their work, and building the future together.
            </p>
            <Link
              href="/builders"
              className="inline-flex items-center justify-center bg-black text-white px-7 py-3.5 text-[14px] font-semibold rounded-full transition-all hover:bg-black/80"
            >
              Become a creator
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-black">Browse by category</h2>
          <Link href="/tools" className="text-[13px] font-medium text-black/40 hover:text-black transition-colors">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayCategories.slice(0, 8).map((category: any) => {
            const data = categoryData[category.slug] || { description: 'Explore AI tools', icon: Sparkles, color: '#00D4C8' }
            const IconComponent = data.icon
            return (
              <Link
                key={category.id || category.slug}
                href={`/tools?category=${category.slug}`}
                className="group bg-[#F7F7F7] rounded-2xl p-5 hover:bg-black transition-colors duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ backgroundColor: `${data.color}15` }}
                >
                  <IconComponent className="w-5 h-5 group-hover:text-white transition-colors" style={{ color: data.color }} />
                </div>
                <h3 className="text-[15px] font-bold text-black group-hover:text-white transition-colors mb-1">
                  {category.title}
                </h3>
                <p className="text-[12px] text-black/40 group-hover:text-white/60 transition-colors">
                  {data.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-8">
        <div className="bg-black rounded-3xl px-8 lg:px-16 py-20 lg:py-24 text-center overflow-hidden relative">
          <p
            className="text-[56px] sm:text-[80px] lg:text-[120px] font-black italic leading-none mb-6"
            style={{ color: '#B8FF00' }}
          >
            ToolSchool
          </p>
          <p className="text-[16px] text-white/50 mb-8 max-w-[400px] mx-auto">
            The ultimate destination for AI creators. Discover tools, learn techniques, and build amazing things.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center text-black px-8 py-4 text-[14px] font-bold rounded-full transition-all hover:opacity-90"
            style={{ backgroundColor: '#B8FF00' }}
          >
            Start exploring
          </Link>
        </div>
      </section>
    </div>
  )
}
