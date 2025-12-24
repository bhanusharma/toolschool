import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import type { Tool, ToolCategory } from '@/payload-types'

interface ToolRelatedProps {
  tools: Tool[]
  category?: ToolCategory
}

// Category colors for visual consistency
const categoryColors: Record<string, string> = {
  Writing: '#1a73e8',
  Image: '#e7131a',
  Video: '#9c27b0',
  Audio: '#ff5722',
  Automation: '#10b981',
  Chatbots: '#6366f1',
  Marketing: '#f59e0b',
  Data: '#06b6d4',
  Building: '#fbbc04',
  '3D': '#673ab7',
}

export function ToolRelated({ tools, category }: ToolRelatedProps) {
  const categoryColor = categoryColors[category?.title || ''] || '#e7131a'

  return (
    <section className="w-full flex justify-center bg-white border-t border-[#e5e5e5]">
      <div className="w-full max-w-[1440px] px-6 lg:px-12 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[32px] font-gilda-display font-normal text-black">
            More {category?.title || 'AI'} Tools
          </h2>
          {category && (
            <Link
              href={`/tools?category=${category.slug}`}
              className="font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase text-black/60 hover:text-[#e7131a] transition-colors flex items-center gap-2"
            >
              View all {category.title} tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const toolCategory = tool.toolCategory as ToolCategory | undefined
            const toolColor = categoryColors[toolCategory?.title || ''] || categoryColor
            const logoUrl = tool.logo && typeof tool.logo === 'object' && tool.logo.url
              ? tool.logo.url
              : tool.logoUrl || null

            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group flex flex-col bg-[#f8f8f8] border border-[#e5e5e5] transition-all duration-300 hover:border-black hover:shadow-lg"
              >
                {/* Logo Area */}
                <div
                  className="aspect-square p-8 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: logoUrl
                      ? '#f8f8f8'
                      : `linear-gradient(135deg, ${toolColor}15, ${toolColor}05)`
                  }}
                >
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`${tool.title} logo`}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="w-20 h-20 flex items-center justify-center"
                      style={{ backgroundColor: toolColor }}
                    >
                      <span className="text-3xl font-gilda-display text-white">
                        {tool.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col bg-white">
                  <h3 className="font-gilda-display text-[18px] leading-tight text-black mb-2 group-hover:text-[#e7131a] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="font-ibm-plex-sans text-[13px] text-black/60 line-clamp-2 flex-1">
                    {tool.tagline || tool.excerpt}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e5e5e5]">
                    {tool.stats?.rating != null && !isNaN(Number(tool.stats.rating)) && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-ibm-plex-sans text-[12px] text-gray-600">
                          {Number(tool.stats.rating).toFixed(1)}
                        </span>
                      </div>
                    )}
                    {tool.pricingModel && (
                      <span className="font-ibm-plex-sans-condensed text-[11px] tracking-wider uppercase text-gray-500">
                        {tool.pricingModel}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
