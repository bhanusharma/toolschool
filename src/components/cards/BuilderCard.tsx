'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Star } from 'lucide-react'

const availabilityConfig: Record<string, { color: string; label: string; bgColor: string }> = {
  available: { color: '#22c55e', label: 'Available', bgColor: 'rgba(34, 197, 94, 0.1)' },
  selective: { color: '#eab308', label: 'Selective', bgColor: 'rgba(234, 179, 8, 0.1)' },
  unavailable: { color: '#9ca3af', label: 'Unavailable', bgColor: 'rgba(156, 163, 175, 0.1)' },
  'open-source-only': { color: '#3b82f6', label: 'Open Source', bgColor: 'rgba(59, 130, 246, 0.1)' },
}

interface BuilderCardProps {
  builder: {
    id: string
    slug: string
    title: string
    bio?: string
    location?: string
    featured?: boolean
    availability?: string
    profileImage?: {
      url: string
      alt?: string
    }
    backgroundImage?: {
      url: string
      alt?: string
    }
    specialties?: Array<{
      id: string
      title: string
    } | string>
  }
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function BuilderCard({
  builder,
  variant = 'default',
  className = '',
}: BuilderCardProps) {
  const backgroundUrl = builder.backgroundImage?.url
  const profileUrl = builder.profileImage?.url
  const availability = availabilityConfig[builder.availability || '']

  if (variant === 'compact') {
    return (
      <Link
        href={`/builders/${builder.slug}`}
        className={`group flex items-center gap-4 p-4 bg-white border border-[#e5e5e5] transition-all duration-200 hover:border-black hover:shadow-md ${className}`}
      >
        {/* Profile Image */}
        <div className="w-12 h-12 flex-shrink-0 overflow-hidden border border-[#e5e5e5] bg-[#f6f4f1]">
          {profileUrl ? (
            <Image
              src={profileUrl}
              alt={builder.profileImage?.alt || builder.title}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-gilda-display text-black/40">
              {builder.title?.charAt(0)?.toUpperCase() || 'B'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-gilda-display text-[16px] text-black group-hover:text-[#e7131a] transition-colors truncate">
              {builder.title}
            </h3>
            {builder.featured && (
              <Star className="w-3 h-3 text-[#e7131a] fill-[#e7131a] flex-shrink-0" />
            )}
          </div>
          {builder.location && (
            <div className="flex items-center gap-1 text-[12px] text-black/50 mt-0.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{builder.location}</span>
            </div>
          )}
        </div>

        {/* Availability */}
        {availability && (
          <div
            className="w-2 h-2 flex-shrink-0"
            style={{ backgroundColor: availability.color }}
            title={availability.label}
          />
        )}

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all flex-shrink-0" />
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/builders/${builder.slug}`}
        className={`group block bg-white border border-[#e5e5e5] overflow-hidden transition-all duration-300 hover:border-black hover:shadow-xl ${className}`}
      >
        {/* Large Hero */}
        <div
          className="aspect-[16/9] bg-center bg-cover bg-no-repeat relative"
          style={{
            backgroundImage: backgroundUrl
              ? `url('${backgroundUrl}')`
              : 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-[#e7131a] text-white">
            <Star className="w-3 h-3" />
            <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase">Featured Builder</span>
          </div>

          {/* Availability */}
          {availability && (
            <div
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5"
              style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
            >
              <div className="w-2 h-2" style={{ backgroundColor: availability.color }} />
              <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black">
                {availability.label}
              </span>
            </div>
          )}

          {/* Profile and name overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden border-2 border-white bg-white shadow-lg">
              {profileUrl ? (
                <Image
                  src={profileUrl}
                  alt={builder.profileImage?.alt || builder.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#f6f4f1] text-2xl font-gilda-display text-black/40">
                  {builder.title?.charAt(0)?.toUpperCase() || 'B'}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <h3 className="font-gilda-display text-[24px] text-white mb-1 truncate">
                {builder.title}
              </h3>
              {builder.location && (
                <div className="flex items-center gap-1.5 text-[12px] text-white/70">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{builder.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {builder.bio && (
            <p className="font-ibm-plex-sans text-[14px] leading-relaxed text-black/60 mb-4 line-clamp-2">
              {builder.bio}
            </p>
          )}

          {/* Specialties */}
          {builder.specialties && builder.specialties.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {builder.specialties.slice(0, 3).map((spec, index) => (
                <span
                  key={typeof spec === 'object' ? spec.id : index}
                  className="inline-block px-3 py-1 bg-[#f6f4f1] border border-[#e5e5e5] text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/70"
                >
                  {typeof spec === 'object' ? spec.title : spec}
                </span>
              ))}
              {builder.specialties.length > 3 && (
                <span className="inline-block px-3 py-1 bg-[#f6f4f1] border border-[#e5e5e5] text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/50">
                  +{builder.specialties.length - 3}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
            <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black group-hover:text-[#e7131a] transition-colors">
              View Profile
            </span>
            <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/builders/${builder.slug}`}
      className={`group block bg-white border border-[#e5e5e5] overflow-hidden transition-all duration-300 hover:border-black hover:shadow-lg ${className}`}
    >
      {/* Hero image area */}
      <div
        className="h-40 bg-center bg-cover bg-no-repeat relative"
        style={{
          backgroundImage: backgroundUrl
            ? `url('${backgroundUrl}')`
            : 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

        {/* Featured badge */}
        {builder.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black text-white">
            <Star className="w-3 h-3" />
            <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase">Featured</span>
          </div>
        )}

        {/* Availability indicator */}
        {availability && (
          <div
            className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5"
            style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
          >
            <div className="w-2 h-2" style={{ backgroundColor: availability.color }} />
            <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black">
              {availability.label}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          {/* Profile image */}
          <div className="w-14 h-14 flex-shrink-0 overflow-hidden border-2 border-white -mt-10 relative z-10 bg-white shadow-md">
            {profileUrl ? (
              <Image
                src={profileUrl}
                alt={builder.profileImage?.alt || builder.title}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#f6f4f1] text-lg font-gilda-display text-black/40">
                {builder.title?.charAt(0)?.toUpperCase() || 'B'}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h3 className="font-gilda-display text-[18px] text-black group-hover:text-[#e7131a] transition-colors truncate">
              {builder.title}
            </h3>
            {builder.location && (
              <div className="flex items-center gap-1.5 mt-1 text-[12px] text-black/50">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{builder.location}</span>
              </div>
            )}
          </div>
        </div>

        {builder.bio && (
          <p className="font-ibm-plex-sans text-[13px] leading-relaxed text-black/60 mb-4 line-clamp-2">
            {builder.bio}
          </p>
        )}

        {/* Specialties */}
        {builder.specialties && builder.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {builder.specialties.slice(0, 2).map((spec, index) => (
              <span
                key={typeof spec === 'object' ? spec.id : index}
                className="inline-block px-2.5 py-1 bg-[#f6f4f1] border border-[#e5e5e5] text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/70"
              >
                {typeof spec === 'object' ? spec.title : spec}
              </span>
            ))}
            {builder.specialties.length > 2 && (
              <span className="inline-block px-2.5 py-1 bg-[#f6f4f1] border border-[#e5e5e5] text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/50">
                +{builder.specialties.length - 2}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black group-hover:text-[#e7131a] transition-colors">
            View Profile
          </span>
          <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}
