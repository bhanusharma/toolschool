import React from 'react'
import Link from 'next/link'
import { Gilda_Display, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from 'next/font/google'
import '../globals.css'

const gildaDisplay = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gilda-display',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans-condensed',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'ToolSchool - Discover the Best AI Tools for Creators',
    template: '%s | ToolSchool',
  },
  description:
    'The premier discovery platform for AI creators. Find the best AI tools, showcase your creations, and connect with fellow innovators.',
  keywords: ['AI tools', 'AI creator', 'AI art', 'AI music', 'AI video', 'generative AI'],
}

function Header() {
  return (
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
                <Link
                  href="/makers"
                  prefetch={true}
                  className="flex flex-col h-full justify-center relative shrink-0"
                >
                  <span className="block leading-[14px] transition-opacity duration-200 hover:opacity-60">
                    MAKERS
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
                <Link
                  href="/news"
                  prefetch={true}
                  className="flex flex-col h-full justify-center relative shrink-0"
                >
                  <span className="block leading-[14px] transition-opacity duration-200 hover:opacity-60">
                    NEWS
                  </span>
                </Link>
              </nav>

              {/* Desktop Actions */}
              <div className="hidden md:flex flex-row gap-4 md:gap-6 items-center justify-end relative shrink-0 z-10">
                {/* Search Box */}
                <button
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
                <button className="bg-[#e7131a] text-white px-6 py-2 font-ibm-plex-sans-condensed text-[12px] md:text-[13px] tracking-wider uppercase transition-all duration-200 hover:bg-[#c10e14]">
                  SUBSCRIBE
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center gap-3">
                <button className="p-2" aria-label="Search">
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
                <button className="p-2" aria-label="Menu">
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 1H20M0 7H20M0 13H20" stroke="black" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="w-full flex justify-center">
      <footer className="w-full max-w-[1440px] border-t border-black bg-white">
        <div className="px-6 lg:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-[24px] font-gilda-display text-black">ToolSchool</span>
              </Link>
              <p className="font-ibm-plex-sans text-[14px] text-black/60">
                The premier discovery platform for AI creators.
              </p>
            </div>

            <div>
              <h4 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black mb-4">
                Discover
              </h4>
              <ul className="space-y-3 font-ibm-plex-sans text-[14px] text-black/60">
                <li>
                  <Link href="/tools" className="hover:text-black transition-colors">
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="/makers" className="hover:text-black transition-colors">
                    Makers
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-black transition-colors">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black mb-4">
                Categories
              </h4>
              <ul className="space-y-3 font-ibm-plex-sans text-[14px] text-black/60">
                <li>
                  <Link
                    href="/tools?category=creating"
                    className="hover:text-black transition-colors"
                  >
                    Creating
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools?category=writing"
                    className="hover:text-black transition-colors"
                  >
                    Writing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools?category=video"
                    className="hover:text-black transition-colors"
                  >
                    Video
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools?category=audio"
                    className="hover:text-black transition-colors"
                  >
                    Audio
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black mb-4">
                Resources
              </h4>
              <ul className="space-y-3 font-ibm-plex-sans text-[14px] text-black/60">
                <li>
                  <Link href="/news" className="hover:text-black transition-colors">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-black transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-black transition-colors">
                    Submit a Tool
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-ibm-plex-sans text-[14px] text-black/60">
              © {new Date().getFullYear()} ToolSchool. All rights reserved.
            </p>
            <div className="flex gap-6 font-ibm-plex-sans text-[14px] text-black/60">
              <Link href="/privacy" className="hover:text-black transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-black transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${gildaDisplay.variable} ${ibmPlexSans.variable} ${ibmPlexSansCondensed.variable}`}
    >
      <body className="min-h-screen flex flex-col font-ibm-plex-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
