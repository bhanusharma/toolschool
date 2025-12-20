import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  ArrowLeft,
  MapPin,
  Globe,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Params = Promise<{ slug: string }>

async function getMakerBySlug(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'makers',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (result.docs.length === 0) {
    return null
  }

  return result.docs[0]
}

const socialIcons: Record<string, string> = {
  twitter: 'X',
  instagram: 'IG',
  linkedin: 'LI',
  github: 'GH',
  youtube: 'YT',
  dribbble: 'DR',
  behance: 'BE',
  other: '→',
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
  const maker = await getMakerBySlug(slug)

  if (!maker) {
    return { title: 'Maker Not Found' }
  }

  return {
    title: `${maker.title} - AI Maker`,
    description: maker.bio || `AI Maker profile for ${maker.title}`,
  }
}

export default async function MakerDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const maker = await getMakerBySlug(slug)

  if (!maker) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="border-b border-[--color-border-light] py-4">
        <div className="container">
          <Link
            href="/makers"
            className="inline-flex items-center text-sm font-display uppercase tracking-wider text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Makers
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[--color-border-light]">
        {/* Background */}
        <div className="h-48 md:h-64 bg-gradient-to-br from-[--color-muted] to-[--color-border-light]" />

        <div className="container">
          <div className="relative -mt-16 pb-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-white border-4 border-white flex items-center justify-center text-4xl font-bold font-display text-[--color-foreground] shadow-lg">
              {maker.title?.charAt(0)?.toUpperCase() || 'M'}
            </div>

            {/* Info */}
            <div className="mt-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-wide">
                  {maker.title}
                </h1>
                {maker.availability && (
                  <div className="flex items-center gap-2 px-4 py-2 border border-[--color-border-light]">
                    <div className={`w-2 h-2 rounded-full ${availabilityColors[maker.availability] || 'bg-gray-400'}`} />
                    <span className="text-sm font-display uppercase tracking-wider">
                      {availabilityLabels[maker.availability] || maker.availability}
                    </span>
                  </div>
                )}
              </div>

              {maker.location && (
                <div className="flex items-center gap-2 text-[--color-muted-foreground] mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{maker.location}</span>
                </div>
              )}

              {maker.bio && (
                <p className="text-lg text-[--color-muted-foreground] leading-relaxed">
                  {maker.bio}
                </p>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-4">
                {maker.website && (
                  <Button asChild>
                    <a href={maker.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                )}
                {maker.socialLinks && maker.socialLinks.length > 0 && (
                  <div className="flex gap-2">
                    {maker.socialLinks.map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 border border-[--color-border-light] font-display text-sm uppercase tracking-wider hover:bg-[--color-primary] hover:text-white hover:border-[--color-primary] transition-all"
                      >
                        {socialIcons[link.platform] || '→'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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
              {/* Specialties */}
              {maker.specialties && maker.specialties.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold font-display uppercase tracking-wider mb-6">
                    Specialties
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {maker.specialties.map((spec: any) => (
                      <Badge
                        key={spec.id || spec}
                        variant="outline"
                        className="px-4 py-2 text-sm"
                      >
                        {typeof spec === 'object' ? spec.title : spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Expertise */}
              {maker.toolsExpertise && maker.toolsExpertise.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold font-display uppercase tracking-wider mb-6">
                    Tools Expertise
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {maker.toolsExpertise.map((tool: any) => (
                      <Link
                        key={tool.id || tool}
                        href={`/tools/${typeof tool === 'object' ? tool.slug : tool}`}
                        className="group"
                      >
                        <div className="border border-[--color-border-light] p-4 transition-all duration-200 group-hover:bg-[--color-primary] group-hover:text-white group-hover:border-[--color-primary]">
                          <div className="flex items-center justify-between">
                            <span className="font-display uppercase tracking-wide text-sm">
                              {typeof tool === 'object' ? tool.title : tool}
                            </span>
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Experience Level */}
              {maker.experienceLevel && (
                <div className="border border-[--color-border-light] p-6">
                  <h3 className="text-sm font-semibold font-display uppercase tracking-wider mb-4">
                    Experience Level
                  </h3>
                  <p className="text-lg font-medium capitalize">{maker.experienceLevel}</p>
                </div>
              )}

              {/* Connect */}
              <div className="border border-[--color-border-light] p-6">
                <h3 className="text-sm font-semibold font-display uppercase tracking-wider mb-4">
                  Connect
                </h3>
                {maker.website && (
                  <a
                    href={maker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors mb-3"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="text-sm truncate">{maker.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
                {maker.socialLinks && maker.socialLinks.length > 0 && (
                  <div className="space-y-3">
                    {maker.socialLinks.map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
                      >
                        <span className="text-xs font-display uppercase tracking-wider w-8">
                          {socialIcons[link.platform] || '→'}
                        </span>
                        <span className="text-sm capitalize">{link.platform}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
