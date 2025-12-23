'use client'

import { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Globe, Apple, Smartphone, Monitor, Code, Puzzle, ArrowLeft } from 'lucide-react'

interface Tool {
  id: string
  slug: string
  title: string
  tagline?: string
  excerpt?: string
  website?: string
  toolCategory?: {
    id: string
    title: string
    slug: string
    description?: string
  }
  pricingModel?: string
  pricingSummary?: string
  difficulty?: string
  useCases?: string[]
  platforms?: string[]
  featured?: boolean
  featuredImage?: {
    url: string
    alt?: string
  }
  logo?: {
    url: string
    alt?: string
  }
  keyFeatures?: Array<{
    title: string
    description?: string
  }>
}

interface ToolsApiResponse {
  docs: Tool[]
  hasNextPage: boolean
  hasPrevPage: boolean
  totalDocs: number
}

// Category colors for visual consistency (10 categories + legacy WordPress mappings)
const categoryColors: { [key: string]: string } = {
  // New 10 categories
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
  // Legacy WordPress mappings for existing tools
  'Image Generation': '#e7131a',
  'Text / Copywriting': '#1a73e8',
  'Music / Audio': '#ff5722',
  'Video / Film': '#9c27b0',
  'Graphic Design': '#e7131a',
  'Website / App': '#fbbc04',
  Coding: '#fbbc04',
}

// Platform icons
const platformIcons: { [key: string]: React.ReactNode } = {
  web: <Globe className="w-4 h-4" />,
  ios: <Apple className="w-4 h-4" />,
  android: <Smartphone className="w-4 h-4" />,
  mac: <Monitor className="w-4 h-4" />,
  windows: <Monitor className="w-4 h-4" />,
  api: <Code className="w-4 h-4" />,
  plugin: <Puzzle className="w-4 h-4" />,
}

// Pricing model labels
const pricingLabels: { [key: string]: { label: string; color: string } } = {
  free: { label: 'Free', color: '#34a853' },
  freemium: { label: 'Freemium', color: '#1a73e8' },
  paid: { label: 'Paid', color: '#9c27b0' },
  custom: { label: 'Custom Pricing', color: '#ff5722' },
}

// Difficulty labels
const difficultyLabels: { [key: string]: { label: string; color: string } } = {
  beginner: { label: 'Beginner Friendly', color: '#34a853' },
  intermediate: { label: 'Intermediate', color: '#fbbc04' },
  advanced: { label: 'Advanced', color: '#e7131a' },
}

export default function ToolDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [tool, setTool] = useState<Tool | null>(null)
  const [relatedTools, setRelatedTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTool() {
      try {
        const res = await fetch(`/api/tools?where[slug][equals]=${slug}&limit=1`)
        if (res.ok) {
          const data: ToolsApiResponse = await res.json()
          if (data.docs && data.docs.length > 0) {
            setTool(data.docs[0])

            // Fetch related tools if we have a category
            const categoryId = data.docs[0].toolCategory?.id
            if (categoryId) {
              const relatedRes = await fetch(
                `/api/tools?where[toolCategory][equals]=${categoryId}&where[id][not_equals]=${data.docs[0].id}&limit=4`
              )
              if (relatedRes.ok) {
                const relatedData: ToolsApiResponse = await relatedRes.json()
                setRelatedTools(relatedData.docs || [])
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching tool:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchTool()
    }
  }, [slug])

  // Helper function to get category color
  const getCategoryColor = (categoryName?: string) => {
    return categoryColors[categoryName || ''] || '#e7131a'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8]">
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1440px] bg-gradient-to-br from-black via-gray-900 to-black py-20 px-6 lg:px-12">
            <div className="animate-pulse">
              <div className="h-4 w-32 bg-white/10 rounded mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="h-6 w-24 bg-white/10 rounded mb-4" />
                  <div className="h-16 w-3/4 bg-white/10 rounded mb-6" />
                  <div className="h-6 w-full bg-white/10 rounded mb-2" />
                  <div className="h-6 w-2/3 bg-white/10 rounded" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 bg-white/10 rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!tool) {
    notFound()
  }

  const categoryColor = getCategoryColor(tool.toolCategory?.title)
  const hasFeatures = tool.keyFeatures && tool.keyFeatures.length > 0
  const hasPricingInfo = tool.pricingSummary || tool.pricingModel

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

          <div className="relative z-10 py-16 lg:py-20 px-6 lg:px-12">
            {/* Back Link */}
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-ibm-plex-sans text-[14px]">Back to Tools</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                {tool.toolCategory && (
                  <span
                    className="inline-block px-4 py-1.5 text-white text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase mb-4"
                    style={{ backgroundColor: categoryColor }}
                  >
                    {tool.toolCategory.title}
                  </span>
                )}

                <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1] text-white mb-6 font-gilda-display">
                  {tool.title}
                </h1>

                <p className="font-ibm-plex-sans text-[17px] sm:text-[19px] text-white/80 mb-8 leading-relaxed max-w-[540px]">
                  {tool.tagline || tool.excerpt}
                </p>

                {/* Quick Info Pills */}
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
                    <span
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white"
                    >
                      {difficultyLabels[tool.difficulty].label}
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                {tool.website && (
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14] group"
                  >
                    TRY {tool.title.toUpperCase()}
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>

              {/* Right Column - Visual */}
              <div className="relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Animated background circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="absolute w-64 h-64 rounded-full animate-pulse opacity-20"
                      style={{ backgroundColor: categoryColor }}
                    />
                    <div
                      className="absolute w-48 h-48 rounded-full animate-pulse opacity-15"
                      style={{ backgroundColor: categoryColor, animationDelay: '1s' }}
                    />
                  </div>

                  {/* Tool Icon/Logo */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl overflow-hidden">
                      {(tool.featuredImage?.url || tool.logo?.url) ? (
                        <Image
                          src={tool.featuredImage?.url || tool.logo?.url || ''}
                          alt={tool.featuredImage?.alt || tool.logo?.alt || tool.title}
                          width={128}
                          height={128}
                          className="w-32 h-32 object-contain"
                        />
                      ) : (
                        <div
                          className="w-32 h-32 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: categoryColor }}
                        >
                          <span className="text-5xl font-gilda-display text-white">
                            {tool.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white py-16 px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-[28px] font-gilda-display text-black mb-6">
                About {tool.title}
              </h2>
              <p className="font-ibm-plex-sans text-[16px] text-gray-700 leading-relaxed">
                {tool.excerpt || tool.tagline || `${tool.title} is an AI-powered tool designed for creative professionals and innovators.`}
              </p>
            </div>

            {/* Use Cases */}
            {tool.useCases && tool.useCases.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[22px] font-gilda-display text-black mb-5">Use Cases</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="inline-block bg-[#f6f4f1] px-4 py-2.5 font-ibm-plex-sans-condensed text-[12px] tracking-[1px] uppercase text-black/70 hover:bg-[#e5e3e0] transition-colors"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Platforms */}
            {tool.platforms && tool.platforms.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[22px] font-gilda-display text-black mb-5">
                  Available Platforms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tool.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-2.5 px-5 py-3 border border-[#e5e5e5] font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase hover:border-black transition-colors"
                    >
                      {platformIcons[platform] || <Globe className="w-4 h-4" />}
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features - Only show if we have actual data */}
            {hasFeatures && (
              <div className="mb-12">
                <h3 className="text-[22px] font-gilda-display text-black mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tool.keyFeatures!.map((feature, index) => {
                    const colors = ['#e7131a', '#1a73e8', '#34a853', '#fbbc04', '#9c27b0', '#00bcd4']
                    const color = colors[index % colors.length]
                    return (
                      <div key={index} className="flex gap-4 p-5 bg-[#f6f4f1] hover:bg-[#f0eeeb] transition-colors">
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color }}
                          >
                            <path
                              d="M9 11L12 14L22 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-[17px] text-black mb-1.5 font-gilda-display">
                            {feature.title}
                          </h4>
                          {feature.description && (
                            <p className="font-ibm-plex-sans text-[14px] text-gray-600 leading-relaxed">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Pricing Info - Only show if we have actual data */}
            {hasPricingInfo && (
              <div className="mb-12">
                <h3 className="text-[22px] font-gilda-display text-black mb-5">Pricing</h3>
                <div className="bg-[#f6f4f1] p-8">
                  {tool.pricingSummary && (
                    <p className="font-ibm-plex-sans text-[16px] text-gray-700 leading-relaxed mb-5">
                      {tool.pricingSummary}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4">
                    {tool.pricingModel && pricingLabels[tool.pricingModel] && (
                      <span
                        className="inline-block text-white px-5 py-2.5 font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase"
                        style={{ backgroundColor: pricingLabels[tool.pricingModel].color }}
                      >
                        {pricingLabels[tool.pricingModel].label}
                      </span>
                    )}
                    {tool.website && (
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#e7131a] hover:underline font-ibm-plex-sans text-[14px]"
                      >
                        View full pricing on website
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Visit Website CTA */}
            {tool.website && (
              <div className="border-t border-[#e5e5e5] pt-8">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-[#e7131a] group"
                >
                  Visit {tool.title}
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1440px] bg-[#f6f4f1] py-16 lg:py-20 px-6 lg:px-12">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[32px] font-gilda-display font-normal text-black">
                Related Tools
              </h2>
              {tool.toolCategory && (
                <Link
                  href={`/tools?category=${tool.toolCategory.slug}`}
                  className="font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase text-black/60 hover:text-[#e7131a] transition-colors"
                >
                  View all {tool.toolCategory.title} tools →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.map((relatedTool) => {
                const relatedColor = getCategoryColor(relatedTool.toolCategory?.title)
                return (
                  <Link
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.slug}`}
                    className="group flex flex-col bg-white border border-[#e5e5e5] transition-all duration-300 hover:border-black hover:shadow-lg cursor-pointer"
                  >
                    <div
                      className="aspect-square p-8 flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: (relatedTool.featuredImage?.url || relatedTool.logo?.url)
                          ? '#f8f8f8'
                          : `linear-gradient(135deg, ${relatedColor}15, ${relatedColor}05)`
                      }}
                    >
                      {(relatedTool.featuredImage?.url || relatedTool.logo?.url) ? (
                        <Image
                          src={relatedTool.featuredImage?.url || relatedTool.logo?.url || ''}
                          alt={relatedTool.featuredImage?.alt || relatedTool.logo?.alt || relatedTool.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div
                          className="w-20 h-20 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: relatedColor }}
                        >
                          <span className="text-3xl font-gilda-display text-white">
                            {relatedTool.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-gilda-display text-[18px] leading-tight text-black mb-2 group-hover:text-[#e7131a] transition-colors">
                        {relatedTool.title}
                      </h3>
                      <p className="font-ibm-plex-sans text-[13px] text-black/60 line-clamp-2">
                        {relatedTool.tagline || relatedTool.excerpt}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
