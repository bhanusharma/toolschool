'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Eye, ArrowRight, Play, Music, Star } from 'lucide-react'

// Community type colors
const typeColors: { [key: string]: string } = {
  websites: '#e7131a',
  images: '#1a73e8',
  videos: '#fbbc04',
  music: '#34a853',
}

interface ProjectCardProps {
  project: {
    id: string
    slug: string
    title: string
    excerpt?: string
    views?: number
    duration?: string
    genre?: string
    projectYear?: number
    projectAuthor?: string
    featuredInHero?: boolean
    featuredInShowcase?: boolean
    communityType?: {
      id: string
      title: string
      slug?: string
    } | string
    featuredImage?: {
      url: string
      alt?: string
    }
  }
  variant?: 'default' | 'compact' | 'featured' | 'hero'
  className?: string
}

function getTypeSlug(communityType: ProjectCardProps['project']['communityType']): string {
  if (!communityType) return ''
  if (typeof communityType === 'string') return communityType.toLowerCase()
  return communityType.slug || communityType.title.toLowerCase()
}

function getTypeTitle(communityType: ProjectCardProps['project']['communityType']): string {
  if (!communityType) return ''
  if (typeof communityType === 'string') return communityType
  return communityType.title
}

export function ProjectCard({
  project,
  variant = 'default',
  className = '',
}: ProjectCardProps) {
  const typeSlug = getTypeSlug(project.communityType)
  const typeTitle = getTypeTitle(project.communityType)
  const typeColor = typeColors[typeSlug] || '#e7131a'
  const isVideo = typeSlug === 'videos'
  const isMusic = typeSlug === 'music'

  if (variant === 'compact') {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className={`group flex items-center gap-4 p-4 bg-white border border-[#e5e5e5] transition-all duration-200 hover:border-black hover:shadow-md ${className}`}
      >
        {/* Thumbnail */}
        <div className="w-16 h-12 flex-shrink-0 overflow-hidden bg-[#f6f4f1] relative">
          {project.featuredImage?.url ? (
            <Image
              src={project.featuredImage.url}
              alt={project.featuredImage.alt || project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: `${typeColor}15` }}
            >
              {isVideo ? (
                <Play className="w-4 h-4" style={{ color: typeColor }} />
              ) : isMusic ? (
                <Music className="w-4 h-4" style={{ color: typeColor }} />
              ) : (
                <span className="text-lg font-gilda-display" style={{ color: typeColor }}>
                  {project.title.charAt(0)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-gilda-display text-[14px] text-black group-hover:text-[#e7131a] transition-colors truncate">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-black/50 mt-0.5">
            {project.projectAuthor && <span>by {project.projectAuthor}</span>}
            {project.projectYear && <span>{project.projectYear}</span>}
          </div>
        </div>

        {/* Views */}
        {project.views !== undefined && project.views > 0 && (
          <div className="flex items-center gap-1 text-[11px] text-black/40 flex-shrink-0">
            <Eye className="w-3 h-3" />
            {project.views}
          </div>
        )}

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all flex-shrink-0" />
      </Link>
    )
  }

  if (variant === 'hero') {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className={`group block relative overflow-hidden ${className}`}
      >
        {/* Full-bleed image */}
        <div
          className="aspect-[21/9] bg-center bg-cover bg-no-repeat relative"
          style={{
            backgroundImage: project.featuredImage?.url
              ? `url('${project.featuredImage.url}')`
              : `linear-gradient(135deg, ${typeColor}30, ${typeColor}10)`
          }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white"
                style={{ backgroundColor: typeColor }}
              >
                Featured Project
              </span>
              {typeTitle && (
                <span className="px-3 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/80 border border-white/30">
                  {typeTitle}
                </span>
              )}
            </div>

            <h2 className="font-gilda-display text-[32px] md:text-[48px] leading-tight text-white mb-3 max-w-3xl">
              {project.title}
            </h2>

            {project.excerpt && (
              <p className="font-ibm-plex-sans text-[16px] text-white/70 max-w-2xl line-clamp-2 mb-4">
                {project.excerpt}
              </p>
            )}

            <div className="flex items-center gap-6 text-[12px] text-white/60">
              {project.projectAuthor && <span>by {project.projectAuthor}</span>}
              {project.projectYear && <span>{project.projectYear}</span>}
              {project.views !== undefined && project.views > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {project.views} views
                </div>
              )}
            </div>
          </div>

          {/* Play button for video/music */}
          {(isVideo || isMusic) && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          )}

          {/* Hover arrow */}
          <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 px-4 py-2 bg-white text-black">
              <span className="text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase">View Project</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className={`group block bg-white border border-[#e5e5e5] overflow-hidden transition-all duration-300 hover:border-black hover:shadow-xl ${className}`}
      >
        {/* Large Image */}
        <div className="aspect-video relative overflow-hidden">
          {project.featuredImage?.url ? (
            <Image
              src={project.featuredImage.url}
              alt={project.featuredImage.alt || project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: `${typeColor}15` }}
            >
              <span className="text-6xl font-gilda-display" style={{ color: typeColor }}>
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black text-white">
            <Star className="w-3 h-3" />
            <span className="text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase">Featured</span>
          </div>

          {/* Type badge */}
          {typeTitle && (
            <span
              className="absolute top-4 right-4 px-3 py-1.5 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white"
              style={{ backgroundColor: typeColor }}
            >
              {typeTitle}
            </span>
          )}

          {/* Play button for video/music */}
          {(isVideo || isMusic) && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-gilda-display text-[22px] leading-tight text-black mb-2 group-hover:text-[#e7131a] transition-colors">
            {project.title}
          </h3>

          {project.excerpt && (
            <p className="font-ibm-plex-sans text-[14px] leading-relaxed text-black/60 mb-4 line-clamp-2">
              {project.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
            <div className="flex items-center gap-4 text-[12px] text-black/50">
              {project.projectAuthor && <span>by {project.projectAuthor}</span>}
              {project.projectYear && <span>{project.projectYear}</span>}
            </div>
            {project.views !== undefined && project.views > 0 && (
              <div className="flex items-center gap-1 text-[12px] text-black/40">
                <Eye className="w-3 h-3" />
                {project.views}
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block bg-white border border-[#e5e5e5] overflow-hidden transition-all duration-300 hover:border-black hover:shadow-lg ${className}`}
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        {project.featuredImage?.url ? (
          <Image
            src={project.featuredImage.url}
            alt={project.featuredImage.alt || project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: `${typeColor}15` }}
          >
            {isVideo ? (
              <Play className="w-8 h-8" style={{ color: typeColor }} />
            ) : isMusic ? (
              <Music className="w-8 h-8" style={{ color: typeColor }} />
            ) : (
              <span className="text-4xl font-gilda-display" style={{ color: typeColor }}>
                {project.title.charAt(0)}
              </span>
            )}
          </div>
        )}

        {/* Type badge */}
        {typeTitle && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white"
            style={{ backgroundColor: typeColor }}
          >
            {typeTitle}
          </span>
        )}

        {/* Views */}
        {project.views !== undefined && project.views > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-[10px]">
            <Eye className="w-3 h-3" />
            {project.views}
          </div>
        )}

        {/* Duration for videos/music */}
        {project.duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-[11px] font-ibm-plex-sans">
            {project.duration}
          </div>
        )}

        {/* Play button for video/music */}
        {(isVideo || isMusic) && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-gilda-display text-[18px] leading-tight text-black mb-2 group-hover:text-[#e7131a] transition-colors line-clamp-1">
          {project.title}
        </h3>

        {project.excerpt && (
          <p className="font-ibm-plex-sans text-[13px] leading-relaxed text-black/60 mb-4 line-clamp-2">
            {project.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <div className="flex items-center gap-3 text-[11px] text-black/50">
            {project.projectAuthor && <span>by {project.projectAuthor}</span>}
            {project.projectYear && <span>{project.projectYear}</span>}
          </div>
          <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[#e7131a] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}
