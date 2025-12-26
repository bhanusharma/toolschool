import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import type { Tool, ToolCategory } from '@/payload-types'

interface ToolAlternativesProps {
  alternatives: Tool[]
  comparisonNotes?: string | null
  currentTool: string
}

export function ToolAlternatives({ alternatives, comparisonNotes, currentTool }: ToolAlternativesProps) {
  return (
    <section id="alternatives" className="w-full flex justify-center bg-[#f6f4f1]">
      <div className="w-full max-w-[1440px] px-6 lg:px-12 py-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-[32px] font-gilda-display text-black mb-2">
              {currentTool} Alternatives
            </h2>
            <p className="font-ibm-plex-sans text-[15px] text-gray-500">
              Similar tools you might want to consider
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden md:inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase text-[#e7131a] hover:underline"
          >
            View all tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Comparison Notes */}
        {comparisonNotes && (
          <div className="bg-white border border-[#e5e5e5] p-6 mb-8">
            <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-gray-500 mb-3">
              How to Choose
            </h3>
            <p className="font-ibm-plex-sans text-[15px] text-gray-700 leading-relaxed">
              {comparisonNotes}
            </p>
          </div>
        )}

        {/* Alternatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alternatives.map((alt) => {
            const category = alt.toolCategory as ToolCategory | undefined
            // Use logo from Payload CMS only
            const logoUrl = alt.logo && typeof alt.logo === 'object' && alt.logo.url
              ? alt.logo.url
              : null

            // Category color for fallback
            const categoryColors: Record<string, string> = {
              Writing: '#1a73e8', Image: '#e7131a', Video: '#9c27b0', Audio: '#ff5722',
              Automation: '#10b981', Chatbots: '#6366f1', Marketing: '#f59e0b',
              Data: '#06b6d4', Building: '#fbbc04', '3D': '#673ab7',
            }
            const fallbackColor = categoryColors[category?.title || ''] || '#e7131a'

            return (
              <Link
                key={alt.id}
                href={`/tools/${alt.slug}`}
                className="group bg-white border border-[#e5e5e5] hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Logo */}
                    <div
                      className="flex-shrink-0 w-14 h-14 flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: logoUrl ? '#f8f8f8' : fallbackColor }}
                    >
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={`${alt.title} logo`}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-gilda-display text-white">
                          {alt.title.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-gilda-display text-[18px] text-black group-hover:text-[#e7131a] transition-colors truncate">
                        {alt.title}
                      </h3>
                      {category && (
                        <span className="font-ibm-plex-sans text-[12px] text-gray-500">
                          {category.title}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="font-ibm-plex-sans text-[14px] text-gray-600 line-clamp-2 mb-4">
                    {alt.tagline || alt.excerpt}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between">
                    {alt.stats?.rating != null && !isNaN(Number(alt.stats.rating)) && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-ibm-plex-sans text-[13px] text-gray-700">
                          {Number(alt.stats.rating).toFixed(1)}
                        </span>
                      </div>
                    )}

                    {alt.pricingModel && (
                      <span className={`text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase px-2 py-1 ${
                        alt.pricingModel === 'free' ? 'bg-green-100 text-green-700' :
                        alt.pricingModel === 'freemium' ? 'bg-blue-100 text-blue-700' :
                        alt.pricingModel === 'paid' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {alt.pricingModel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Compare Arrow */}
                <div className="px-6 py-3 border-t border-[#e5e5e5] bg-[#f8f8f8] group-hover:bg-black transition-colors">
                  <span className="flex items-center justify-center gap-2 font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-gray-600 group-hover:text-white transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase text-[#e7131a]"
          >
            View all tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
