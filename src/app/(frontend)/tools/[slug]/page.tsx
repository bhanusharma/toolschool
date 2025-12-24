import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ToolDetailHero } from '@/components/tools/ToolDetailHero'
import { ToolQuickFacts } from '@/components/tools/ToolQuickFacts'
import { ToolDescription } from '@/components/tools/ToolDescription'
import { ToolFeatures } from '@/components/tools/ToolFeatures'
import { ToolPricing } from '@/components/tools/ToolPricing'
import { ToolProsCons } from '@/components/tools/ToolProsCons'
import { ToolUseCases } from '@/components/tools/ToolUseCases'
import { ToolFAQ } from '@/components/tools/ToolFAQ'
import { ToolVerdict } from '@/components/tools/ToolVerdict'
import { ToolAlternatives } from '@/components/tools/ToolAlternatives'
import { ToolRelated } from '@/components/tools/ToolRelated'
import { ToolJsonLd } from '@/components/tools/ToolJsonLd'
import type { Tool, ToolCategory } from '@/payload-types'

type Params = Promise<{ slug: string }>

// Fetch tool data with all relationships
async function getToolBySlug(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'tools',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2, // Get nested relationships
  })

  if (result.docs.length === 0) {
    return null
  }

  const tool = result.docs[0] as Tool

  // Get related tools (same category)
  let relatedTools: Tool[] = []
  if (tool.toolCategory) {
    const categoryId = typeof tool.toolCategory === 'object'
      ? tool.toolCategory.id
      : tool.toolCategory

    const related = await payload.find({
      collection: 'tools',
      where: {
        and: [
          { toolCategory: { equals: categoryId } },
          { id: { not_equals: tool.id } },
        ],
      },
      limit: 4,
      depth: 1,
    })
    relatedTools = related.docs as Tool[]
  }

  // Get alternatives if specified
  let alternatives: Tool[] = []
  if (tool.alternatives && tool.alternatives.length > 0) {
    const alternativeIds = tool.alternatives.map((alt: Tool | number) =>
      typeof alt === 'object' ? alt.id : alt
    )
    const altResult = await payload.find({
      collection: 'tools',
      where: { id: { in: alternativeIds } },
      depth: 1,
    })
    alternatives = altResult.docs as Tool[]
  }

  return { tool, relatedTools, alternatives }
}

// Generate static params for SSG
export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const tools = await payload.find({
    collection: 'tools',
    limit: 100,
    select: { slug: true },
  })

  return tools.docs.map((tool) => ({
    slug: tool.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const data = await getToolBySlug(slug)

  if (!data) {
    return {
      title: 'Tool Not Found',
      robots: { index: false, follow: false },
    }
  }

  const { tool } = data
  const category = tool.toolCategory as ToolCategory | undefined

  // Build comprehensive title
  const title = tool.metaTitle ||
    `${tool.title} Review 2025: Features, Pricing & Alternatives | ToolSchool`

  // Build comprehensive description
  const description = tool.metaDescription ||
    tool.excerpt ||
    `${tool.title} is ${tool.tagline || 'an AI-powered tool'}. Read our in-depth review covering features, pricing, pros & cons, and top alternatives.`

  // Keywords from various sources
  const keywords = [
    tool.title,
    `${tool.title} review`,
    `${tool.title} pricing`,
    `${tool.title} alternatives`,
    tool.focusKeyword,
    ...(tool.secondaryKeywords?.map(k => k.keyword) || []),
    ...(tool.useCases || []),
    category?.title,
    'AI tool',
  ].filter(Boolean) as string[]

  // Construct canonical URL
  const canonicalUrl = `https://toolschool.io/tools/${slug}`

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'ToolSchool Team' }],
    creator: 'ToolSchool',
    publisher: 'ToolSchool',

    // Open Graph
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ToolSchool',
      type: 'article',
      images: tool.logo && typeof tool.logo === 'object' && tool.logo.url ? [
        {
          url: tool.logo.url,
          width: 200,
          height: 200,
          alt: `${tool.title} logo`,
        },
      ] : tool.logoUrl ? [
        {
          url: tool.logoUrl,
          width: 200,
          height: 200,
          alt: `${tool.title} logo`,
        },
      ] : undefined,
    },

    // Twitter
    twitter: {
      card: 'summary',
      title,
      description,
      images: tool.logo && typeof tool.logo === 'object' && tool.logo.url
        ? [tool.logo.url]
        : tool.logoUrl
          ? [tool.logoUrl]
          : undefined,
    },

    // Canonical and alternates
    alternates: {
      canonical: canonicalUrl,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },

    // Other
    other: {
      'article:published_time': tool.createdAt,
      'article:modified_time': tool.updatedAt,
      'article:section': category?.title || 'AI Tools',
    },
  }
}

export default async function ToolDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const data = await getToolBySlug(slug)

  if (!data) {
    notFound()
  }

  const { tool, relatedTools, alternatives } = data
  const category = tool.toolCategory as ToolCategory | undefined

  // Check what content is available
  const hasFeatures = tool.keyFeatures && tool.keyFeatures.length > 0
  const hasPricingTiers = tool.pricingTiers && tool.pricingTiers.length > 0
  const hasPros = tool.pros && tool.pros.length > 0
  const hasCons = tool.cons && tool.cons.length > 0
  const hasUseCaseScenarios = tool.useCaseScenarios && tool.useCaseScenarios.length > 0
  const hasFaqs = tool.faqs && tool.faqs.length > 0
  const hasVerdict = tool.expertVerdict || tool.ratings?.overall
  const hasAlternatives = alternatives && alternatives.length > 0
  const hasRelated = relatedTools && relatedTools.length > 0

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ToolJsonLd tool={tool} />

      <div className="min-h-screen bg-[#f8f8f8]">
        {/* Hero Section with Quick Stats */}
        <ToolDetailHero tool={tool} category={category} />

        {/* Quick Facts Panel - For AI Snippets */}
        <ToolQuickFacts tool={tool} category={category} />

        {/* Main Content Area */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">

              {/* Main Content Column (2/3) */}
              <div className="lg:col-span-2 space-y-12">
                {/* About / Description */}
                <ToolDescription tool={tool} />

                {/* Key Features */}
                {hasFeatures && <ToolFeatures features={tool.keyFeatures!} />}

                {/* Pricing Breakdown */}
                {(hasPricingTiers || tool.pricingSummary) && (
                  <ToolPricing
                    tiers={tool.pricingTiers}
                    summary={tool.pricingSummary}
                    model={tool.pricingModel}
                    lastVerified={tool.priceLastVerified}
                    website={tool.website}
                  />
                )}

                {/* Pros & Cons */}
                {(hasPros || hasCons) && (
                  <ToolProsCons
                    pros={tool.pros}
                    cons={tool.cons}
                    bestFor={tool.bestFor}
                    notIdealFor={tool.notIdealFor}
                  />
                )}

                {/* Use Case Scenarios */}
                {hasUseCaseScenarios && (
                  <ToolUseCases scenarios={tool.useCaseScenarios!} toolName={tool.title} />
                )}

                {/* FAQ Section */}
                {hasFaqs && <ToolFAQ faqs={tool.faqs!} toolName={tool.title} />}

                {/* Expert Verdict */}
                {hasVerdict && (
                  <ToolVerdict
                    verdict={tool.expertVerdict}
                    summary={tool.verdictSummary}
                    ratings={tool.ratings}
                    toolName={tool.title}
                  />
                )}
              </div>

              {/* Sidebar Column (1/3) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* CTA Card */}
                  <div className="bg-white border border-[#e5e5e5] p-6">
                    <div className="text-center mb-6">
                      {tool.stats?.rating != null && !isNaN(Number(tool.stats.rating)) && (
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.round(Number(tool.stats!.rating!))
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="font-ibm-plex-sans text-[14px] text-gray-600">
                            {Number(tool.stats.rating).toFixed(1)}/5
                          </span>
                        </div>
                      )}
                      {tool.stats?.users && (
                        <p className="font-ibm-plex-sans text-[13px] text-gray-500">
                          {tool.stats.users} users
                        </p>
                      )}
                    </div>

                    {tool.website && (
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block w-full bg-[#e7131a] text-white text-center py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase transition-colors hover:bg-[#c10e14]"
                      >
                        Try {tool.title} Free
                      </a>
                    )}

                    <p className="text-center font-ibm-plex-sans text-[12px] text-gray-400 mt-3">
                      No credit card required
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white border border-[#e5e5e5] p-6">
                    <h3 className="font-gilda-display text-[16px] mb-4">On This Page</h3>
                    <nav className="space-y-2">
                      <a href="#overview" className="block font-ibm-plex-sans text-[13px] text-gray-600 hover:text-[#e7131a]">Overview</a>
                      {hasFeatures && <a href="#features" className="block font-ibm-plex-sans text-[13px] text-gray-600 hover:text-[#e7131a]">Key Features</a>}
                      {(hasPricingTiers || tool.pricingSummary) && <a href="#pricing" className="block font-ibm-plex-sans text-[13px] text-gray-600 hover:text-[#e7131a]">Pricing</a>}
                      {(hasPros || hasCons) && <a href="#pros-cons" className="block font-ibm-plex-sans text-[13px] text-gray-600 hover:text-[#e7131a]">Pros & Cons</a>}
                      {hasUseCaseScenarios && <a href="#use-cases" className="block font-ibm-plex-sans text-[13px] text-gray-600 hover:text-[#e7131a]">Use Cases</a>}
                      {hasFaqs && <a href="#faq" className="block font-ibm-plex-sans text-[13px] text-gray-600 hover:text-[#e7131a]">FAQ</a>}
                      {hasVerdict && <a href="#verdict" className="block font-ibm-plex-sans text-[13px] text-gray-600 hover:text-[#e7131a]">Verdict</a>}
                      {hasAlternatives && <a href="#alternatives" className="block font-ibm-plex-sans text-[13px] text-gray-600 hover:text-[#e7131a]">Alternatives</a>}
                    </nav>
                  </div>

                  {/* Company Info */}
                  {tool.stats?.company && (
                    <div className="bg-white border border-[#e5e5e5] p-6">
                      <h3 className="font-gilda-display text-[16px] mb-4">Company Info</h3>
                      <dl className="space-y-3 font-ibm-plex-sans text-[13px]">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Company</dt>
                          <dd className="text-gray-900">{tool.stats.company}</dd>
                        </div>
                        {tool.stats.launchYear && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Founded</dt>
                            <dd className="text-gray-900">{tool.stats.launchYear}</dd>
                          </div>
                        )}
                        {tool.stats.headquarters && !tool.stats.headquarters.includes('_') && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500">HQ</dt>
                            <dd className="text-gray-900">{tool.stats.headquarters}</dd>
                          </div>
                        )}
                        {tool.stats.fundingRaised && !tool.stats.fundingRaised.includes('_') && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Funding</dt>
                            <dd className="text-gray-900">{tool.stats.fundingRaised}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternatives Section */}
        {hasAlternatives && (
          <ToolAlternatives
            alternatives={alternatives}
            comparisonNotes={tool.comparisonNotes}
            currentTool={tool.title}
          />
        )}

        {/* Related Tools Section */}
        {hasRelated && (
          <ToolRelated
            tools={relatedTools}
            category={category}
          />
        )}
      </div>
    </>
  )
}
