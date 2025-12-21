import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Search, X, Sparkles, Users } from 'lucide-react'
import { BuilderCard, EmptyState } from '@/components/cards'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// Specialty colors for visual distinction
const specialtyColors: { [key: string]: string } = {
  'ai-art': '#e7131a',
  'music': '#34a853',
  'video': '#fbbc04',
  'writing': '#1a73e8',
  'code': '#ff5722',
  'design': '#9c27b0',
  '3d': '#673ab7',
  'web': '#00bcd4',
}

async function getBuildersData(searchParams: { [key: string]: string | string[] | undefined }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const where: Record<string, unknown> = {}

  if (searchParams.specialty) {
    const specialty = await payload.find({
      collection: 'builder-specialties',
      where: { slug: { equals: searchParams.specialty } },
      limit: 1,
    })
    if (specialty.docs.length > 0) {
      where['specialties'] = { in: [specialty.docs[0].id] }
    }
  }

  if (searchParams.availability) {
    where['availability'] = { equals: searchParams.availability }
  }

  if (searchParams.search) {
    where['or'] = [
      { title: { contains: searchParams.search } },
      { bio: { contains: searchParams.search } },
      { location: { contains: searchParams.search } },
    ]
  }

  const [builders, specialties, featuredBuilders] = await Promise.all([
    payload.find({
      collection: 'builders',
      limit: 50,
      sort: '-createdAt',
      where: Object.keys(where).length > 0 ? where : undefined,
    }),
    payload.find({
      collection: 'builder-specialties',
      limit: 20,
    }),
    payload.find({
      collection: 'builders',
      where: { featured: { equals: true } },
      limit: 3,
    }),
  ])

  return {
    builders: builders.docs,
    specialties: specialties.docs,
    totalBuilders: builders.totalDocs,
    featuredBuilders: featuredBuilders.docs,
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
  return queryString ? `/builders?${queryString}` : '/builders'
}

export default async function BuildersPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams
  const { builders, specialties, totalBuilders, featuredBuilders } = await getBuildersData(resolvedParams)

  const activeSpecialty = resolvedParams.specialty as string | undefined
  const activeAvailability = resolvedParams.availability as string | undefined
  const searchQuery = resolvedParams.search as string | undefined
  const hasActiveFilters = activeSpecialty || activeAvailability || searchQuery

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          {/* Geometric background */}
          <div
            className="absolute top-0 left-0 w-[50%] h-full bg-[#e7131a] opacity-90 animate-geometric"
            style={{ clipPath: 'polygon(0 0, 70% 0, 40% 100%, 0 100%)' }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }} />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Title and Search */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 mb-6 animate-hero">
                <Users className="w-4 h-4 text-[#e7131a]" />
                <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/80">
                  Builder Community
                </span>
              </div>

              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[0.95] font-gilda-display text-white mb-6 animate-hero-delay-1">
                Meet the
                <br />
                <span className="text-[#e7131a]">Builders</span>
              </h1>

              <p className="font-ibm-plex-sans text-[16px] md:text-[18px] leading-relaxed text-white/70 max-w-md mb-8 animate-hero-delay-2">
                Discover talented AI creators pushing the boundaries. Connect with innovators building the future.
              </p>

              {/* Search Bar */}
              <form action="/builders" method="GET" className="max-w-md animate-hero-delay-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40" />
                  <input
                    type="text"
                    name="search"
                    defaultValue={searchQuery}
                    placeholder="Search builders..."
                    className="w-full pl-12 pr-4 py-4 bg-white border-0 font-ibm-plex-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-[#e7131a] placeholder:text-black/40"
                  />
                  {activeSpecialty && <input type="hidden" name="specialty" value={activeSpecialty} />}
                  {activeAvailability && <input type="hidden" name="availability" value={activeAvailability} />}
                </div>
              </form>

              {/* Quick stats */}
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/20 animate-hero-delay-3">
                <div>
                  <div className="text-[32px] font-gilda-display text-white">{totalBuilders}+</div>
                  <div className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/50">Builders</div>
                </div>
                <div>
                  <div className="text-[32px] font-gilda-display text-white">{specialties.length}</div>
                  <div className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/50">Specialties</div>
                </div>
              </div>
            </div>

            {/* Right - Featured Builder Preview */}
            {featuredBuilders[0] && !hasActiveFilters && (
              <div className="hidden lg:block animate-slide-left stagger-4">
                <BuilderCard builder={featuredBuilders[0] as any} variant="featured" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specialty Cards (when not filtering) */}
      {!hasActiveFilters && specialties.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white border-b border-[#e5e5e5]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.slice(0, 8).map((spec: any, index: number) => {
              const color = specialtyColors[spec.slug] || '#000'
              const staggerClass = `stagger-${index + 1}`
              return (
                <Link
                  key={spec.id}
                  href={`/builders?specialty=${spec.slug}`}
                  className={`group p-6 border border-[#e5e5e5] hover:border-black transition-all duration-200 animate-slide-up ${staggerClass}`}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Sparkles className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="font-gilda-display text-[16px] text-black group-hover:text-[#e7131a] transition-colors">
                    {spec.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-4 bg-white border-b border-[#e5e5e5] sticky top-14 md:top-16 lg:top-20 z-40">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {/* All Builders */}
          <Link
            href="/builders"
            className={`flex-shrink-0 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase border transition-all ${
              !hasActiveFilters
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/70 border-[#e5e5e5] hover:border-black hover:text-black'
            }`}
          >
            All Builders ({totalBuilders})
          </Link>

          {/* Specialty Filters */}
          {specialties.map((spec: any) => {
            const isActive = activeSpecialty === spec.slug
            const color = specialtyColors[spec.slug] || '#000'

            return (
              <Link
                key={spec.id}
                href={buildFilterUrl(resolvedParams, 'specialty', isActive ? null : spec.slug)}
                className={`flex-shrink-0 px-4 py-2 text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase border transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-white border-transparent'
                    : 'bg-white text-black/70 border-[#e5e5e5] hover:border-black hover:text-black'
                }`}
                style={isActive ? { backgroundColor: color } : {}}
              >
                {spec.title}
                {isActive && <X className="w-3 h-3 ml-1" />}
              </Link>
            )
          })}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <>
              <div className="w-px h-6 bg-[#e5e5e5] mx-2 flex-shrink-0" />
              <Link
                href="/builders"
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
            {activeSpecialty && (
              <Link
                href={buildFilterUrl(resolvedParams, 'specialty', null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e5] text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase hover:border-black transition-colors"
              >
                {activeSpecialty}
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

      {/* Featured Builders (only when not filtering) */}
      {!hasActiveFilters && featuredBuilders.length > 1 && (
        <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[28px] font-gilda-display text-black">Featured Builders</h2>
              <p className="text-[14px] font-ibm-plex-sans text-black/50 mt-1">
                Spotlight on exceptional creators
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBuilders.slice(0, 3).map((builder: any, index: number) => (
              <div key={builder.id} className={`animate-slide-up stagger-${index + 1}`}>
                <BuilderCard builder={builder} />
              </div>
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
              {hasActiveFilters ? 'Filtered Results' : 'All Builders'}
            </h2>
            <p className="text-[14px] font-ibm-plex-sans text-black/50 mt-1">
              {builders.length} {builders.length === 1 ? 'builder' : 'builders'} found
            </p>
          </div>
        </div>

        {/* Builders Grid */}
        {builders.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {builders.map((builder: any, index: number) => (
              <div key={builder.id} className={`animate-slide-up stagger-${Math.min(index + 1, 12)}`}>
                <BuilderCard builder={builder} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            type="builders"
            searchQuery={searchQuery}
            actionLabel="Clear Filters"
            actionHref="/builders"
          />
        )}
      </section>

      {/* Join CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="relative bg-black py-16 px-8 md:px-12 overflow-hidden">
          {/* Geometric accent */}
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-[#e7131a] opacity-90"
            style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
          />

          <div className="relative z-10 max-w-xl ml-auto text-right">
            <h2 className="text-[32px] md:text-[40px] font-gilda-display text-white mb-4">
              Are You an AI Builder?
            </h2>
            <p className="font-ibm-plex-sans text-[16px] text-white/70 mb-8">
              Join our community and showcase your AI-powered work to a global audience.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-[#e7131a] text-white px-6 py-3 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-[#c10e14] transition-colors"
            >
              Join as Builder
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
