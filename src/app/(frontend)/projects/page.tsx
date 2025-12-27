import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Search, X, Sparkles, Image as ImageIcon, Video, Music, Globe } from 'lucide-react'
import { ProjectCard, EmptyState } from '@/components/cards'

// Force dynamic rendering - D1 database not available during static build in CI
export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// Type colors for visual distinction
const typeConfig: { [key: string]: { color: string; icon: typeof ImageIcon; emoji: string } } = {
  websites: { color: '#e7131a', icon: Globe, emoji: '🌐' },
  images: { color: '#1a73e8', icon: ImageIcon, emoji: '🖼️' },
  videos: { color: '#fbbc04', icon: Video, emoji: '🎬' },
  music: { color: '#34a853', icon: Music, emoji: '🎵' },
}

async function getProjectsData(searchParams: { [key: string]: string | string[] | undefined }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const where: Record<string, unknown> = {}

  if (searchParams.type) {
    const communityType = await payload.find({
      collection: 'community-types',
      where: { slug: { equals: searchParams.type } },
      limit: 1,
    })
    if (communityType.docs.length > 0) {
      where['communityType'] = { equals: communityType.docs[0].id }
    }
  }

  if (searchParams.search) {
    where['or'] = [
      { title: { contains: searchParams.search } },
      { excerpt: { contains: searchParams.search } },
      { projectAuthor: { contains: searchParams.search } },
    ]
  }

  const [projects, communityTypes, featuredProjects] = await Promise.all([
    payload.find({
      collection: 'projects',
      limit: 50,
      sort: '-createdAt',
      where: Object.keys(where).length > 0 ? where : undefined,
    }),
    payload.find({
      collection: 'community-types',
      limit: 20,
    }),
    payload.find({
      collection: 'projects',
      where: { featuredInHero: { equals: true } },
      limit: 3,
    }),
  ])

  return {
    projects: projects.docs,
    communityTypes: communityTypes.docs,
    totalProjects: projects.totalDocs,
    featuredProjects: featuredProjects.docs,
  }
}

function buildFilterUrl(
  currentParams: { [key: string]: string | string[] | undefined },
  key: string,
  value: string | null
) {
  const params = new URLSearchParams()

  for (const [k, v] of Object.entries(currentParams)) {
    if (k !== key && v && typeof v === 'string') {
      params.set(k, v)
    }
  }

  if (value !== null) {
    params.set(key, value)
  }

  const queryString = params.toString()
  return queryString ? `/projects?${queryString}` : '/projects'
}

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams
  const { projects, communityTypes, totalProjects, featuredProjects } = await getProjectsData(resolvedParams)

  const activeType = resolvedParams.type as string | undefined
  const searchQuery = resolvedParams.search as string | undefined
  const hasActiveFilters = activeType || searchQuery

  // Get featured project for hero
  const heroProject = featuredProjects[0]
  const showcaseProjects = featuredProjects.slice(1, 3)

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          {/* Geometric background */}
          <div
            className="absolute top-0 right-0 w-[60%] h-full bg-[#e7131a] opacity-90"
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)' }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Title and Search */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#e7131a]" />
                <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/80">
                  Community Showcase
                </span>
              </div>

              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[0.95] font-gilda-display text-white mb-6">
                AI-Powered
                <br />
                <span className="text-[#e7131a]">Creations</span>
              </h1>

              <p className="font-ibm-plex-sans text-[16px] md:text-[18px] leading-relaxed text-white/70 max-w-md mb-8">
                Explore stunning projects made with AI tools. From websites to music, discover what creators are building.
              </p>

              {/* Search Bar */}
              <form action="/projects" method="GET" className="max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40" />
                  <input
                    type="text"
                    name="search"
                    defaultValue={searchQuery}
                    placeholder="Search projects..."
                    className="w-full pl-12 pr-4 py-4 bg-white border-0 font-ibm-plex-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-[#e7131a] placeholder:text-black/40"
                  />
                  {activeType && <input type="hidden" name="type" value={activeType} />}
                </div>
              </form>

              {/* Quick stats */}
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/20">
                <div>
                  <div className="text-[32px] font-gilda-display text-white">{totalProjects}+</div>
                  <div className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/50">Projects</div>
                </div>
                <div>
                  <div className="text-[32px] font-gilda-display text-white">{communityTypes.length}</div>
                  <div className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/50">Categories</div>
                </div>
              </div>
            </div>

            {/* Right - Featured Project Preview */}
            {heroProject && !hasActiveFilters && (
              <div className="hidden lg:block">
                <ProjectCard project={heroProject as any} variant="featured" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      {!hasActiveFilters && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white border-b border-[#e5e5e5]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {communityTypes.map((type: any) => {
              const config = typeConfig[type.slug] || { color: '#000', icon: Globe, emoji: '📁' }
              const Icon = config.icon
              const count = projects.filter((p: any) => {
                if (!p.communityType) return false
                const slug = typeof p.communityType === 'object' ? p.communityType.slug : p.communityType
                return slug === type.slug
              }).length

              return (
                <Link
                  key={type.id}
                  href={`/projects?type=${type.slug}`}
                  className="group p-6 border border-[#e5e5e5] hover:border-black transition-all duration-200"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${config.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: config.color }} />
                  </div>
                  <h3 className="font-gilda-display text-[18px] text-black group-hover:text-[#e7131a] transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-[12px] font-ibm-plex-sans text-black/50 mt-1">
                    {count} {count === 1 ? 'project' : 'projects'}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-4 bg-white border-b border-[#e5e5e5] sticky top-14 md:top-16 lg:top-20 z-40">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {/* All Projects */}
          <Link
            href="/projects"
            className={`flex-shrink-0 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase border transition-all ${
              !hasActiveFilters
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/70 border-[#e5e5e5] hover:border-black hover:text-black'
            }`}
          >
            All Projects ({totalProjects})
          </Link>

          {/* Type Filters */}
          {communityTypes.map((type: any) => {
            const config = typeConfig[type.slug] || { color: '#000', icon: Globe, emoji: '📁' }
            const isActive = activeType === type.slug

            return (
              <Link
                key={type.id}
                href={buildFilterUrl(resolvedParams, 'type', isActive ? null : type.slug)}
                className={`flex-shrink-0 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase border transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-white border-transparent'
                    : 'bg-white text-black/70 border-[#e5e5e5] hover:border-black hover:text-black'
                }`}
                style={isActive ? { backgroundColor: config.color } : {}}
              >
                <span>{config.emoji}</span>
                {type.title}
                {isActive && <X className="w-3 h-3 ml-1" />}
              </Link>
            )
          })}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <>
              <div className="w-px h-6 bg-[#e5e5e5] mx-2 flex-shrink-0" />
              <Link
                href="/projects"
                className="flex-shrink-0 flex items-center gap-1 text-[12px] font-ibm-plex-sans text-[#e7131a] hover:underline"
              >
                <X className="w-3 h-3" />
                Clear
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-3 bg-[#f6f4f1] border-b border-[#e5e5e5]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-ibm-plex-sans text-black/50">Filtering by:</span>
            {activeType && (
              <Link
                href={buildFilterUrl(resolvedParams, 'type', null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e5] text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase hover:border-black transition-colors"
              >
                {typeConfig[activeType]?.emoji} {activeType}
                <X className="w-3 h-3" />
              </Link>
            )}
            {searchQuery && (
              <Link
                href={buildFilterUrl(resolvedParams, 'search', null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e5] text-[12px] font-ibm-plex-sans hover:border-black transition-colors"
              >
                &ldquo;{searchQuery}&rdquo;
                <X className="w-3 h-3" />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Featured Showcase (only when not filtering) */}
      {!hasActiveFilters && showcaseProjects.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[28px] font-gilda-display text-black">Featured Projects</h2>
              <p className="text-[14px] font-ibm-plex-sans text-black/50 mt-1">
                Hand-picked by our curators
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {showcaseProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Main Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[24px] font-gilda-display text-black">
              {hasActiveFilters ? 'Filtered Results' : 'All Projects'}
            </h2>
            <p className="text-[14px] font-ibm-plex-sans text-black/50 mt-1">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'} found
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            type="projects"
            searchQuery={searchQuery}
            actionLabel="Clear Filters"
            actionHref="/projects"
          />
        )}
      </section>

      {/* Submit CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="relative bg-black py-16 px-8 md:px-12 overflow-hidden">
          {/* Geometric accent */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-[#e7131a] opacity-90"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          />

          <div className="relative z-10 max-w-xl">
            <h2 className="text-[32px] md:text-[40px] font-gilda-display text-white mb-4">
              Made Something Amazing?
            </h2>
            <p className="font-ibm-plex-sans text-[16px] text-white/70 mb-8">
              Share your AI-powered creation with our community and inspire others.
            </p>
            <Link
              href="/submit-project"
              className="inline-flex items-center gap-2 bg-[#e7131a] text-white px-6 py-3 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-[#c10e14] transition-colors"
            >
              Submit Your Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-1">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-12" />
    </div>
  )
}
