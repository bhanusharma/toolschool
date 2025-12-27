import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  ArrowLeft,
  MapPin,
  Globe,
  ExternalLink,
} from 'lucide-react'

// Force dynamic rendering - D1 database not available during static build in CI
export const dynamic = 'force-dynamic'

type Params = Promise<{ slug: string }>

async function getBuilderBySlug(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'builders',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (result.docs.length === 0) {
    return null
  }

  return result.docs[0]
}

async function getRelatedBuilders(currentBuilderId: string, specialtyIds: string[]) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'builders',
    where: {
      and: [
        { id: { not_equals: currentBuilderId } },
        ...(specialtyIds.length > 0
          ? [{ specialties: { in: specialtyIds } }]
          : [])
      ]
    },
    limit: 3,
  })

  return result.docs
}

// Social platform SVG icons
function SocialIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
        </svg>
      )
    case 'twitter':
    case 'x':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    case 'website':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    case 'github':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      )
  }
}

const availabilityLabels: Record<string, string> = {
  available: 'Available for Work',
  selective: 'Selective Projects',
  unavailable: 'Not Available',
  'open-source-only': 'Open Source Only',
}

const availabilityColors: Record<string, string> = {
  available: 'bg-green-500',
  selective: 'bg-yellow-500',
  unavailable: 'bg-gray-400',
  'open-source-only': 'bg-blue-500',
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const builder = await getBuilderBySlug(slug)

  if (!builder) {
    return { title: 'Builder Not Found' }
  }

  return {
    title: `${builder.title} - AI Builder`,
    description: builder.bio || `AI Builder profile for ${builder.title}`,
  }
}

export default async function BuilderDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const builder = await getBuilderBySlug(slug)

  if (!builder) {
    notFound()
  }

  const specialtyIds = builder.specialties?.map((s: any) => typeof s === 'object' ? String(s.id) : String(s)) || []
  const relatedBuilders = await getRelatedBuilders(String(builder.id), specialtyIds)

  const backgroundUrl = typeof builder.backgroundImage === 'object' && builder.backgroundImage ? builder.backgroundImage.url : null
  const profileUrl = typeof builder.profileImage === 'object' && builder.profileImage ? builder.profileImage.url : null

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section with Background */}
      <div className="w-full flex justify-center">
        <div
          className="relative w-full max-w-[1440px] h-[300px] sm:h-[400px] bg-gray-900 overflow-hidden"
          style={{
            backgroundImage: backgroundUrl
              ? `url('${backgroundUrl}')`
              : 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)'
          }}
        >
          {backgroundUrl && (
            <Image
              src={backgroundUrl}
              alt={`${builder.title} background`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />

          {/* Back Button */}
          <Link
            href="/builders"
            className="absolute top-6 left-6 sm:left-8 lg:left-12 flex items-center gap-2 text-white/80 hover:text-white text-[12px] font-medium tracking-wider uppercase transition-colors z-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Builders
          </Link>

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 sm:px-8 lg:px-12 pb-8">
              <div className="flex items-end gap-6">
                {/* Profile Image */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden border-4 border-white shadow-xl bg-white flex-shrink-0">
                  {profileUrl ? (
                    <Image
                      src={profileUrl}
                      alt={typeof builder.profileImage === 'object' && builder.profileImage?.alt ? builder.profileImage.alt : builder.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 128px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-3xl font-bold text-gray-600">
                      {builder.title?.charAt(0)?.toUpperCase() || 'B'}
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1 mb-2">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] text-white" style={{ fontFamily: 'var(--font-display), serif' }}>
                      {builder.title}
                    </h1>
                    {builder.availability && (
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1">
                        <div className={`w-2 h-2 rounded-full ${availabilityColors[builder.availability] || 'bg-gray-400'}`} />
                        <span className="text-[10px] font-medium tracking-[1px] uppercase text-white">
                          {availabilityLabels[builder.availability] || builder.availability.replace(/-/g, ' ')}
                        </span>
                      </div>
                    )}
                  </div>
                  {builder.location && (
                    <div className="flex items-center gap-2 text-[14px] text-white/80">
                      <MapPin className="h-4 w-4" />
                      {builder.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white px-6 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Bio & Skills */}
            <div className="lg:col-span-2">
              {/* Bio */}
              {builder.bio && (
                <div className="mb-8">
                  <h2 className="text-[12px] font-medium tracking-[2px] uppercase text-black/50 mb-4">
                    About
                  </h2>
                  <p className="text-[16px] text-black/80 leading-relaxed">
                    {builder.bio}
                  </p>
                </div>
              )}

              {/* Specialties */}
              {builder.specialties && builder.specialties.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-[12px] font-medium tracking-[2px] uppercase text-black/50 mb-4">
                    Specialties
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {builder.specialties.map((spec: any) => (
                      <span
                        key={spec.id || spec}
                        className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 text-[10px] font-medium tracking-[1px] uppercase"
                      >
                        {typeof spec === 'object' ? spec.title : spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Expertise */}
              {builder.toolsExpertise && builder.toolsExpertise.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-[12px] font-medium tracking-[2px] uppercase text-black/50 mb-4">
                    Tools Expertise
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {builder.toolsExpertise.map((tool: any) => (
                      <Link
                        key={tool.id || tool}
                        href={`/tools/${typeof tool === 'object' ? tool.slug : tool}`}
                        className="group flex items-center justify-between p-4 bg-gray-50 border border-gray-200 hover:border-[#e7131a] hover:bg-gray-50 transition-all"
                      >
                        <span className="text-[14px] font-medium text-black group-hover:text-[#e7131a] transition-colors">
                          {typeof tool === 'object' ? tool.title : tool}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#e7131a] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Level */}
              {builder.experienceLevel && (
                <div className="mb-8">
                  <h2 className="text-[12px] font-medium tracking-[2px] uppercase text-black/50 mb-4">
                    Experience Level
                  </h2>
                  <p className="text-[16px] font-medium text-black capitalize">
                    {builder.experienceLevel}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Contact & Social */}
            <div>
              {/* Social Links */}
              {((builder.socialLinks && builder.socialLinks.length > 0) || builder.website) && (
                <div className="mb-8">
                  <h2 className="text-[12px] font-medium tracking-[2px] uppercase text-black/50 mb-4">
                    Connect
                  </h2>
                  <div className="flex flex-col gap-3">
                    {builder.website && (
                      <a
                        href={builder.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="text-[#e7131a]">
                          <Globe className="h-5 w-5" />
                        </div>
                        <span className="text-[14px] text-black">Website</span>
                      </a>
                    )}
                    {builder.socialLinks?.map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="text-[#e7131a]">
                          <SocialIcon platform={link.platform} />
                        </div>
                        <span className="text-[14px] text-black capitalize">
                          {link.platform}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-black p-6">
                <h3 className="text-[20px] text-white mb-3" style={{ fontFamily: 'var(--font-display), serif' }}>
                  Interested in Collaboration?
                </h3>
                <p className="text-[14px] text-white/70 mb-4 leading-relaxed">
                  Connect with {builder.title} for AI projects and collaborations.
                </p>
                <button className="w-full bg-[#e7131a] text-white py-3 text-[12px] font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14]">
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section - Placeholder */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-white border-t border-black/10 px-6 sm:px-8 lg:px-12 py-12">
          <h2 className="text-[28px] sm:text-[32px] text-black mb-8" style={{ fontFamily: 'var(--font-display), serif' }}>
            Projects by {builder.title}
          </h2>
          <div className="text-center py-12 bg-gray-50 border border-gray-200">
            <p className="text-[16px] text-black/50 mb-4">
              Projects will be displayed here once available.
            </p>
            <p className="text-[14px] text-black/40">
              Check back soon or follow {builder.title} on social media for updates.
            </p>
          </div>
        </div>
      </div>

      {/* Related Builders Section */}
      {relatedBuilders.length > 0 && (
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1440px] bg-[#f8f8f8] px-6 sm:px-8 lg:px-12 py-12">
            <h2 className="text-[28px] sm:text-[32px] text-black mb-8" style={{ fontFamily: 'var(--font-display), serif' }}>
              Similar Builders
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBuilders.map((relatedBuilder: any) => (
                <Link
                  key={relatedBuilder.id}
                  href={`/builders/${relatedBuilder.slug}`}
                  className="group bg-white border border-gray-200 overflow-hidden hover:border-black transition-all"
                >
                  <div
                    className="h-32 bg-center bg-cover bg-no-repeat relative"
                    style={{
                      backgroundImage: relatedBuilder.backgroundImage?.url
                        ? `url('${relatedBuilder.backgroundImage.url}')`
                        : 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 overflow-hidden border-2 border-gray-200 -mt-8 relative z-10 bg-white flex-shrink-0">
                        {relatedBuilder.profileImage?.url ? (
                          <Image
                            src={relatedBuilder.profileImage.url}
                            alt={relatedBuilder.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-lg font-bold text-gray-600">
                            {relatedBuilder.title?.charAt(0)?.toUpperCase() || 'B'}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-[14px] tracking-[1px] uppercase text-black group-hover:text-[#e7131a] transition-colors">
                          {relatedBuilder.title}
                        </h3>
                        {relatedBuilder.location && (
                          <p className="text-[12px] text-gray-500">{relatedBuilder.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter / Discover Section */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-[1440px] bg-black py-16 px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] text-white mb-4" style={{ fontFamily: 'var(--font-display), serif' }}>
              Discover More Builders
            </h2>
            <p className="text-[16px] text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our community to connect with innovative AI builders and stay updated on the latest projects.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/builders"
                className="bg-white text-black px-8 py-3 text-[12px] font-medium tracking-wider uppercase transition-all duration-300 hover:bg-gray-100"
              >
                Browse All Builders
              </Link>
              <Link
                href="/join"
                className="bg-[#e7131a] text-white px-8 py-3 text-[12px] font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#c10e14]"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
