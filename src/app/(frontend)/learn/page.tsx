import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { BookOpen, Clock, Wrench, CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react'
import { EmptyState } from '@/components/cards'

// Force dynamic rendering - D1 database not available during static build in CI
export const dynamic = 'force-dynamic'

interface Tutorial {
  id: number | string
  title: string
  subtitle?: string
  slug: string
  excerpt?: string
  featuredImage?: {
    url?: string
    alt?: string
  } | number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: number
  category?: string
  featured?: boolean
  status?: string
  toolStack?: Array<{
    role: string
    primaryTool: string
    alternativeTool?: string
  }>
}

const difficultyConfig = {
  beginner: { bg: 'bg-green-500/10', text: 'text-green-600', label: 'Beginner', color: '#34a853' },
  intermediate: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', label: 'Intermediate', color: '#fbbc04' },
  advanced: { bg: 'bg-purple-500/10', text: 'text-purple-600', label: 'Advanced', color: '#8b5cf6' },
}

async function getTutorials(): Promise<Tutorial[]> {
  try {
    const payload = await getPayload({ config })
    const tutorials = await payload.find({
      collection: 'tutorials',
      where: {
        status: { equals: 'published' }
      },
      depth: 1,
      sort: '-createdAt',
    })
    return tutorials.docs as Tutorial[]
  } catch (error) {
    console.error('Failed to fetch tutorials:', error)
    return []
  }
}

function getImageUrl(tutorial: Tutorial): string | null {
  if (typeof tutorial.featuredImage !== 'object' || !tutorial.featuredImage?.url) {
    return null
  }
  return tutorial.featuredImage.url
}

// Check if URL is internal (needs unoptimized flag on Cloudflare Workers)
function isInternalUrl(url: string): boolean {
  return url.startsWith('/api/') || url.startsWith('/media/')
}

export default async function LearnPage() {
  const tutorials = await getTutorials()
  const featuredTutorial = tutorials.find(t => t.featured)
  const otherTutorials = tutorials.filter(t => !t.featured)

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section - 2026 Design */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0">
          {/* Modern gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]" />
          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-emerald-500/[0.04] via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-teal-500/[0.03] via-transparent to-transparent blur-3xl" />
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.12]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] mb-6 animate-hero">
              <GraduationCap className="w-4 h-4 text-white/50" />
              <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.15em] uppercase text-white/60">
                ToolSchool Learn
              </span>
            </div>

            <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[0.95] font-gilda-display text-white mb-6 animate-hero-delay-1">
              Build Real
              <br />
              <span className="bg-gradient-to-r from-white/70 via-white/50 to-white/30 bg-clip-text text-transparent">AI Systems</span>
            </h1>

            <p className="font-ibm-plex-sans text-[16px] md:text-[18px] leading-relaxed text-white/55 max-w-xl mx-auto mb-10 animate-hero-delay-2">
              Hands-on tutorials that teach you how to connect AI tools into working workflows.
              No theory—just practical skills you can use today.
            </p>

            {/* Quick features - 2026 style */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] font-ibm-plex-sans text-white/50 animate-hero-delay-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06]">
                <Clock className="w-4 h-4 text-white/40" />
                <span>45 min average</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06]">
                <Wrench className="w-4 h-4 text-white/40" />
                <span>Cross-tool workflows</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06]">
                <CheckCircle2 className="w-4 h-4 text-white/40" />
                <span>Working output guaranteed</span>
              </div>
            </div>

            {/* Quick stats - 2026 style with dividers */}
            <div className="flex items-stretch justify-center gap-0 mt-10 pt-10 border-t border-white/[0.12] animate-hero-delay-3">
              <div className="pr-10">
                <div className="text-[36px] font-gilda-display text-white">{tutorials.length}</div>
                <div className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-white/40 mt-1">Tutorials</div>
              </div>
              <div className="w-px bg-white/[0.12]" />
              <div className="pl-10">
                <div className="text-[36px] font-gilda-display text-white">3</div>
                <div className="text-[10px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-white/40 mt-1">Difficulty Levels</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutorial */}
      {featuredTutorial && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white border-b border-[#e5e5e5]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black border border-black mb-8 animate-slide-up stagger-1">
            <BookOpen className="w-4 h-4 text-white" />
            <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white">
              Start Here
            </span>
          </div>

          <Link href={`/learn/${featuredTutorial.slug}`} className="block animate-slide-up stagger-2">
            <div className="grid lg:grid-cols-2 gap-8 group">
              {/* Image */}
              <div className="relative h-[300px] lg:h-[400px] overflow-hidden bg-[#f6f4f1]">
                {getImageUrl(featuredTutorial) ? (
                  <Image
                    src={getImageUrl(featuredTutorial)!}
                    alt={featuredTutorial.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={isInternalUrl(getImageUrl(featuredTutorial)!)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="text-center text-white/60">
                      <Wrench className="w-16 h-16 mx-auto mb-4 opacity-60" />
                      <span className="font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase">Tutorial</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap gap-3 mb-4">
                  {featuredTutorial.difficulty && (
                    <span className={`px-3 py-1 text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase ${difficultyConfig[featuredTutorial.difficulty].bg} ${difficultyConfig[featuredTutorial.difficulty].text}`}>
                      {difficultyConfig[featuredTutorial.difficulty].label}
                    </span>
                  )}
                  {featuredTutorial.estimatedTime && (
                    <span className="flex items-center gap-1 px-3 py-1 text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase bg-[#f6f4f1] text-black/60">
                      <Clock className="w-3 h-3" />
                      {featuredTutorial.estimatedTime} MIN
                    </span>
                  )}
                </div>

                <h2 className="text-[28px] lg:text-[36px] font-gilda-display text-black mb-4 group-hover:text-black/70 transition-colors">
                  {featuredTutorial.title}
                </h2>

                {featuredTutorial.subtitle && (
                  <p className="text-[16px] lg:text-[18px] font-ibm-plex-sans text-black/70 mb-6">
                    {featuredTutorial.subtitle}
                  </p>
                )}

                {/* Tool Stack */}
                {featuredTutorial.toolStack && featuredTutorial.toolStack.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-6 p-4 bg-[#f6f4f1] border border-[#e5e5e5]">
                    <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/50 w-full mb-2">
                      Tools Used
                    </span>
                    {featuredTutorial.toolStack.map((tool, index) => (
                      <div key={index} className="text-[13px] font-ibm-plex-sans">
                        <span className="text-black/50">{tool.role}:</span>{' '}
                        <span className="text-black font-medium">{tool.primaryTool}</span>
                        {tool.alternativeTool && (
                          <span className="text-black/50"> or {tool.alternativeTool}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="inline-flex items-center gap-2 text-black font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase group-hover:gap-3 transition-all">
                  Start Tutorial
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Tutorial Grid */}
      {otherTutorials.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[28px] font-gilda-display text-black">All Tutorials</h2>
              <p className="text-[14px] font-ibm-plex-sans text-black/50 mt-1">
                {otherTutorials.length} tutorials available
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTutorials.map((tutorial, index) => (
              <Link key={tutorial.id} href={`/learn/${tutorial.slug}`} className={`animate-slide-up stagger-${Math.min(index + 1, 12)}`}>
                <div className="group bg-white border border-[#e5e5e5] overflow-hidden hover:border-black hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-[#f6f4f1]">
                    {getImageUrl(tutorial) ? (
                      <Image
                        src={getImageUrl(tutorial)!}
                        alt={tutorial.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={isInternalUrl(getImageUrl(tutorial)!)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#333]">
                        <Wrench className="w-12 h-12 text-white/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-300" />

                    {/* Difficulty badge overlay */}
                    {tutorial.difficulty && (
                      <div
                        className="absolute top-3 left-3 w-2 h-8"
                        style={{ backgroundColor: difficultyConfig[tutorial.difficulty].color }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tutorial.difficulty && (
                        <span className={`px-2 py-0.5 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase ${difficultyConfig[tutorial.difficulty].bg} ${difficultyConfig[tutorial.difficulty].text}`}>
                          {difficultyConfig[tutorial.difficulty].label}
                        </span>
                      )}
                      {tutorial.estimatedTime && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase bg-[#f6f4f1] text-black/60">
                          <Clock className="w-3 h-3" />
                          {tutorial.estimatedTime} MIN
                        </span>
                      )}
                    </div>

                    <h3 className="text-[18px] font-gilda-display text-black mb-2 group-hover:text-black/70 transition-colors line-clamp-2">
                      {tutorial.title}
                    </h3>

                    {tutorial.excerpt && (
                      <p className="text-[13px] font-ibm-plex-sans text-black/60 line-clamp-2 mb-4">
                        {tutorial.excerpt}
                      </p>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
                      <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black group-hover:text-black/70 transition-colors">
                        Start Learning
                      </span>
                      <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {tutorials.length === 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
          <EmptyState
            type="tutorials"
            title="Tutorials Coming Soon"
            description="We're building hands-on tutorials to help you master AI workflows. Check back soon!"
            actionLabel="Explore Tools"
            actionHref="/tools"
          />
        </section>
      )}

      {/* CTA Section - 2026 Design */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mb-12">
        <div className="relative bg-[#0a0a0a] py-20 px-8 md:px-16 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-emerald-500/[0.05] via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-teal-500/[0.04] via-transparent to-transparent blur-3xl" />
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-white/20" />
              <span className="text-[11px] font-ibm-plex-sans-condensed tracking-[0.2em] uppercase text-white/40">
                Contribute
              </span>
              <div className="w-8 h-[2px] bg-white/20" />
            </div>
            <h2 className="text-[32px] md:text-[44px] font-gilda-display text-white mb-4 leading-tight">
              Want to
              <br />
              <span className="text-white/50">Contribute?</span>
            </h2>
            <p className="font-ibm-plex-sans text-[16px] text-white/50 mb-8 max-w-md mx-auto">
              Share your AI workflow knowledge. Write tutorials and help others learn.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase hover:bg-white/90 transition-all"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
