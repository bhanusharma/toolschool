'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SearchModal } from './SearchModal'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <div className="w-full flex justify-center sticky top-0 z-50">
        <div className="backdrop-blur-[20px] backdrop-filter bg-white border-b border-black relative w-full max-w-[1440px]">
          <header className="relative w-full h-14 md:h-16 lg:h-20" role="banner">
            <div className="flex flex-row items-center relative w-full h-full">
              <div className="box-border flex flex-row items-center justify-between px-6 lg:px-12 py-0 relative w-full h-full">
                {/* Logo */}
                <div className="flex flex-col justify-center relative shrink-0 z-10">
                  <Link
                    href="/"
                    className="text-[20px] md:text-[24px] lg:text-[28px] text-black leading-tight tracking-[-0.02em] block transition-opacity duration-200 hover:opacity-60 font-gilda-display"
                    aria-label="ToolSchool - Home"
                  >
                    ToolSchool
                  </Link>
                </div>

                {/* Navigation */}
                <nav
                  className="hidden md:flex flex-row font-ibm-plex-sans-condensed gap-6 md:gap-8 lg:gap-10 h-16 md:h-20 items-center justify-center text-black text-[12px] md:text-[13px] lg:text-[14px] text-center tracking-wider uppercase absolute left-0 right-0 mx-auto"
                  role="navigation"
                  aria-label="Main navigation"
                >
                  <Link
                    href="/tools"
                    prefetch={true}
                    className="flex flex-col h-full justify-center relative shrink-0"
                  >
                    <span className="block leading-[14px] transition-opacity duration-200 hover:opacity-60">
                      TOOLS
                    </span>
                  </Link>
                  {/* TEMPORARILY HIDDEN - Builders and Projects pages not ready yet, will bring back later
                  <Link
                    href="/builders"
                    prefetch={true}
                    className="flex flex-col h-full justify-center relative shrink-0"
                  >
                    <span className="block leading-[14px] transition-opacity duration-200 hover:opacity-60">
                      BUILDERS
                    </span>
                  </Link>
                  <Link
                    href="/projects"
                    prefetch={true}
                    className="flex flex-col h-full justify-center relative shrink-0"
                  >
                    <span className="block leading-[14px] transition-opacity duration-200 hover:opacity-60">
                      PROJECTS
                    </span>
                  </Link>
                  */}
                  <Link
                    href="/news"
                    prefetch={true}
                    className="flex flex-col h-full justify-center relative shrink-0"
                  >
                    <span className="block leading-[14px] transition-opacity duration-200 hover:opacity-60">
                      NEWS
                    </span>
                  </Link>
                  <Link
                    href="/learn"
                    prefetch={true}
                    className="flex flex-col h-full justify-center relative shrink-0"
                  >
                    <span className="block leading-[14px] transition-opacity duration-200 hover:opacity-60">
                      LEARN
                    </span>
                  </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex flex-row gap-4 md:gap-6 items-center justify-end relative shrink-0 z-10">
                  {/* Search Box */}
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-3 px-4 py-2 border border-black transition-all duration-200 hover:bg-black hover:text-white group min-w-[200px] lg:min-w-[240px]"
                    aria-label="Search"
                    type="button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black group-hover:text-white flex-shrink-0"
                    >
                      <path
                        d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-ibm-plex-sans-condensed text-black group-hover:text-white text-[12px] md:text-[13px] tracking-wider uppercase flex-1 text-left">
                      Search
                    </span>
                    <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 font-ibm-plex-sans-condensed text-[10px] text-black group-hover:text-white border border-black group-hover:border-white">
                      ⌘K
                    </kbd>
                  </button>

                  {/* Subscribe Button */}
                  <button className="bg-black text-white px-6 py-2 font-ibm-plex-sans-condensed text-[12px] md:text-[13px] tracking-wider uppercase transition-all duration-200 hover:bg-black/80">
                    SUBSCRIBE
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-3">
                  <button
                    className="p-2"
                    aria-label="Search"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black"
                    >
                      <path
                        d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="p-2"
                    aria-label="Menu"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5 text-black" />
                    ) : (
                      <Menu className="w-5 h-5 text-black" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-14 left-0 right-0 bg-white border-b border-black shadow-lg">
            <nav className="flex flex-col py-4">
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase text-black hover:bg-[#f6f4f1] transition-colors"
              >
                TOOLS
              </Link>
              {/* TEMPORARILY HIDDEN - Builders and Projects pages not ready yet, will bring back later
              <Link
                href="/builders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase text-black hover:bg-[#f6f4f1] transition-colors"
              >
                BUILDERS
              </Link>
              <Link
                href="/projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase text-black hover:bg-[#f6f4f1] transition-colors"
              >
                PROJECTS
              </Link>
              */}
              <Link
                href="/news"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase text-black hover:bg-[#f6f4f1] transition-colors"
              >
                NEWS
              </Link>
              <Link
                href="/learn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase text-black hover:bg-[#f6f4f1] transition-colors"
              >
                LEARN
              </Link>
              <div className="px-6 py-4 border-t border-black/10 mt-2">
                <button className="w-full bg-black text-white px-6 py-3 font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase transition-all duration-200 hover:bg-black/80">
                  SUBSCRIBE
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
