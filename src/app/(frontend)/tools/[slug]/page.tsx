'use client'

import { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
  stats?: {
    users?: string
    rating?: number
    company?: string
    launchYear?: number
  }
  keyFeatures?: Array<{
    title: string
    description?: string
  }>
}

export default function ToolDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [tool, setTool] = useState<Tool | null>(null)
  const [relatedTools, setRelatedTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing'>('overview')

  useEffect(() => {
    async function fetchTool() {
      try {
        const res = await fetch(`/api/tools?where[slug][equals]=${slug}&limit=1`)
        if (res.ok) {
          const data = await res.json()
          if (data.docs && data.docs.length > 0) {
            setTool(data.docs[0])

            // Fetch related tools if we have a category
            const categoryId = data.docs[0].toolCategory?.id
            if (categoryId) {
              const relatedRes = await fetch(
                `/api/tools?where[toolCategory][equals]=${categoryId}&where[id][not_equals]=${data.docs[0].id}&limit=4`
              )
              if (relatedRes.ok) {
                const relatedData = await relatedRes.json()
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
    const colors: { [key: string]: string } = {
      'Image Generation': '#e7131a',
      'Text / Copywriting': '#1a73e8',
      'Music / Audio': '#34a853',
      'Video / Film': '#fbbc04',
      'Graphic Design': '#9c27b0',
      'Website / App': '#00bcd4',
      Coding: '#ff5722',
      '3D': '#673ab7',
      Animation: '#e91e63',
    }
    return colors[categoryName || ''] || '#e7131a'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!tool) {
    notFound()
  }

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

          <div className="relative z-10 py-20 px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm font-ibm-plex-sans">
                <li>
                  <Link href="/" className="text-white/60 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-white/40">/</li>
                <li>
                  <Link href="/tools" className="text-white/60 hover:text-white transition-colors">
                    Tools
                  </Link>
                </li>
                <li className="text-white/40">/</li>
                <li className="text-white">{tool.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                {tool.toolCategory && (
                  <span
                    className="inline-block px-4 py-1 text-white text-xs font-ibm-plex-sans-condensed tracking-wider uppercase rounded-full mb-4"
                    style={{ backgroundColor: getCategoryColor(tool.toolCategory.title) }}
                  >
                    {tool.toolCategory.title}
                  </span>
                )}

                <h1 className="text-[40px] sm:text-[48px] lg:text-[56px] leading-tight text-white mb-6 font-gilda-display">
                  {tool.title}
                </h1>

                <p className="font-ibm-plex-sans text-[18px] sm:text-[20px] text-white/80 mb-8 leading-relaxed">
                  {tool.tagline || tool.excerpt}
                </p>

                <div className="flex flex-wrap gap-4">
                  {tool.website && (
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14] inline-block"
                    >
                      TRY {tool.title.toUpperCase()} NOW
                    </a>
                  )}
                  <button className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-white/20 hover:border-white/30">
                    LEARN MORE
                  </button>
                </div>
              </div>

              {/* Right Column - Visual */}
              <div className="relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Animated background circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[#e7131a]/20 to-transparent animate-pulse" />
                    <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-[#1a73e8]/20 to-transparent animate-pulse animation-delay-2000" />
                    <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#34a853]/20 to-transparent animate-pulse animation-delay-4000" />
                  </div>

                  {/* Tool Icon/Logo */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl overflow-hidden">
                      {tool.featuredImage?.url ? (
                        <Image
                          src={tool.featuredImage.url}
                          alt={tool.featuredImage.alt || tool.title}
                          width={128}
                          height={128}
                          className="w-32 h-32 object-contain"
                        />
                      ) : (
                        <span className="text-6xl font-gilda-display text-white/60">
                          {tool.title.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
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
              <div className="text-[32px] text-black mb-1 font-gilda-display">
                {tool.stats?.users || '10K+'}
              </div>
              <div className="font-ibm-plex-sans text-[14px] text-black/60 uppercase tracking-wider">
                Active Users
              </div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-[32px] text-black mb-1 font-gilda-display">
                {tool.stats?.rating || '4.5'}
              </div>
              <div className="font-ibm-plex-sans text-[14px] text-black/60 uppercase tracking-wider">
                User Rating
              </div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-[32px] text-black mb-1 font-gilda-display">
                {tool.stats?.company || 'AI Studio'}
              </div>
              <div className="font-ibm-plex-sans text-[14px] text-black/60 uppercase tracking-wider">
                Company
              </div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-[32px] text-black mb-1 font-gilda-display">
                {tool.stats?.launchYear || '2024'}
              </div>
              <div className="font-ibm-plex-sans text-[14px] text-black/60 uppercase tracking-wider">
                Launch Year
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="px-6 lg:px-12">
              <nav className="flex space-x-8">
                {(['overview', 'features', 'pricing'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-colors ${
                      activeTab === tab
                        ? 'border-[#e7131a] text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-6 lg:px-12 py-12">
            <div className="max-w-4xl">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-[28px] font-gilda-display text-black mb-4">
                      About {tool.title}
                    </h2>
                    <p className="font-ibm-plex-sans text-[16px] text-gray-700 leading-relaxed">
                      {tool.excerpt ||
                        `${tool.title} is an AI-powered tool designed for creative professionals and innovators.`}
                    </p>
                  </div>

                  {tool.useCases && tool.useCases.length > 0 && (
                    <div>
                      <h3 className="text-[20px] font-gilda-display text-black mb-4">Use Cases</h3>
                      <div className="flex flex-wrap gap-2">
                        {tool.useCases.map((useCase) => (
                          <span
                            key={useCase}
                            className="inline-block bg-[#f6f4f1] px-4 py-2 font-ibm-plex-sans-condensed text-[12px] tracking-[1px] uppercase text-black/70"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tool.platforms && tool.platforms.length > 0 && (
                    <div>
                      <h3 className="text-[20px] font-gilda-display text-black mb-4">
                        Available Platforms
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {tool.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="inline-flex items-center gap-2 px-4 py-3 border border-[#e5e5e5] font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase"
                          >
                            {platform === 'web' && '🌐'}
                            {platform === 'ios' && '📱'}
                            {platform === 'android' && '🤖'}
                            {platform === 'mac' && '💻'}
                            {platform === 'windows' && '🖥️'}
                            {platform === 'api' && '⚡'}
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  {tool.keyFeatures && tool.keyFeatures.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {tool.keyFeatures.map((feature, index) => {
                        const colors = ['#e7131a', '#1a73e8', '#34a853', '#fbbc04']
                        const color = colors[index % colors.length]
                        return (
                          <div key={index} className="flex gap-4">
                            <div
                              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${color}10` }}
                            >
                              <svg
                                width="24"
                                height="24"
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
                              <h3 className="text-[20px] text-black mb-2 font-gilda-display">
                                {feature.title}
                              </h3>
                              <p className="font-ibm-plex-sans text-[14px] text-gray-600">
                                {feature.description || 'Powerful feature to enhance your workflow'}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#e7131a]/10 rounded-lg flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-[#e7131a]"
                          >
                            <path
                              d="M9 11L12 14L22 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[20px] text-black mb-2 font-gilda-display">
                            Advanced AI Capabilities
                          </h3>
                          <p className="font-ibm-plex-sans text-[14px] text-gray-600">
                            Powered by state-of-the-art models for exceptional results
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#1a73e8]/10 rounded-lg flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-[#1a73e8]"
                          >
                            <path
                              d="M12 2L2 7L12 12L22 7L12 2Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[20px] text-black mb-2 font-gilda-display">
                            Easy Integration
                          </h3>
                          <p className="font-ibm-plex-sans text-[14px] text-gray-600">
                            Seamlessly integrate with your existing workflow
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#34a853]/10 rounded-lg flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-[#34a853]"
                          >
                            <path
                              d="M3 3H21V21H3V3Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[20px] text-black mb-2 font-gilda-display">
                            Customizable Output
                          </h3>
                          <p className="font-ibm-plex-sans text-[14px] text-gray-600">
                            Fine-tune results to match your specific needs
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#fbbc04]/10 rounded-lg flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-[#fbbc04]"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 6V12L16 14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[20px] text-black mb-2 font-gilda-display">
                            Real-time Processing
                          </h3>
                          <p className="font-ibm-plex-sans text-[14px] text-gray-600">
                            Get instant results with minimal latency
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'pricing' && (
                <div>
                  {tool.pricingSummary ? (
                    <div className="bg-[#f6f4f1] p-8">
                      <h3 className="text-[24px] text-black mb-4 font-gilda-display">
                        Pricing Information
                      </h3>
                      <p className="font-ibm-plex-sans text-[16px] text-gray-700 leading-relaxed mb-6">
                        {tool.pricingSummary}
                      </p>
                      {tool.pricingModel && (
                        <span className="inline-block bg-black text-white px-4 py-2 font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase">
                          {tool.pricingModel}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="border border-[#e5e5e5] p-8 hover:border-[#e7131a] transition-colors">
                        <h3 className="text-[24px] text-black mb-2 font-gilda-display">Free</h3>
                        <p className="font-ibm-plex-sans text-[14px] text-gray-600 mb-6">
                          Get started with basic features
                        </p>
                        <div className="text-[36px] text-black mb-6 font-gilda-display">$0</div>
                        <ul className="space-y-3 font-ibm-plex-sans text-[14px] text-gray-700">
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> Basic features
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> Limited usage
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> Community support
                          </li>
                        </ul>
                      </div>

                      <div className="border-2 border-[#e7131a] p-8 relative">
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#e7131a] text-white px-4 py-1 font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase">
                          Popular
                        </span>
                        <h3 className="text-[24px] text-black mb-2 font-gilda-display">Pro</h3>
                        <p className="font-ibm-plex-sans text-[14px] text-gray-600 mb-6">
                          For professionals and teams
                        </p>
                        <div className="text-[36px] text-black mb-6 font-gilda-display">
                          $29
                          <span className="text-[14px] text-gray-600">/mo</span>
                        </div>
                        <ul className="space-y-3 font-ibm-plex-sans text-[14px] text-gray-700">
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> All Free features
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> Unlimited usage
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> Priority support
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> API access
                          </li>
                        </ul>
                      </div>

                      <div className="border border-[#e5e5e5] p-8 hover:border-[#e7131a] transition-colors">
                        <h3 className="text-[24px] text-black mb-2 font-gilda-display">
                          Enterprise
                        </h3>
                        <p className="font-ibm-plex-sans text-[14px] text-gray-600 mb-6">
                          Custom solutions for organizations
                        </p>
                        <div className="text-[36px] text-black mb-6 font-gilda-display">Custom</div>
                        <ul className="space-y-3 font-ibm-plex-sans text-[14px] text-gray-700">
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> All Pro features
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> Custom integrations
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> Dedicated support
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#34a853]">✓</span> SLA guarantee
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {tool.website && (
                    <div className="mt-8 text-center">
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#e7131a] text-white px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14]"
                      >
                        VIEW FULL PRICING
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1440px] bg-[#f6f4f1] py-20 px-6 lg:px-12">
            <h2 className="text-[36px] font-gilda-display font-normal text-black mb-12">
              Related Tools
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="group flex flex-col bg-white border border-[#e5e5e5] transition-all duration-300 hover:border-black cursor-pointer"
                >
                  <div className="aspect-square bg-[#f8f8f8] p-8 flex items-center justify-center">
                    {relatedTool.featuredImage?.url ? (
                      <Image
                        src={relatedTool.featuredImage.url}
                        alt={relatedTool.featuredImage.alt || relatedTool.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-black/10 rounded-lg flex items-center justify-center">
                        <span className="text-3xl font-gilda-display text-black/30">
                          {relatedTool.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-gilda-display text-[20px] leading-tight text-black mb-2">
                      {relatedTool.title}
                    </h3>
                    <p className="font-ibm-plex-sans text-[13px] text-black/60 line-clamp-2">
                      {relatedTool.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
