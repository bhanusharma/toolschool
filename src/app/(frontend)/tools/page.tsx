'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  ChevronDown,
  X,
  Sparkles,
  Clock,
  SortAsc,
  Wrench,
  Search,
  PenLine,
  BookOpen,
  Hammer,
  Video,
  Music,
  Palette,
  Box,
  type LucideIcon,
} from 'lucide-react'
import { ToolCard, EmptyState } from '@/components/cards'

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
  [key: string]: { icon: LucideIcon; description: string }
} = {
  Creating: { icon: Sparkles, description: 'Generate art, images, and creative content' },
  Writing: { icon: PenLine, description: 'AI-powered text generation and editing' },
  Curating: { icon: BookOpen, description: 'Organize and discover content' },
  Building: { icon: Hammer, description: 'Develop AI-powered applications' },
  Video: { icon: Video, description: 'AI video generation and editing' },
  Audio: { icon: Music, description: 'AI music and voice generation' },
  Design: { icon: Palette, description: 'Design tools powered by AI' },
  '3D': { icon: Box, description: '3D modeling and rendering' },
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

// Debounce hook for search
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

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

  // Search API state
  const [searchResults, setSearchResults] = useState<Tool[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

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

  // Fetch search results from unified API when search query changes
  useEffect(() => {
    async function fetchSearchResults() {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedSearchQuery)}&types=tool&limit=50`
        )
        if (res.ok) {
          const data = await res.json() as {
            results: Array<{
              id: string | number
              title: string
              slug: string
              description?: string
              category?: string
              image?: string
            }>
          }
          // Map search results to Tool format
          const mappedResults: Tool[] = data.results.map((result: {
            id: string | number
            title: string
            slug: string
            description?: string
            category?: string
            image?: string
          }) => ({
            id: String(result.id),
            slug: result.slug,
            title: result.title,
            tagline: result.description,
            toolCategory: result.category ? { id: '', title: result.category, slug: '' } : undefined,
            featuredImage: result.image ? { url: result.image } : undefined,
          }))
          setSearchResults(mappedResults)
        }
      } catch (error) {
        console.error('Search API error:', error)
        // Fall back to client-side filtering
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    fetchSearchResults()
  }, [debouncedSearchQuery])

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

  const clearAllFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    updateUrl({ category: null, search: null })
  }

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    // Use search API results when we have a search query and results
    let filtered: Tool[]

    if (debouncedSearchQuery && searchResults.length > 0) {
      // Use semantic search results - enrich with full tool data
      filtered = searchResults.map(searchResult => {
        // Find the full tool data from pre-loaded tools
        const fullTool = tools.find(t => t.slug === searchResult.slug)
        return fullTool || searchResult
      })
    } else if (debouncedSearchQuery && searchResults.length === 0 && !isSearching) {
      // Search returned no results
      filtered = []
    } else {
      // No search - use all tools
      filtered = tools
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((tool) => tool.toolCategory?.title === selectedCategory)
    }

    // Sort (only when not using search results, as API returns ranked results)
    if (!debouncedSearchQuery) {
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
    }

    return filtered
  }, [selectedCategory, debouncedSearchQuery, searchResults, tools, sortBy, isSearching])

  const visibleTools = filteredTools.slice(0, visibleCount)
  const hasMore = visibleCount < filteredTools.length
  const hasActiveFilters = selectedCategory !== 'All' || searchQuery
  const featuredTools = tools.filter(t => t.featured).slice(0, 3)

  const sortOptions = [
    { value: 'featured' as SortOption, label: 'Featured', icon: Sparkles },
    { value: 'newest' as SortOption, label: 'Newest', icon: Clock },
    { value: 'alphabetical' as SortOption, label: 'A-Z', icon: SortAsc },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8]">
        {/* Skeleton Hero */}
        <section className="relative bg-black overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute top-0 right-0 w-[45%] h-full bg-[#e7131a] opacity-90"
              style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
            />
          </div>
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
            <div className="max-w-2xl">
              <div className="h-8 w-48 bg-white/10 mb-6 animate-pulse" />
              <div className="h-16 w-80 bg-white/10 mb-6 animate-pulse" />
              <div className="h-6 w-64 bg-white/10 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Skeleton Grid */}
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border border-[#e5e5e5] bg-white animate-pulse">
                <div className="aspect-square bg-[#f6f4f1]" />
                <div className="p-5">
                  <div className="h-6 w-3/4 bg-[#f6f4f1] mb-3" />
                  <div className="h-4 w-full bg-[#f6f4f1] mb-2" />
                  <div className="h-4 w-2/3 bg-[#f6f4f1]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          {/* Geometric background - top-right diagonal accent */}
          <div
            className="absolute top-0 right-0 w-[45%] h-full bg-[#e7131a] opacity-90 animate-geometric"
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
          />
          {/* Grid pattern */}
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

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Title and Search */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 mb-6 animate-hero">
                <Wrench className="w-4 h-4 text-[#e7131a]" />
                <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/80">
                  {tools.length}+ AI Tools Curated
                </span>
              </div>

              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[0.95] font-gilda-display text-white mb-6 animate-hero-delay-1">
                AI Creation
                <br />
                <span className="text-[#e7131a]">Tools</span>
              </h1>

              <p className="font-ibm-plex-sans text-[16px] md:text-[18px] leading-relaxed text-white/70 max-w-md mb-8 animate-hero-delay-2">
                Discover the best AI tools for creators, artists, and innovators. Find the perfect tool for your next project.
              </p>

              {/* Search Bar */}
              <div className="max-w-md animate-hero-delay-3">
                <div className="relative">
                  {isSearching ? (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5">
                      <div className="animate-spin h-5 w-5 border-2 border-black/40 border-t-[#e7131a] rounded-full" />
                    </div>
                  ) : (
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                  )}
                  <input
                    type="text"
                    placeholder="Search tools with AI..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-0 font-ibm-plex-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-[#e7131a] placeholder:text-black/40"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearchChange('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded"
                    >
                      <X className="w-4 h-4 text-black/60" />
                    </button>
                  )}
                </div>
                {searchQuery && !isSearching && searchResults.length > 0 && (
                  <div className="mt-2 flex items-center gap-2 text-[11px] font-ibm-plex-sans text-white/60">
                    <Sparkles className="w-3 h-3 text-[#e7131a]" />
                    <span>AI-powered semantic search</span>
                  </div>
                )}
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/20 animate-hero-delay-3">
                <div>
                  <div className="text-[32px] font-gilda-display text-white">{tools.length}+</div>
                  <div className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/50">Tools</div>
                </div>
                <div>
                  <div className="text-[32px] font-gilda-display text-white">{Object.keys(categoryData).length}</div>
                  <div className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/50">Categories</div>
                </div>
              </div>
            </div>

            {/* Right - Featured Tool Preview */}
            {featuredTools[0] && !hasActiveFilters && (
              <div className="hidden lg:block animate-slide-left stagger-4">
                <ToolCard tool={featuredTools[0] as any} variant="featured" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Cards (when not filtering) */}
      {!hasActiveFilters && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white border-b border-[#e5e5e5]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(categoryData).map((category, index) => {
              const color = categoryColors[category] || '#000'
              const staggerClass = `stagger-${index + 1}`
              const IconComponent = categoryData[category].icon
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group p-6 border border-[#e5e5e5] hover:border-black transition-all duration-200 text-left animate-slide-up ${staggerClass}`}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <IconComponent size={20} strokeWidth={1.5} style={{ color }} />
                  </div>
                  <h3 className="font-gilda-display text-[16px] text-black group-hover:text-[#e7131a] transition-colors mb-1">
                    {category}
                  </h3>
                  <p className="font-ibm-plex-sans text-[12px] text-black/50">
                    {categoryCounts[category] || 0} tools
                  </p>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-4 bg-white border-b border-[#e5e5e5] sticky top-14 md:top-16 lg:top-20 z-40">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {/* All Tools */}
          <button
            onClick={() => handleCategoryChange('All')}
            className={`flex-shrink-0 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase border transition-all ${
              selectedCategory === 'All'
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/70 border-[#e5e5e5] hover:border-black hover:text-black'
            }`}
          >
            All Tools ({tools.length})
          </button>

          {/* Category Filters */}
          {Object.keys(categoryData).map((category) => {
            const isActive = selectedCategory === category
            const color = categoryColors[category] || '#000'
            const IconComponent = categoryData[category].icon

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(isActive ? 'All' : category)}
                className={`flex-shrink-0 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase border transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-white border-transparent'
                    : 'bg-white text-black/70 border-[#e5e5e5] hover:border-black hover:text-black'
                }`}
                style={isActive ? { backgroundColor: color } : {}}
              >
                <IconComponent size={14} strokeWidth={1.5} className={isActive ? 'text-white' : ''} style={!isActive ? { color } : {}} />
                {category}
                {categoryCounts[category] && (
                  <span className={isActive ? 'text-white/70' : 'text-black/40'}>
                    ({categoryCounts[category]})
                  </span>
                )}
                {isActive && <X className="w-3 h-3 ml-1" />}
              </button>
            )
          })}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <>
              <div className="w-px h-6 bg-[#e5e5e5] mx-2 flex-shrink-0" />
              <button
                onClick={clearAllFilters}
                className="flex-shrink-0 flex items-center gap-1 text-[12px] font-ibm-plex-sans text-[#e7131a] hover:underline"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            </>
          )}
        </div>
      </section>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-3 bg-[#f6f4f1] border-b border-[#e5e5e5]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-ibm-plex-sans text-black/50">Filtering by:</span>
            {selectedCategory !== 'All' && categoryData[selectedCategory] && (() => {
              const IconComponent = categoryData[selectedCategory].icon
              const color = categoryColors[selectedCategory] || '#000'
              return (
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e5] text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase hover:border-black transition-colors"
                >
                  <IconComponent size={12} strokeWidth={1.5} style={{ color }} />
                  {selectedCategory}
                  <X className="w-3 h-3" />
                </button>
              )
            })()}
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e5] text-[12px] font-ibm-plex-sans hover:border-black transition-colors"
              >
                &ldquo;{searchQuery}&rdquo;
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Featured Tools (when not filtering) */}
      {!hasActiveFilters && featuredTools.length > 1 && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[28px] font-gilda-display text-black">Featured Tools</h2>
              <p className="text-[14px] font-ibm-plex-sans text-black/50 mt-1">
                Hand-picked for exceptional quality
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.slice(0, 3).map((tool, index) => (
              <div key={tool.id} className={`animate-slide-up stagger-${index + 1}`}>
                <ToolCard tool={tool as any} variant="featured" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[24px] font-gilda-display text-black">
              {hasActiveFilters ? 'Filtered Results' : 'All Tools'}
            </h2>
            <p className="text-[14px] font-ibm-plex-sans text-black/50 mt-1">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] hover:border-black transition-colors"
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

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleTools.map((tool, index) => (
                <div key={tool.id} className={`animate-slide-up stagger-${Math.min(index + 1, 12)}`}>
                  <ToolCard tool={tool as any} />
                </div>
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
        ) : (
          <EmptyState
            type="tools"
            searchQuery={searchQuery || undefined}
            actionLabel="Clear Filters"
            onAction={clearAllFilters}
          />
        )}
      </section>

      {/* Submit Tool CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mb-12">
        <div className="relative bg-black py-16 px-8 md:px-12 overflow-hidden">
          {/* Geometric accent - right side */}
          <div
            className="absolute top-0 right-0 w-64 h-full bg-[#e7131a] opacity-90"
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
          />

          <div className="relative z-10 max-w-xl">
            <h2 className="text-[32px] md:text-[40px] font-gilda-display text-white mb-4">
              Know an AI Tool We&apos;re Missing?
            </h2>
            <p className="font-ibm-plex-sans text-[16px] text-white/70 mb-8">
              Help us grow the directory by submitting your favorite AI tools.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-[#e7131a] text-white px-6 py-3 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-[#c10e14] transition-colors"
            >
              Submit a Tool
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-1">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
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
