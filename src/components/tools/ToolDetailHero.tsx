import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Star, Users, Calendar, Building2 } from 'lucide-react'
import type { Tool, ToolCategory } from '@/payload-types'

interface ToolDetailHeroProps {
  tool: Tool
  category?: ToolCategory
}

// Category colors for visual consistency - matches tools page
const categoryColors: Record<string, string> = {
  Writing: '#1a73e8',
  Image: '#8b5cf6',
  Video: '#9c27b0',
  Audio: '#ff5722',
  Automation: '#10b981',
  Chatbots: '#6366f1',
  Marketing: '#f59e0b',
  Data: '#06b6d4',
  Building: '#fbbc04',
  '3D': '#673ab7',
  'Image Generation': '#8b5cf6',
  'Text / Copywriting': '#1a73e8',
  'Music / Audio': '#ff5722',
  'Video / Film': '#9c27b0',
}

const pricingLabels: Record<string, { label: string; color: string }> = {
  free: { label: 'Free', color: '#34a853' },
  freemium: { label: 'Freemium', color: '#1a73e8' },
  paid: { label: 'Paid', color: '#9c27b0' },
  custom: { label: 'Enterprise', color: '#ff5722' },
}

const difficultyLabels: Record<string, { label: string; color: string }> = {
  beginner: { label: 'Beginner Friendly', color: '#34a853' },
  intermediate: { label: 'Intermediate', color: '#fbbc04' },
  advanced: { label: 'Advanced', color: '#e7131a' },
}

export function ToolDetailHero({ tool, category }: ToolDetailHeroProps) {
  const categoryColor = categoryColors[category?.title || ''] || '#6366f1'
  // Use logo from Payload CMS only
  const logoUrl = tool.logo && typeof tool.logo === 'object' && tool.logo.url
    ? tool.logo.url
    : null

  return (
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

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-20"
            style={{ backgroundColor: categoryColor }}
          />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse opacity-10"
            style={{ backgroundColor: categoryColor, animationDelay: '1s' }}
          />
        </div>

        <div className="relative z-10 py-12 lg:py-16 px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 mb-8 font-ibm-plex-sans text-[13px]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-white transition-colors">AI Tools</Link>
            {category && (
              <>
                <span>/</span>
                <Link
                  href={`/tools?category=${category.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {category.title}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-white">{tool.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-6 mb-6">
                {/* Logo */}
                <div className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 overflow-hidden">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`${tool.title} logo`}
                      width={80}
                      height={80}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: categoryColor }}
                    >
                      <span className="text-3xl lg:text-4xl font-gilda-display text-white">
                        {tool.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {/* Category Badge */}
                  {category && (
                    <span
                      className="inline-block px-3 py-1 text-white text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase mb-3"
                      style={{ backgroundColor: categoryColor }}
                    >
                      {category.title}
                    </span>
                  )}

                  {/* Title */}
                  <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] text-white font-gilda-display">
                    {tool.title}
                  </h1>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-ibm-plex-sans text-[17px] lg:text-[19px] text-white/80 mb-6 leading-relaxed max-w-[640px]">
                {tool.tagline || tool.excerpt}
              </p>

              {/* Quick Stats Row */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                {tool.stats?.rating != null && !isNaN(tool.stats.rating) && (
                  <div className="flex items-center gap-2 text-white">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-ibm-plex-sans text-[15px]">
                      {Number(tool.stats.rating).toFixed(1)}/5
                    </span>
                    {tool.stats.reviewCount != null && !isNaN(tool.stats.reviewCount) && (
                      <span className="text-white/50">
                        ({Number(tool.stats.reviewCount).toLocaleString()} reviews)
                      </span>
                    )}
                  </div>
                )}
                {tool.stats?.users && (
                  <div className="flex items-center gap-2 text-white/70">
                    <Users className="w-4 h-4" />
                    <span className="font-ibm-plex-sans text-[14px]">
                      {tool.stats.users} users
                    </span>
                  </div>
                )}
                {tool.stats?.launchYear && (
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar className="w-4 h-4" />
                    <span className="font-ibm-plex-sans text-[14px]">
                      Since {tool.stats.launchYear}
                    </span>
                  </div>
                )}
                {tool.stats?.company && (
                  <div className="flex items-center gap-2 text-white/70">
                    <Building2 className="w-4 h-4" />
                    <span className="font-ibm-plex-sans text-[14px]">
                      {tool.stats.company}
                    </span>
                  </div>
                )}
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {tool.pricingModel && pricingLabels[tool.pricingModel] && (
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white"
                    style={{ backgroundColor: pricingLabels[tool.pricingModel].color }}
                  >
                    {pricingLabels[tool.pricingModel].label}
                  </span>
                )}
                {tool.difficulty && difficultyLabels[tool.difficulty] && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white">
                    {difficultyLabels[tool.difficulty].label}
                  </span>
                )}
                {tool.platforms && tool.platforms.length > 0 && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white">
                    {tool.platforms.length} Platforms
                  </span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {tool.website && (
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-3 bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14] group"
                  >
                    Try {tool.title} Free
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-3 bg-white/10 border border-white/30 text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-white/20"
                >
                  View Pricing
                </a>
              </div>
            </div>

            {/* Right Column - Verdict Summary Card */}
            <div className="lg:col-span-1">
              {(tool.verdictSummary || tool.ratings?.overall) && (
                <div className="bg-white/10 backdrop-blur border border-white/20 p-6">
                  <h2 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-white/60 mb-4">
                    ToolSchool Verdict
                  </h2>

                  {tool.ratings?.overall != null && !isNaN(tool.ratings.overall) && (
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-gilda-display text-[24px]"
                        style={{ backgroundColor: categoryColor }}
                      >
                        {Number(tool.ratings.overall).toFixed(1)}
                      </div>
                      <div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.round(tool.ratings!.overall!)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-white/30'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="font-ibm-plex-sans text-[13px] text-white/60 mt-1">
                          Overall Score
                        </p>
                      </div>
                    </div>
                  )}

                  {tool.verdictSummary && (
                    <p className="font-ibm-plex-sans text-[14px] text-white/80 leading-relaxed">
                      {tool.verdictSummary}
                    </p>
                  )}

                  {/* Rating Breakdown */}
                  {tool.ratings && (
                    <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                      {tool.ratings.easeOfUse && (
                        <RatingBar label="Ease of Use" value={tool.ratings.easeOfUse} color={categoryColor} />
                      )}
                      {tool.ratings.features && (
                        <RatingBar label="Features" value={tool.ratings.features} color={categoryColor} />
                      )}
                      {tool.ratings.valueForMoney && (
                        <RatingBar label="Value" value={tool.ratings.valueForMoney} color={categoryColor} />
                      )}
                      {tool.ratings.support && (
                        <RatingBar label="Support" value={tool.ratings.support} color={categoryColor} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RatingBar({ label, value, color }: { label: string; value: number; color: string }) {
  const safeValue = Number(value) || 0
  return (
    <div className="flex items-center gap-3">
      <span className="font-ibm-plex-sans text-[12px] text-white/60 w-20">{label}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(safeValue / 5) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-ibm-plex-sans text-[12px] text-white/80 w-8">{safeValue.toFixed(1)}</span>
    </div>
  )
}
