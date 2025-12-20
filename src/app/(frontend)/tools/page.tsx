'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'

// Category mapping from URL params to display names
// These must match the actual database category slugs
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

// Category icons and descriptions - matching database categories
const categoryData: {
  [key: string]: { icon: string; emoji: string; description: string }
} = {
  Creating: {
    icon: '/category-icons/creating.svg',
    emoji: '🎨',
    description: 'Generate art, images, and creative content',
  },
  Writing: {
    icon: '/category-icons/writing.svg',
    emoji: '✍️',
    description: 'AI-powered text generation and editing',
  },
  Curating: {
    icon: '/category-icons/curating.svg',
    emoji: '📚',
    description: 'Organize and discover content',
  },
  Building: {
    icon: '/category-icons/building.svg',
    emoji: '🔧',
    description: 'Develop AI-powered applications',
  },
  Video: {
    icon: '/category-icons/video.svg',
    emoji: '🎬',
    description: 'AI video generation and editing',
  },
  Audio: {
    icon: '/category-icons/audio.svg',
    emoji: '🎵',
    description: 'AI music and voice generation',
  },
  Design: {
    icon: '/category-icons/design.svg',
    emoji: '🖌️',
    description: 'Design tools powered by AI',
  },
  '3D': {
    icon: '/category-icons/3d.svg',
    emoji: '🎲',
    description: '3D modeling and rendering',
  },
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
}

interface Category {
  id: string
  title: string
  slug: string
}

export default function ToolsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category')

  // Initialize category from URL param or default to "All"
  const initialCategory =
    categoryParam && categoryUrlToDisplayName[categoryParam]
      ? categoryUrlToDisplayName[categoryParam]
      : 'All'

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  // Fetch tools and categories
  useEffect(() => {
    async function fetchData() {
      try {
        const [toolsRes, categoriesRes] = await Promise.all([
          fetch('/api/tools?limit=100'),
          fetch('/api/tool-categories'),
        ])

        if (toolsRes.ok) {
          const toolsData = await toolsRes.json()
          setTools(toolsData.docs || [])
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
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

  // Update URL when search query changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    const url = new URL(window.location.href)
    if (query.trim()) {
      url.searchParams.set('search', query)
    } else {
      url.searchParams.delete('search')
    }
    router.push(url.pathname + url.search, { scroll: false })
  }

  // Function to update URL with category param
  const updateCategoryInUrl = (category: string) => {
    const url = new URL(window.location.href)
    if (category === 'All') {
      url.searchParams.delete('category')
    } else {
      const urlKey = Object.keys(categoryUrlToDisplayName).find(
        (key) => categoryUrlToDisplayName[key] === category
      )
      if (urlKey) {
        url.searchParams.set('category', urlKey)
      }
    }
    router.push(url.pathname + url.search, { scroll: false })
  }

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateCategoryInUrl(category)
  }

  // Listen for URL changes
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search') || ''

    const newCategory =
      categoryParam && categoryUrlToDisplayName[categoryParam]
        ? categoryUrlToDisplayName[categoryParam]
        : 'All'

    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory)
    }

    if (searchParam !== searchQuery) {
      setSearchQuery(searchParam)
    }
  }, [searchParams, selectedCategory, searchQuery])

  // Filter tools
  useEffect(() => {
    let filtered = tools

    // Filter by category
    if (selectedCategory !== 'All') {
      const urlKey = Object.keys(categoryUrlToDisplayName).find(
        (key) => categoryUrlToDisplayName[key] === selectedCategory
      )
      const slugToMatch = urlKey || categoryParam

      filtered = filtered.filter((tool) => {
        if (!tool.toolCategory) return false
        return (
          tool.toolCategory.slug === slugToMatch ||
          tool.toolCategory.title === selectedCategory ||
          tool.toolCategory.title.toLowerCase() === selectedCategory.toLowerCase()
        )
      })
    }

    // Filter by search
    if (searchQuery) {
      setIsSearching(true)
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (tool) =>
          tool.title.toLowerCase().includes(query) ||
          tool.tagline?.toLowerCase().includes(query) ||
          tool.excerpt?.toLowerCase().includes(query) ||
          tool.toolCategory?.title.toLowerCase().includes(query)
      )
      setIsSearching(false)
    }

    setFilteredTools(filtered)
  }, [selectedCategory, searchQuery, tools, categoryParam])

  // Get excerpt text (remove HTML)
  const getExcerptText = (excerpt: string | undefined) => {
    if (!excerpt) return ''
    return excerpt.replace(/<[^>]*>/g, '').trim()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white border-b border-black py-[80px] md:py-[120px] px-6 lg:px-12">
          <div className="max-w-[980px] mx-auto">
            <h1 className="text-[48px] sm:text-[64px] lg:text-[80px] leading-[1] font-gilda-display font-normal text-black text-center mb-6">
              AI Creation Tools
            </h1>
            <p className="font-ibm-plex-sans text-[18px] sm:text-[20px] leading-[30px] text-black text-center max-w-[680px] mx-auto">
              Discover groundbreaking AI tools curated for creators, artists, and innovators.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-[#f6f4f1] py-12 px-6 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-6 py-4 bg-white border border-[#e5e5e5] font-ibm-plex-sans text-[16px] placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                {isSearching && (
                  <svg
                    className="animate-spin h-5 w-5 text-black/60"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black/60"
                >
                  <path
                    d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {searchQuery && (
              <div className="mt-3 text-center">
                <span className="text-[12px] font-ibm-plex-sans-condensed text-black/60 uppercase tracking-[1px]">
                  Searching for &quot;{searchQuery}&quot;
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white py-20 px-6 lg:px-12">
          <h2 className="text-[36px] font-gilda-display font-normal text-black text-center mb-16">
            Tools Categories
          </h2>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] max-w-[1080px] mx-auto">
            {Object.keys(categoryData).map((category) => {
              const data = categoryData[category]
              return (
                <div
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group cursor-pointer flex items-center gap-6 p-8 border ${
                    selectedCategory === category
                      ? 'border-black bg-[#f6f4f1]'
                      : 'border-[#e5e5e5] bg-white hover:border-black hover:bg-[#f6f4f1]'
                  } transition-all duration-300`}
                >
                  <div className="w-12 h-12 bg-[#f6f4f1] rounded-full flex items-center justify-center">
                    <span className="text-2xl">{data.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-gilda-display text-[24px] leading-[32px] text-black">
                      {category}
                    </h3>
                    <p className="font-ibm-plex-sans text-[14px] leading-[22px] text-black/60 mt-1">
                      {data.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[14px] tracking-[1.4px] uppercase ${
                selectedCategory === 'All' ? 'text-black' : 'text-black/60 hover:text-black'
              } transition-colors`}
            >
              VIEW ALL CATEGORIES
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white border-t border-black py-20 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-[36px] font-gilda-display font-normal text-black">
                {selectedCategory === 'All' ? 'All Tools' : selectedCategory}
              </h2>
              <span className="font-ibm-plex-sans-condensed text-[14px] tracking-[1px] uppercase text-black/60">
                {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-20 border border-[#e5e5e5]">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="group flex flex-col bg-white border border-[#e5e5e5] transition-all duration-300 hover:border-black cursor-pointer"
                  >
                    {/* Tool Logo/Icon */}
                    <div className="aspect-square bg-[#f6f4f1] p-12 flex items-center justify-center">
                      {tool.featuredImage?.url ? (
                        <Image
                          src={tool.featuredImage.url}
                          alt={tool.featuredImage.alt || tool.title}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-contain"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-black/10 rounded-lg flex items-center justify-center">
                          <span className="text-4xl font-gilda-display text-black/30">
                            {tool.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Tool Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-gilda-display text-[24px] leading-[32px] text-black mb-2">
                        {tool.title}
                      </h3>

                      <p className="font-ibm-plex-sans text-[14px] leading-[22px] text-black/60 mb-4 flex-1 line-clamp-2">
                        {tool.tagline || getExcerptText(tool.excerpt)}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.toolCategory && (
                          <span className="inline-block bg-[#f6f4f1] px-3 py-1 font-ibm-plex-sans-condensed text-[12px] tracking-[1px] uppercase text-black/60">
                            {tool.toolCategory.title}
                          </span>
                        )}
                        {tool.pricingModel && (
                          <span className="inline-block bg-[#f6f4f1] px-3 py-1 font-ibm-plex-sans-condensed text-[12px] tracking-[1px] uppercase text-black/60">
                            {tool.pricingModel}
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
                          xmlns="http://www.w3.org/2000/svg"
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
