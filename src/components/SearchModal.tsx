'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, ArrowRight, Wrench, Users, FolderOpen, Newspaper, BookOpen } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  slug: string
  type: 'tool' | 'builder' | 'project' | 'post' | 'tutorial'
  description?: string
  category?: string
  score: number
  image?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface UnifiedSearchResponse {
  results: SearchResult[]
  query: string
  total: number
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

  // Unified search function - single API call
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=14`
      )
      const data: UnifiedSearchResponse = await response.json()
      setResults(data.results || [])
      setSelectedIndex(0)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 200) // Faster debounce since we're making single request
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
    const paths: Record<SearchResult['type'], string> = {
      tool: `/tools/${result.slug}`,
      builder: `/builders/${result.slug}`,
      project: `/projects/${result.slug}`,
      post: `/news/${result.slug}`,
      tutorial: `/learn/${result.slug}`,
    }
    router.push(paths[result.type])
    onClose()
  }

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'tool': return <Wrench className="w-4 h-4" />
      case 'builder': return <Users className="w-4 h-4" />
      case 'project': return <FolderOpen className="w-4 h-4" />
      case 'post': return <Newspaper className="w-4 h-4" />
      case 'tutorial': return <BookOpen className="w-4 h-4" />
      default: return <Search className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'tool': return 'Tool'
      case 'builder': return 'Builder'
      case 'project': return 'Project'
      case 'post': return 'News'
      case 'tutorial': return 'Tutorial'
      default: return type
    }
  }

  const getTypeStyles = (type: SearchResult['type']) => {
    switch (type) {
      case 'tool': return 'bg-[#e7131a]/10 text-[#e7131a]'
      case 'builder': return 'bg-blue-500/10 text-blue-500'
      case 'project': return 'bg-green-500/10 text-green-500'
      case 'post': return 'bg-purple-500/10 text-purple-500'
      case 'tutorial': return 'bg-amber-500/10 text-amber-600'
      default: return 'bg-gray-500/10 text-gray-500'
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
              placeholder="Search tools, builders, projects, tutorials..."
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
                    {/* Image or Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden ${getTypeStyles(result.type)}`}>
                      {result.image ? (
                        <Image
                          src={result.image}
                          alt={result.title}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getIcon(result.type)
                      )}
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
                  <div className="w-10 h-10 bg-[#e7131a]/10 text-[#e7131a] flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="font-ibm-plex-sans text-[15px] text-black">Browse All Tools</span>
                </Link>
                <Link
                  href="/builders"
                  onClick={onClose}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#f6f4f1]/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-ibm-plex-sans text-[15px] text-black">Discover Builders</span>
                </Link>
                <Link
                  href="/projects"
                  onClick={onClose}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#f6f4f1]/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-500/10 text-green-500 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <span className="font-ibm-plex-sans text-[15px] text-black">Explore Projects</span>
                </Link>
                <Link
                  href="/learn"
                  onClick={onClose}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#f6f4f1]/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="font-ibm-plex-sans text-[15px] text-black">Learn Tutorials</span>
                </Link>
                <Link
                  href="/news"
                  onClick={onClose}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#f6f4f1]/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-500/10 text-purple-500 flex items-center justify-center">
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
                <kbd className="px-1.5 py-0.5 bg-white border border-black/10 text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-black/10 text-[10px]">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-black/10 text-[10px]">↵</kbd>
                <span className="ml-1">Open</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-black/10 text-[10px]">esc</kbd>
                <span className="ml-1">Close</span>
              </span>
            </div>
            <span className="text-[10px] font-ibm-plex-sans text-black/30">
              {results.length > 0 && `${results.length} results`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
