import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Search, MapPin, X } from 'lucide-react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

async function getBuildersData(searchParams: { [key: string]: string | string[] | undefined }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const where: any = {}

  if (searchParams.specialty) {
    const specialty = await payload.find({
      collection: 'builder-specialties',
      where: { slug: { equals: searchParams.specialty } },
      limit: 1,
    })
    if (specialty.docs.length > 0) {
      where['specialties'] = { contains: specialty.docs[0].id }
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

  const [builders, specialties] = await Promise.all([
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
  ])

  return { builders: builders.docs, specialties: specialties.docs, totalBuilders: builders.totalDocs }
}

const availabilityColors: Record<string, string> = {
  available: 'bg-green-500',
  selective: 'bg-yellow-500',
  unavailable: 'bg-gray-400',
  'open-source-only': 'bg-blue-500',
}

function BuilderCard({ builder }: { builder: any }) {
  const backgroundUrl = builder.backgroundImage?.url || null
  const profileUrl = builder.profileImage?.url || null

  return (
    <Link href={`/builders/${builder.slug}`} className="group block">
      <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-black">
        {/* Hero image area */}
        <div
          className="h-48 bg-center bg-cover bg-no-repeat relative"
          style={{
            backgroundImage: backgroundUrl
              ? `url('${backgroundUrl}')`
              : 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

          {/* Featured badge */}
          {builder.featured && (
            <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-[10px] font-medium tracking-[1px] uppercase">
              Featured
            </div>
          )}

          {/* Availability indicator */}
          {builder.availability && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-1.5">
              <div className={`w-2 h-2 rounded-full ${availabilityColors[builder.availability] || 'bg-gray-400'}`} />
              <span className="text-[10px] font-medium tracking-[1px] uppercase">
                {builder.availability.replace(/-/g, ' ')}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            {/* Profile image */}
            <div className="w-16 h-16 overflow-hidden border-2 border-gray-200 -mt-12 relative z-10 bg-white flex-shrink-0">
              {profileUrl ? (
                <Image
                  src={profileUrl}
                  alt={builder.profileImage?.alt || builder.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xl font-bold text-gray-600">
                  {builder.title?.charAt(0)?.toUpperCase() || 'B'}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[18px] tracking-[1px] uppercase text-black group-hover:text-[#e7131a] transition-colors truncate">
                {builder.title}
              </h3>
              {builder.location && (
                <div className="flex items-center gap-1.5 mt-1 text-[12px] text-gray-600">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{builder.location}</span>
                </div>
              )}
            </div>
          </div>

          {builder.bio && (
            <p className="text-[14px] text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {builder.bio}
            </p>
          )}

          {/* Specialties */}
          {builder.specialties && builder.specialties.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {builder.specialties.slice(0, 2).map((spec: any) => (
                <span
                  key={spec.id || spec}
                  className="inline-block px-3 py-1 bg-gray-100 border border-gray-300 text-[10px] font-medium tracking-[1px] uppercase text-gray-700"
                >
                  {typeof spec === 'object' ? spec.title : spec}
                </span>
              ))}
              {builder.specialties.length > 2 && (
                <span className="inline-block px-3 py-1 bg-gray-100 border border-gray-300 text-[10px] font-medium tracking-[1px] uppercase text-gray-700">
                  +{builder.specialties.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

function FilterPill({
  label,
  href,
  active,
  count,
}: {
  label: string
  href: string
  active: boolean
  count?: number
}) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-2 text-[12px] font-medium tracking-[1.2px] uppercase whitespace-nowrap transition-all duration-200 border flex items-center gap-2 ${
          active
            ? 'bg-black text-white border-black'
            : 'bg-white text-gray-700 border-gray-300 hover:border-black hover:bg-gray-50'
        }`}
      >
        {label}
        {count !== undefined && ` (${count})`}
        {active && <X className="h-3 w-3" />}
      </div>
    </Link>
  )
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
  const { builders, specialties, totalBuilders } = await getBuildersData(resolvedParams)

  const activeSpecialty = resolvedParams.specialty as string | undefined
  const activeAvailability = resolvedParams.availability as string | undefined
  const searchQuery = resolvedParams.search as string | undefined

  const hasActiveFilters = activeSpecialty || activeAvailability || searchQuery

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="relative bg-black py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#e7131a] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e7131a] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[2px] uppercase text-[#e7131a] mb-4">
              AI Builders Community
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display), serif' }}>
              Meet the Builders
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Discover talented AI builders pushing the boundaries of what&apos;s possible. Connect with the community building the future of AI-powered products and experiences.
            </p>

            {/* Search Bar */}
            <form action="/builders" method="GET" className="mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchQuery}
                  placeholder="Search builders by name, location, or bio..."
                  className="w-full pl-12 pr-4 py-4 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-[#e7131a] text-[14px] placeholder:text-gray-400"
                />
                {activeSpecialty && <input type="hidden" name="specialty" value={activeSpecialty} />}
                {activeAvailability && <input type="hidden" name="availability" value={activeAvailability} />}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-gray-200 py-6 sticky top-0 z-40">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3">
            {/* All Builders */}
            <FilterPill
              label="All Builders"
              href="/builders"
              active={!hasActiveFilters}
              count={totalBuilders}
            />

            {/* Specialty Filters */}
            {specialties.map((spec: any) => (
              <FilterPill
                key={spec.id}
                label={spec.title}
                href={buildFilterUrl(
                  resolvedParams,
                  'specialty',
                  activeSpecialty === spec.slug ? null : spec.slug
                )}
                active={activeSpecialty === spec.slug}
              />
            ))}

            {/* Clear All */}
            {hasActiveFilters && (
              <>
                <div className="w-px h-6 bg-gray-200 mx-2" />
                <Link
                  href="/builders"
                  className="text-[12px] font-medium text-gray-600 hover:text-black flex items-center gap-1 transition-colors"
                >
                  <X className="h-3 w-3" />
                  Clear Filters
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container">
          {/* Results count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-[14px] text-gray-600">
              Showing <span className="font-medium text-black">{builders.length}</span> {builders.length === 1 ? 'builder' : 'builders'}
              {hasActiveFilters && ' (filtered)'}
            </p>
            <p className="text-[12px] text-gray-500 uppercase tracking-wider">
              Sorted by recent
            </p>
          </div>

          {/* Builders Grid */}
          {builders.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {builders.map((builder: any) => (
                <BuilderCard key={builder.id} builder={builder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-gray-200">
              <p className="text-xl font-medium text-black mb-2">
                No builders found
              </p>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search query
              </p>
              <Link
                href="/builders"
                className="inline-block bg-black text-white px-6 py-3 text-[12px] font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Are You an AI Builder? */}
      <section className="bg-gradient-to-r from-[#e7131a] to-[#c10e14] py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display), serif' }}>
              Are You an AI Builder?
            </h2>
            <p className="text-[16px] text-white/80 mb-8 leading-relaxed">
              Join our community of innovative builders and showcase your AI-powered work to a global audience. Get discovered, collaborate, and grow.
            </p>
            <Link
              href="/join"
              className="inline-block bg-white text-[#e7131a] px-8 py-4 text-[14px] font-medium tracking-wider uppercase hover:bg-gray-100 transition-colors"
            >
              Join as Builder
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
