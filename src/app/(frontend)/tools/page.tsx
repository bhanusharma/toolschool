'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChevronDown, X, Sparkles, Clock, SortAsc } from 'lucide-react'

// Category colors for visual distinction
const categoryColors: { [key: string]: string } = {
  Creating: '#e7131a',
  Writing: '#1a73e8',
  Curating: '#9c27b0',
  Building: '#ff5722',
  Video: '#fbbc04',
  Audio: '#34a853',
  Design: '#00bcd4',
  '3D': '#673ab7',
}

// Category mapping from URL params to display names
const categoryUrlToDisplayName: { [key: string]: string } = {
  'creating': 'Creating',
  'writing': 'Writing',
  'curating': 'Curating',
  'building': 'Building',
  'video': 'Video',
  'audio': 'Audio',
  'design': 'Design',
  '3d': '3D',
}

// Category icons and descriptions
const categoryData: {
  [key: string]: { emoji: string; description: string }
} = {
  Creating: { emoji: '🎨', description: 'Generate art, images, and creative content' },
  Writing: { emoji: '✍️', description: 'AI-powered text generation and editing' },
  Curating: { emoji: '📚', description: 'Organize and discover content' },
  Building: { emoji: '🔧', description: 'Develop AI-powered applications' },
  Video: { emoji: '🎬', description: 'AI video generation and editing' },
  Audio: { emoji: '🎵', description: 'AI music and voice generation' },
  Design: { emoji: '🖌️', description: 'Design tools powered by AI' },
  '3D': { emoji: '🎲', description: '3D modeling and rendering' },
}

interface Tool {
  id: string
  slug: string
  title: string
  tagline?: string
  excerpt?: string
  toolCategory?: {
    id: string
    title: string
    slug: string
  }
  pricingModel?: string
  featured?: boolean
  featuredImage?: {
    url: string
    alt?: string
  }
  logo?: {
    url: string
    alt?: string
  }
  createdAt?: string
}

interface Category {
  id: string
  title: string
  slug: string
}

interface ToolsApiResponse {
  docs: Tool[]
  hasNextPage: boolean
  hasPrevPage: boolean
  totalDocs: number
}

interface CategoriesApiResponse {
  docs: Category[]
}

type SortOption = 'featured' | 'newest' | 'alphabetical'

function ToolsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category')
  const sortParam = searchParams.get('sort') as SortOption | null

  const initialCategory =
    categoryParam && categoryUrlToDisplayName[categoryParam]
      ? categoryUrlToDisplayName[categoryParam]
      : 'All'

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [tools, setTools] = useState<Tool[]>([])
  const [, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>(sortParam || 'featured')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [visibleCount, setVisibleCount] = useState(20)

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {}
    tools.forEach((tool) => {
      if (tool.toolCategory?.title) {
        counts[tool.toolCategory.title] = (counts[tool.toolCategory.title] || 0) + 1
      }
    })
    return counts
  }, [tools])

  // Fetch tools and categories
  useEffect(() => {
    async function fetchData() {
      try {
        const [toolsRes, categoriesRes] = await Promise.all([
          fetch('/api/tools?limit=200'),
          fetch('/api/tool-categories'),
        ])

        if (toolsRes.ok) {
          const toolsData: ToolsApiResponse = await toolsRes.json()
          setTools(toolsData.docs || [])
        }

        if (categoriesRes.ok) {
          const categoriesData: CategoriesApiResponse = await categoriesRes.json()
          setCategories(categoriesData.docs || [])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update URL
  const updateUrl = (params: { category?: string | null; sort?: string | null; search?: string | null }) => {
    const url = new URL(window.location.href)

    if (params.category !== undefined) {
      if (params.category) {
        url.searchParams.set('category', params.category)
      } else {
        url.searchParams.delete('category')
      }
    }

    if (params.sort !== undefined) {
      if (params.sort && params.sort !== 'featured') {
        url.searchParams.set('sort', params.sort)
      } else {
        url.searchParams.delete('sort')
      }
    }

    if (params.search !== undefined) {
      if (params.search) {
        url.searchParams.set('search', params.search)
      } else {
        url.searchParams.delete('search')
      }
    }

    router.push(url.pathname + url.search, { scroll: false })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    updateUrl({ search: query || null })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setVisibleCount(20)
    const urlKey = category === 'All' ? null : Object.keys(categoryUrlToDisplayName).find(
      (key) => categoryUrlToDisplayName[key] === category
    )
    updateUrl({ category: urlKey })
  }

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
    setShowSortDropdown(false)
    updateUrl({ sort })
  }

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let filtered = tools

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((tool) => tool.toolCategory?.title === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (tool) =>
          tool.title.toLowerCase().includes(query) ||
          tool.tagline?.toLowerCase().includes(query) ||
          tool.excerpt?.toLowerCase().includes(query) ||
          tool.toolCategory?.title.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered = [...filtered].sort((a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        )
        break
      case 'alphabetical':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'featured':
      default:
        filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return filtered
  }, [selectedCategory, searchQuery, tools, sortBy])

  const visibleTools = filteredTools.slice(0, visibleCount)
  const hasMore = visibleCount < filteredTools.length

  const getExcerptText = (excerpt: string | undefined) => {
    if (!excerpt) return ''
    return excerpt.replace(/<[^>]*>/g, '').trim()
  }

  const sortOptions = [
    { value: 'featured' as SortOption, label: 'Featured', icon: Sparkles },
    { value: 'newest' as SortOption, label: 'Newest', icon: Clock },
    { value: 'alphabetical' as SortOption, label: 'A-Z', icon: SortAsc },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8]">
        {/* Skeleton Hero */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1440px] bg-gradient-to-br from-black via-gray-900 to-black py-[80px] md:py-[100px] px-6 lg:px-12">
            <div className="max-w-[980px] mx-auto text-center">
              <div className="h-16 w-64 bg-white/10 rounded mx-auto mb-6 animate-pulse" />
              <div className="h-6 w-96 bg-white/10 rounded mx-auto animate-pulse" />
            </div>
          </div>
        </div>
        {/* Skeleton Grid */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1440px] bg-white py-20 px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="border border-[#e5e5e5] animate-pulse">
                  <div className="aspect-square bg-[#f6f4f1]" />
                  <div className="p-6">
                    <div className="h-6 w-3/4 bg-[#f6f4f1] rounded mb-3" />
                    <div className="h-4 w-full bg-[#f6f4f1] rounded mb-2" />
                    <div className="h-4 w-2/3 bg-[#f6f4f1] rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section - Enhanced */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#e7131a]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative z-10 py-[60px] md:py-[80px] px-6 lg:px-12">
            <div className="max-w-[980px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#e7131a]" />
                <span className="text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/80">
                  {tools.length}+ AI Tools Curated
                </span>
              </div>

              <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] leading-[1] font-gilda-display font-normal text-white mb-6">
                AI Creation Tools
              </h1>
              <p className="font-ibm-plex-sans text-[16px] sm:text-[18px] leading-[28px] text-white/70 max-w-[600px] mx-auto mb-10">
                Discover the best AI tools for creators, artists, and innovators. Find the perfect tool for your next project.
              </p>

              {/* Search Bar */}
              <div className="max-w-[560px] mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur border border-white/20 font-ibm-plex-sans text-[16px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {searchQuery ? (
                      <button onClick={() => handleSearchChange('')} className="p-1 hover:bg-white/10 rounded">
                        <X className="w-5 h-5 text-white/60" />
                      </button>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/40">
                        <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills - Sticky Filter Bar */}
      <div className="w-full flex justify-center sticky top-14 md:top-16 lg:top-20 z-30 bg-white border-b border-black/10 shadow-sm">
        <div className="relative w-full max-w-[1440px] px-6 lg:px-12 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`flex-shrink-0 px-4 py-2 font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase transition-all border ${
                selectedCategory === 'All'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black/70 border-black/20 hover:border-black hover:text-black'
              }`}
            >
              All Tools ({tools.length})
            </button>
            {Object.keys(categoryData).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex-shrink-0 px-4 py-2 font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase transition-all border flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'text-white border-transparent'
                    : 'bg-white text-black/70 border-black/20 hover:border-black hover:text-black'
                }`}
                style={selectedCategory === category ? { backgroundColor: categoryColors[category] || '#000' } : {}}
              >
                <span>{categoryData[category].emoji}</span>
                {category}
                {categoryCounts[category] && (
                  <span className={`${selectedCategory === category ? 'text-white/70' : 'text-black/40'}`}>
                    ({categoryCounts[category]})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== 'All' || searchQuery) && (
        <div className="w-full flex justify-center bg-[#f6f4f1] border-b border-black/10">
          <div className="relative w-full max-w-[1440px] px-6 lg:px-12 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[12px] font-ibm-plex-sans text-black/50 mr-2">Filters:</span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-black/10 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase hover:border-black transition-colors"
                >
                  {categoryData[selectedCategory]?.emoji} {selectedCategory}
                  <X className="w-3 h-3" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-black/10 text-[12px] font-ibm-plex-sans-condensed tracking-wider hover:border-black transition-colors"
                >
                  &ldquo;{searchQuery}&rdquo;
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={() => {
                  handleCategoryChange('All')
                  handleSearchChange('')
                }}
                className="text-[12px] font-ibm-plex-sans text-[#e7131a] hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tools Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white py-12 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            {/* Header with count and sort */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-[28px] font-gilda-display font-normal text-black">
                  {selectedCategory === 'All' ? 'All Tools' : selectedCategory}
                </h2>
                <p className="font-ibm-plex-sans text-[14px] text-black/50 mt-1">
                  {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 border border-black/20 hover:border-black transition-colors"
                >
                  <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black/70">
                    Sort: {sortOptions.find(o => o.value === sortBy)?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-black/50 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showSortDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-white border border-black shadow-lg z-20 min-w-[160px]">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`w-full px-4 py-3 flex items-center gap-2 text-left hover:bg-[#f6f4f1] transition-colors ${
                            sortBy === option.value ? 'bg-[#f6f4f1]' : ''
                          }`}
                        >
                          <option.icon className="w-4 h-4 text-black/50" />
                          <span className="font-ibm-plex-sans text-[13px] text-black">
                            {option.label}
                          </span>
                          {sortBy === option.value && (
                            <span className="ml-auto text-[#e7131a]">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-20 border border-[#e5e5e5]">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#f6f4f1] rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black/30">
                    <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-gilda-display text-[24px] text-black mb-2">No tools found</p>
                <p className="font-ibm-plex-sans text-[16px] text-black/60 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    handleCategoryChange('All')
                  }}
                  className="bg-[#e7131a] text-white px-6 py-3 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-all duration-200 hover:bg-[#c10e14]"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {visibleTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      className="group flex flex-col bg-white border border-[#e5e5e5] transition-all duration-300 hover:border-black hover:shadow-lg cursor-pointer relative"
                    >
                      {/* Featured Badge */}
                      {tool.featured && (
                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 bg-black text-white">
                          <Sparkles className="w-3 h-3" />
                          <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase">Featured</span>
                        </div>
                      )}

                      {/* Tool Logo/Icon */}
                      <div
                        className="aspect-square p-8 flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: tool.featuredImage?.url || tool.logo?.url
                            ? '#f6f4f1'
                            : `linear-gradient(135deg, ${categoryColors[tool.toolCategory?.title || ''] || '#e7131a'}15, ${categoryColors[tool.toolCategory?.title || ''] || '#e7131a'}05)`
                        }}
                      >
                        {tool.featuredImage?.url || tool.logo?.url ? (
                          <Image
                            src={tool.featuredImage?.url || tool.logo?.url || ''}
                            alt={tool.featuredImage?.alt || tool.logo?.alt || tool.title}
                            width={96}
                            height={96}
                            className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div
                            className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: categoryColors[tool.toolCategory?.title || ''] || '#e7131a' }}
                          >
                            <span className="text-4xl font-gilda-display text-white">
                              {tool.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Tool Info */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-gilda-display text-[20px] leading-[28px] text-black mb-2 group-hover:text-[#e7131a] transition-colors">
                          {tool.title}
                        </h3>

                        <p className="font-ibm-plex-sans text-[13px] leading-[20px] text-black/60 mb-4 flex-1 line-clamp-2">
                          {tool.tagline || getExcerptText(tool.excerpt)}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tool.toolCategory && (
                            <span
                              className="inline-block px-2.5 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase"
                              style={{
                                backgroundColor: `${categoryColors[tool.toolCategory.title] || '#000'}10`,
                                color: categoryColors[tool.toolCategory.title] || '#000'
                              }}
                            >
                              {tool.toolCategory.title}
                            </span>
                          )}
                          {tool.pricingModel && (
                            <span className={`inline-block px-2.5 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase ${
                              tool.pricingModel === 'free' ? 'bg-green-500/10 text-green-600' :
                              tool.pricingModel === 'freemium' ? 'bg-blue-500/10 text-blue-600' :
                              'bg-purple-500/10 text-purple-600'
                            }`}>
                              {tool.pricingModel}
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e5e5e5]">
                          <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black group-hover:text-[#e7131a] transition-colors">
                            Learn More
                          </span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 20)}
                      className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-black hover:text-white transition-all"
                    >
                      Load More
                      <span className="text-black/50">({filteredTools.length - visibleCount} remaining)</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Submit Tool CTA */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-gradient-to-r from-[#e7131a] to-[#c10e14] py-16 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-[32px] md:text-[40px] font-gilda-display text-white mb-4">
              Know an AI Tool We&apos;re Missing?
            </h2>
            <p className="font-ibm-plex-sans text-[16px] text-white/80 mb-8">
              Help us grow the directory by submitting your favorite AI tools.
            </p>
            <Link
              href="/submit"
              className="inline-block bg-white text-[#e7131a] px-8 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-black hover:text-white transition-all"
            >
              Submit a Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full" />
        </div>
      }
    >
      <ToolsPageContent />
    </Suspense>
  )
}
