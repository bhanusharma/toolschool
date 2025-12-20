import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Search, Eye, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

async function getProjectsData(searchParams: { [key: string]: string | string[] | undefined }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const where: any = {}

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

  const [projects, communityTypes, featuredProject] = await Promise.all([
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
      limit: 1,
    }),
  ])

  return {
    projects: projects.docs,
    communityTypes: communityTypes.docs,
    totalProjects: projects.totalDocs,
    featuredProject: featuredProject.docs[0] || null,
  }
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="border border-[--color-border-light] overflow-hidden transition-all duration-200 group-hover:border-[--color-primary]">
        {/* Image placeholder */}
        <div className="aspect-video bg-gradient-to-br from-[--color-muted] to-[--color-border-light] group-hover:from-[--color-primary]/10 group-hover:to-[--color-primary]/5 transition-all duration-200 flex items-center justify-center">
          <span className="text-4xl font-bold font-display text-[--color-muted-foreground]/30">
            {project.title?.charAt(0)?.toUpperCase() || 'P'}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold font-display uppercase tracking-wide text-base group-hover:text-[--color-primary] transition-colors">
              {project.title}
            </h3>
            {project.views > 0 && (
              <div className="flex items-center gap-1 text-xs text-[--color-muted-foreground]">
                <Eye className="h-3 w-3" />
                {project.views}
              </div>
            )}
          </div>

          {project.excerpt && (
            <p className="text-sm text-[--color-muted-foreground] line-clamp-2 mb-4">
              {project.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {project.communityType && (
                <Badge variant="outline" className="text-[10px]">
                  {typeof project.communityType === 'object' ? project.communityType.title : project.communityType}
                </Badge>
              )}
              {project.projectYear && (
                <span className="text-xs text-[--color-muted-foreground]">{project.projectYear}</span>
              )}
            </div>
            {project.projectAuthor && (
              <span className="text-xs text-[--color-muted-foreground]">
                by {project.projectAuthor}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function FeaturedProject({ project }: { project: any }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[21/9] bg-gradient-to-br from-[--color-muted] to-[--color-border-light] border border-[--color-border-light] overflow-hidden group-hover:border-[--color-primary] transition-all duration-200">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
          <Badge variant="default" className="w-fit mb-4 bg-white text-black">
            Featured Project
          </Badge>
          <h2 className="text-2xl md:text-4xl font-bold font-display uppercase tracking-wide mb-3">
            {project.title}
          </h2>
          {project.excerpt && (
            <p className="text-white/80 text-lg max-w-2xl line-clamp-2 mb-4">
              {project.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-white/70">
            {project.projectAuthor && <span>by {project.projectAuthor}</span>}
            {project.projectYear && <span>{project.projectYear}</span>}
            {project.communityType && (
              <Badge variant="outline" className="border-white/30 text-white text-[10px]">
                {typeof project.communityType === 'object' ? project.communityType.title : project.communityType}
              </Badge>
            )}
          </div>
        </div>

        {/* View button */}
        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" className="bg-white text-black hover:bg-white/90">
            View Project <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
  return queryString ? `/projects?${queryString}` : '/projects'
}

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams
  const { projects, communityTypes, totalProjects, featuredProject } = await getProjectsData(resolvedParams)

  const activeType = resolvedParams.type as string | undefined
  const searchQuery = resolvedParams.search as string | undefined

  const hasActiveFilters = activeType || searchQuery

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-[--color-border-light] py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-wide">
            AI Projects
          </h1>
          <p className="mt-4 text-lg text-[--color-muted-foreground] max-w-2xl">
            Explore amazing creations made with AI tools by our community
          </p>

          {/* Search Bar */}
          <form action="/projects" method="GET" className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[--color-muted-foreground]" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search projects..."
                className="w-full pl-12 pr-4 py-4 border border-[--color-border-light] bg-white focus:outline-none focus:border-[--color-primary] font-display text-sm uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal"
              />
              {activeType && <input type="hidden" name="type" value={activeType} />}
            </div>
          </form>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && !hasActiveFilters && (
        <section className="py-8">
          <div className="container">
            <FeaturedProject project={featuredProject} />
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="border-b border-[--color-border-light] py-6 sticky top-16 bg-white z-40">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3">
            {/* All Projects */}
            <FilterPill
              label="All Projects"
              href="/projects"
              active={!hasActiveFilters}
              count={totalProjects}
            />

            {/* Type Filters */}
            {communityTypes.map((type: any) => (
              <FilterPill
                key={type.id}
                label={type.title}
                href={buildFilterUrl(
                  resolvedParams,
                  'type',
                  activeType === type.slug ? null : type.slug
                )}
                active={activeType === type.slug}
              />
            ))}

            {/* Clear All */}
            {hasActiveFilters && (
              <>
                <div className="w-px h-6 bg-[--color-border-light] mx-2" />
                <Link href="/projects">
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
              Showing {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              {hasActiveFilters && ' (filtered)'}
            </p>
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-[--color-border-light] bg-white">
              <p className="text-xl font-display uppercase tracking-wide">
                No projects found
              </p>
              <p className="mt-2 text-[--color-muted-foreground]">
                Try adjusting your filters or search query
              </p>
              <Button asChild className="mt-6">
                <Link href="/projects">Clear Filters</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
