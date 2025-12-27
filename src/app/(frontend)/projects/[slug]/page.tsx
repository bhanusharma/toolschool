import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Clock,
  Calendar,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Force dynamic rendering - D1 database not available during static build in CI
export const dynamic = 'force-dynamic'

type Params = Promise<{ slug: string }>

async function getProjectBySlug(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (result.docs.length === 0) {
    return null
  }

  const project = result.docs[0]

  // Get related projects
  let relatedProjects: any[] = []
  if (project.communityType) {
    const typeId = typeof project.communityType === 'object' ? project.communityType.id : project.communityType
    const related = await payload.find({
      collection: 'projects',
      where: {
        and: [
          { communityType: { equals: typeId } },
          { id: { not_equals: project.id } },
        ],
      },
      limit: 3,
    })
    relatedProjects = related.docs
  }

  return { project, relatedProjects }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const data = await getProjectBySlug(slug)

  if (!data) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${data.project.title} - AI Project`,
    description: data.project.excerpt || `AI Project by ${data.project.projectAuthor}`,
  }
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const data = await getProjectBySlug(slug)

  if (!data) {
    notFound()
  }

  const { project, relatedProjects } = data

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="border-b border-[--color-border-light] py-4">
        <div className="container">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-display uppercase tracking-wider text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[--color-border-light]">
        {/* Featured image placeholder */}
        <div className="aspect-video bg-gradient-to-br from-[--color-muted] to-[--color-border-light] flex items-center justify-center">
          <span className="text-6xl font-bold font-display text-[--color-muted-foreground]/30">
            {project.title?.charAt(0)?.toUpperCase() || 'P'}
          </span>
        </div>

        <div className="container py-8">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {project.communityType && (
                <Badge variant="outline">
                  {typeof project.communityType === 'object' ? project.communityType.title : project.communityType}
                </Badge>
              )}
              {project.difficulty && (
                <Badge variant="outline" className="capitalize">
                  {project.difficulty}
                </Badge>
              )}
              {project.views > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-[--color-muted-foreground]">
                  <Eye className="h-4 w-4" />
                  {project.views} views
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-wide">
              {project.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 mt-6 text-[--color-muted-foreground]">
              {project.projectAuthor && (
                <span>by <strong className="text-[--color-foreground]">{project.projectAuthor}</strong></span>
              )}
              {project.projectYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {project.projectYear}
                </div>
              )}
              {project.timeSpent && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {project.timeSpent}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              {project.projectUrl && (
                <Button asChild>
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="outline" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              {project.excerpt && (
                <div>
                  <h2 className="text-lg font-semibold font-display uppercase tracking-wider mb-4">
                    About This Project
                  </h2>
                  <p className="text-[--color-muted-foreground] leading-relaxed text-lg">
                    {project.excerpt}
                  </p>
                </div>
              )}

              {/* Workflow */}
              {project.workflow && (
                <div>
                  <h2 className="text-lg font-semibold font-display uppercase tracking-wider mb-4">
                    Creation Process
                  </h2>
                  <p className="text-[--color-muted-foreground] leading-relaxed">
                    {project.workflow}
                  </p>
                </div>
              )}

              {/* Tools Used */}
              {project.toolsUsed && project.toolsUsed.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold font-display uppercase tracking-wider mb-6">
                    <Wrench className="inline-block mr-2 h-5 w-5" />
                    Tools Used
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.toolsUsed.map((tool: any, index: number) => (
                      <div key={index} className="border border-[--color-border-light] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium font-display uppercase tracking-wide text-sm">
                            {tool.name}
                          </h4>
                          {tool.url && (
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        {tool.category && (
                          <Badge variant="outline" className="text-[10px] mb-2">
                            {tool.category}
                          </Badge>
                        )}
                        {tool.usage && (
                          <p className="text-sm text-[--color-muted-foreground]">
                            {tool.usage}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Project Details */}
              <div className="border border-[--color-border-light] p-6">
                <h3 className="text-sm font-semibold font-display uppercase tracking-wider mb-6">
                  Project Details
                </h3>
                <div className="space-y-5">
                  {project.projectAuthor && (
                    <div>
                      <p className="text-xs font-display uppercase tracking-wider text-[--color-muted-foreground]">
                        Creator
                      </p>
                      <p className="font-semibold mt-1">{project.projectAuthor}</p>
                    </div>
                  )}
                  {project.projectYear && (
                    <div>
                      <p className="text-xs font-display uppercase tracking-wider text-[--color-muted-foreground]">
                        Year
                      </p>
                      <p className="font-semibold mt-1">{project.projectYear}</p>
                    </div>
                  )}
                  {project.communityType && (
                    <div>
                      <p className="text-xs font-display uppercase tracking-wider text-[--color-muted-foreground]">
                        Category
                      </p>
                      <Link href={`/projects?type=${typeof project.communityType === 'object' ? project.communityType.slug : project.communityType}`}>
                        <Badge variant="outline" className="mt-2 cursor-pointer hover:bg-[--color-muted]">
                          {typeof project.communityType === 'object' ? project.communityType.title : project.communityType}
                        </Badge>
                      </Link>
                    </div>
                  )}
                  {project.difficulty && (
                    <div>
                      <p className="text-xs font-display uppercase tracking-wider text-[--color-muted-foreground]">
                        Difficulty
                      </p>
                      <p className="font-semibold mt-1 capitalize">{project.difficulty}</p>
                    </div>
                  )}
                  {project.timeSpent && (
                    <div>
                      <p className="text-xs font-display uppercase tracking-wider text-[--color-muted-foreground]">
                        Time Spent
                      </p>
                      <p className="font-semibold mt-1">{project.timeSpent}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Links */}
              {(project.projectUrl || project.demoUrl || project.githubUrl) && (
                <div className="border border-[--color-border-light] p-6">
                  <h3 className="text-sm font-semibold font-display uppercase tracking-wider mb-4">
                    Links
                  </h3>
                  <div className="space-y-3">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm truncate">View Project</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm truncate">Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm truncate">GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-[--color-muted]">
          <div className="container">
            <h2 className="text-2xl font-bold font-display uppercase tracking-wide mb-8">
              Related Projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject: any) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`} className="group block">
                  <div className="border border-[--color-border-light] overflow-hidden transition-all duration-200 group-hover:border-[--color-primary]">
                    <div className="aspect-video bg-gradient-to-br from-[--color-muted] to-[--color-border-light] flex items-center justify-center">
                      <span className="text-3xl font-bold font-display text-[--color-muted-foreground]/30">
                        {relatedProject.title?.charAt(0)?.toUpperCase() || 'P'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold font-display uppercase tracking-wide text-sm group-hover:text-[--color-primary] transition-colors">
                        {relatedProject.title}
                      </h3>
                      {relatedProject.projectAuthor && (
                        <p className="text-xs text-[--color-muted-foreground] mt-1">
                          by {relatedProject.projectAuthor}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
