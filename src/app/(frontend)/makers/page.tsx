import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Search, MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

async function getMakersData(searchParams: { [key: string]: string | string[] | undefined }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const where: any = {}

  if (searchParams.specialty) {
    const specialty = await payload.find({
      collection: 'maker-specialties',
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

  const [makers, specialties] = await Promise.all([
    payload.find({
      collection: 'makers',
      limit: 50,
      sort: '-createdAt',
      where: Object.keys(where).length > 0 ? where : undefined,
    }),
    payload.find({
      collection: 'maker-specialties',
      limit: 20,
    }),
  ])

  return { makers: makers.docs, specialties: specialties.docs, totalMakers: makers.totalDocs }
}

const availabilityColors: Record<string, string> = {
  available: 'bg-green-500',
  selective: 'bg-yellow-500',
  unavailable: 'bg-gray-400',
  'open-source-only': 'bg-blue-500',
}

function MakerCard({ maker }: { maker: any }) {
  return (
    <Link href={`/makers/${maker.slug}`} className="group block">
      <div className="border border-[--color-border-light] overflow-hidden transition-all duration-200 group-hover:border-[--color-primary]">
        {/* Hero image area */}
        <div className="relative h-48 bg-gradient-to-br from-[--color-muted] to-[--color-border-light] group-hover:from-[--color-primary]/10 group-hover:to-[--color-primary]/5 transition-all duration-200">
          {/* Profile avatar */}
          <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-white border-4 border-white flex items-center justify-center text-xl font-bold font-display text-[--color-foreground]">
            {maker.title?.charAt(0)?.toUpperCase() || 'M'}
          </div>
          {/* Availability indicator */}
          {maker.availability && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-1.5">
              <div className={`w-2 h-2 rounded-full ${availabilityColors[maker.availability] || 'bg-gray-400'}`} />
              <span className="text-xs font-display uppercase tracking-wider">
                {maker.availability.replace('-', ' ')}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-12 pb-6 px-6">
          <h3 className="font-semibold font-display uppercase tracking-wide text-lg group-hover:text-[--color-primary] transition-colors">
            {maker.title}
          </h3>

          {maker.location && (
            <div className="flex items-center gap-1.5 mt-2 text-sm text-[--color-muted-foreground]">
              <MapPin className="h-3 w-3" />
              {maker.location}
            </div>
          )}

          {maker.bio && (
            <p className="mt-4 text-sm text-[--color-muted-foreground] line-clamp-3">
              {maker.bio}
            </p>
          )}

          {/* Specialties */}
          {maker.specialties && maker.specialties.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {maker.specialties.slice(0, 3).map((spec: any) => (
                <Badge key={spec.id || spec} variant="outline" className="text-[10px]">
                  {typeof spec === 'object' ? spec.title : spec}
                </Badge>
              ))}
              {maker.specialties.length > 3 && (
                <Badge variant="outline" className="text-[10px]">
                  +{maker.specialties.length - 3}
                </Badge>
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
        className={`px-4 py-2 text-xs font-medium font-display uppercase tracking-wider border transition-all duration-200 ${
          active
            ? 'bg-[--color-primary] text-white border-[--color-primary]'
            : 'bg-white text-[--color-foreground] border-[--color-border-light] hover:bg-[--color-primary] hover:text-white hover:border-[--color-primary]'
        }`}
      >
        {label}
        {count !== undefined && ` (${count})`}
        {active && <X className="inline-block ml-2 h-3 w-3" />}
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
  return queryString ? `/makers?${queryString}` : '/makers'
}

export default async function MakersPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams
  const { makers, specialties, totalMakers } = await getMakersData(resolvedParams)

  const activeSpecialty = resolvedParams.specialty as string | undefined
  const activeAvailability = resolvedParams.availability as string | undefined
  const searchQuery = resolvedParams.search as string | undefined

  const hasActiveFilters = activeSpecialty || activeAvailability || searchQuery

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-[--color-border-light] py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-wide">
            AI Makers
          </h1>
          <p className="mt-4 text-lg text-[--color-muted-foreground] max-w-2xl">
            Discover talented AI creators and connect with the community
          </p>

          {/* Search Bar */}
          <form action="/makers" method="GET" className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[--color-muted-foreground]" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search makers..."
                className="w-full pl-12 pr-4 py-4 border border-[--color-border-light] bg-white focus:outline-none focus:border-[--color-primary] font-display text-sm uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal"
              />
              {activeSpecialty && <input type="hidden" name="specialty" value={activeSpecialty} />}
              {activeAvailability && <input type="hidden" name="availability" value={activeAvailability} />}
            </div>
          </form>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-[--color-border-light] py-6 sticky top-16 bg-white z-40">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3">
            {/* All Makers */}
            <FilterPill
              label="All Makers"
              href="/makers"
              active={!hasActiveFilters}
              count={totalMakers}
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
                <div className="w-px h-6 bg-[--color-border-light] mx-2" />
                <Link href="/makers">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <X className="mr-1 h-3 w-3" />
                    Clear Filters
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 bg-[--color-muted]">
        <div className="container">
          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-[--color-muted-foreground] font-display uppercase tracking-wider">
              Showing {makers.length} {makers.length === 1 ? 'maker' : 'makers'}
              {hasActiveFilters && ' (filtered)'}
            </p>
          </div>

          {/* Makers Grid */}
          {makers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {makers.map((maker: any) => (
                <MakerCard key={maker.id} maker={maker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-[--color-border-light] bg-white">
              <p className="text-xl font-display uppercase tracking-wide">
                No makers found
              </p>
              <p className="mt-2 text-[--color-muted-foreground]">
                Try adjusting your filters or search query
              </p>
              <Button asChild className="mt-6">
                <Link href="/makers">Clear Filters</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
