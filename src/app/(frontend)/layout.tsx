import React from 'react'
import Link from 'next/link'
import { Gilda_Display, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from 'next/font/google'
import '../globals.css'
import { Header } from '@/components/Header'

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

// Header component is now imported from @/components/Header

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
                {/* TEMPORARILY HIDDEN - Builders and Projects pages not ready yet, will bring back later
                <li>
                  <Link href="/builders" className="hover:text-black transition-colors">
                    Builders
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-black transition-colors">
                    Projects
                  </Link>
                </li>
                */}
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
