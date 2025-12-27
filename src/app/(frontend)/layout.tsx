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
      <footer className="w-full max-w-[1440px] border-t border-black/[0.06] bg-[#fafafa]">
        <div className="px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-5">
                <span className="text-[22px] font-gilda-display text-black">ToolSchool</span>
              </Link>
              <p className="font-ibm-plex-sans text-[13px] text-black/50 leading-relaxed max-w-[200px]">
                The premier discovery platform for AI creators.
              </p>
            </div>

            <div>
              <h4 className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.2em] uppercase text-black/40 mb-5">
                Discover
              </h4>
              <ul className="space-y-3.5 font-ibm-plex-sans text-[13px] text-black/55">
                <li>
                  <Link href="/tools" className="hover:text-black transition-colors duration-300">
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="/learn" className="hover:text-black transition-colors duration-300">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-black transition-colors duration-300">
                    News
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.2em] uppercase text-black/40 mb-5">
                Categories
              </h4>
              <ul className="space-y-3.5 font-ibm-plex-sans text-[13px] text-black/55">
                <li>
                  <Link
                    href="/tools?category=image"
                    className="hover:text-black transition-colors duration-300"
                  >
                    Image
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools?category=writing"
                    className="hover:text-black transition-colors duration-300"
                  >
                    Writing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools?category=video"
                    className="hover:text-black transition-colors duration-300"
                  >
                    Video
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools?category=audio"
                    className="hover:text-black transition-colors duration-300"
                  >
                    Audio
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-ibm-plex-sans-condensed text-[10px] tracking-[0.2em] uppercase text-black/40 mb-5">
                Company
              </h4>
              <ul className="space-y-3.5 font-ibm-plex-sans text-[13px] text-black/55">
                <li>
                  <Link href="/about" className="hover:text-black transition-colors duration-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-black transition-colors duration-300">
                    Submit a Tool
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-ibm-plex-sans text-[12px] text-black/40">
              © {new Date().getFullYear()} ToolSchool. All rights reserved.
            </p>
            <div className="flex gap-8 font-ibm-plex-sans text-[12px] text-black/40">
              <Link href="/privacy" className="hover:text-black transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-black transition-colors duration-300">
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
