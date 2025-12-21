'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X, ArrowRight, Wrench, Users, FolderOpen, Newspaper } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  slug: string
  type: 'tool' | 'builder' | 'project' | 'news'
  description?: string
  category?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ApiResponse {
  docs: Array<{
    id: string
    title: string
    slug: string
    tagline?: string
    excerpt?: string
    bio?: string
    toolCategory?: { title: string }
  }>
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      // Search tools
      const toolsRes = await fetch(`/api/tools?where[or][0][title][contains]=${encodeURIComponent(searchQuery)}&where[or][1][tagline][contains]=${encodeURIComponent(searchQuery)}&limit=5`)
      const toolsData: ApiResponse = await toolsRes.json()

      // Search builders
      const buildersRes = await fetch(`/api/builders?where[or][0][title][contains]=${encodeURIComponent(searchQuery)}&where[or][1][bio][contains]=${encodeURIComponent(searchQuery)}&limit=3`)
      const buildersData: ApiResponse = await buildersRes.json()

      // Search projects
      const projectsRes = await fetch(`/api/projects?where[title][contains]=${encodeURIComponent(searchQuery)}&limit=3`)
      const projectsData: ApiResponse = await projectsRes.json()

      // Search posts/news
      const postsRes = await fetch(`/api/posts?where[title][contains]=${encodeURIComponent(searchQuery)}&limit=3`)
      const postsData: ApiResponse = await postsRes.json()

      const searchResults: SearchResult[] = [
        ...(toolsData.docs || []).map((tool) => ({
          id: tool.id,
          title: tool.title,
          slug: tool.slug,
          type: 'tool' as const,
          description: tool.tagline || tool.excerpt,
          category: tool.toolCategory?.title,
        })),
        ...(buildersData.docs || []).map((builder) => ({
          id: builder.id,
          title: builder.title,
          slug: builder.slug,
          type: 'builder' as const,
          description: builder.bio,
        })),
        ...(projectsData.docs || []).map((project) => ({
          id: project.id,
          title: project.title,
          slug: project.slug,
          type: 'project' as const,
          description: project.excerpt,
        })),
        ...(postsData.docs || []).map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          type: 'news' as const,
          description: post.excerpt,
        })),
      ]

      setResults(searchResults)
      setSelectedIndex(0)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, performSearch])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      navigateToResult(results[selectedIndex])
    }
  }

  const navigateToResult = (result: SearchResult) => {
    const paths = {
      tool: `/tools/${result.slug}`,
      builder: `/builders/${result.slug}`,
      project: `/projects/${result.slug}`,
      news: `/news/${result.slug}`,
    }
    router.push(paths[result.type])
    onClose()
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'tool': return <Wrench className="w-4 h-4" />
      case 'builder': return <Users className="w-4 h-4" />
      case 'project': return <FolderOpen className="w-4 h-4" />
      case 'news': return <Newspaper className="w-4 h-4" />
      default: return <Search className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'tool': return 'Tool'
      case 'builder': return 'Builder'
      case 'project': return 'Project'
      case 'news': return 'News'
      default: return type
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex items-start justify-center pt-[15vh] px-4">
        <div className="w-full max-w-[640px] bg-white shadow-2xl border border-black overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-black/10">
            <Search className="w-5 h-5 text-black/40 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search tools, builders, projects, news..."
              className="flex-1 text-[16px] font-ibm-plex-sans placeholder:text-black/40 focus:outline-none bg-transparent"
            />
            {isLoading && (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            )}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5 text-black/60" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query && results.length === 0 && !isLoading && (
              <div className="px-6 py-12 text-center">
                <p className="text-black/60 font-ibm-plex-sans text-[14px]">
                  No results found for &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {results.length > 0 && (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => navigateToResult(result)}
                    className={`w-full px-6 py-3 flex items-start gap-4 text-left transition-colors ${
                      index === selectedIndex ? 'bg-[#f6f4f1]' : 'hover:bg-[#f6f4f1]/50'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      result.type === 'tool' ? 'bg-[#e7131a]/10 text-[#e7131a]' :
                      result.type === 'builder' ? 'bg-blue-500/10 text-blue-500' :
                      result.type === 'project' ? 'bg-green-500/10 text-green-500' :
                      'bg-purple-500/10 text-purple-500'
                    }`}>
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-ibm-plex-sans font-medium text-[15px] text-black truncate">
                          {result.title}
                        </span>
                        <span className="flex-shrink-0 px-2 py-0.5 bg-black/5 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/60">
                          {getTypeLabel(result.type)}
                        </span>
                        {result.category && (
                          <span className="flex-shrink-0 px-2 py-0.5 bg-black/5 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/60">
                            {result.category}
                          </span>
                        )}
                      </div>
                      {result.description && (
                        <p className="text-[13px] text-black/60 font-ibm-plex-sans truncate mt-0.5">
                          {result.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-black/30 flex-shrink-0 mt-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Links when no query */}
            {!query && (
              <div className="py-4">
                <div className="px-6 py-2">
                  <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/40">
                    Quick Links
                  </span>
                </div>
                <Link
                  href="/tools"
                  onClick={onClose}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#f6f4f1]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#e7131a]/10 text-[#e7131a] flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="font-ibm-plex-sans text-[15px] text-black">Browse All Tools</span>
                </Link>
                <Link
                  href="/builders"
                  onClick={onClose}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#f6f4f1]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-ibm-plex-sans text-[15px] text-black">Discover Builders</span>
                </Link>
                <Link
                  href="/projects"
                  onClick={onClose}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#f6f4f1]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <span className="font-ibm-plex-sans text-[15px] text-black">Explore Projects</span>
                </Link>
                <Link
                  href="/news"
                  onClick={onClose}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#f6f4f1]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <span className="font-ibm-plex-sans text-[15px] text-black">Latest News</span>
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-[#f6f4f1] border-t border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[11px] font-ibm-plex-sans text-black/40">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-black/10 rounded text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-black/10 rounded text-[10px]">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-black/10 rounded text-[10px]">↵</kbd>
                <span className="ml-1">Open</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-black/10 rounded text-[10px]">esc</kbd>
                <span className="ml-1">Close</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
