import type { Tool, ToolCategory } from '@/payload-types'

interface ToolJsonLdProps {
  tool: Tool
}

export function ToolJsonLd({ tool }: ToolJsonLdProps) {
  const category = tool.toolCategory as ToolCategory | undefined
  const logoUrl = tool.logo && typeof tool.logo === 'object' && tool.logo.url
    ? tool.logo.url
    : tool.logoUrl || undefined

  // Build SoftwareApplication schema
  const softwareApp: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.excerpt || tool.tagline || `${tool.title} is an AI-powered tool.`,
    applicationCategory: 'AIApplication',
    url: tool.website,
    ...(logoUrl && { image: logoUrl }),
    ...(tool.stats?.company && {
      author: {
        '@type': 'Organization',
        name: tool.stats.company,
        ...(tool.stats.headquarters && { address: tool.stats.headquarters }),
      },
    }),
    ...(tool.platforms && tool.platforms.length > 0 && {
      operatingSystem: tool.platforms.map(p => {
        const platformMap: Record<string, string> = {
          web: 'Web Browser',
          ios: 'iOS',
          android: 'Android',
          mac: 'macOS',
          windows: 'Windows',
          linux: 'Linux',
          api: 'API',
          plugin: 'Browser Extension',
          discord: 'Discord',
          slack: 'Slack',
        }
        return platformMap[p] || p
      }).join(', '),
    }),
  }

  // Add pricing offers
  if (tool.pricingTiers && tool.pricingTiers.length > 0) {
    softwareApp.offers = tool.pricingTiers.map(tier => ({
      '@type': 'Offer',
      name: tier.name,
      price: tier.price?.replace(/[^0-9.]/g, '') || '0',
      priceCurrency: 'USD',
      ...(tier.billingPeriod === 'monthly' && { billingDuration: 'P1M' }),
      ...(tier.billingPeriod === 'yearly' && { billingDuration: 'P1Y' }),
      availability: 'https://schema.org/InStock',
    }))
  } else if (tool.pricingModel) {
    const priceMap: Record<string, { price: string; model: string }> = {
      free: { price: '0', model: 'Free' },
      freemium: { price: '0', model: 'Freemium' },
      paid: { price: '0', model: 'Paid' },
      custom: { price: '0', model: 'Contact for pricing' },
    }
    const pricing = priceMap[tool.pricingModel] || priceMap.free
    softwareApp.offers = {
      '@type': 'Offer',
      price: pricing.price,
      priceCurrency: 'USD',
      description: pricing.model,
    }
  }

  // Add aggregate rating
  if (tool.stats?.rating) {
    softwareApp.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: tool.stats.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: tool.stats.reviewCount || 1,
    }
  }

  // Add feature list
  if (tool.keyFeatures && tool.keyFeatures.length > 0) {
    softwareApp.featureList = tool.keyFeatures.map(f => f.title)
  }

  // Build FAQPage schema if FAQs exist
  let faqSchema: Record<string, unknown> | null = null
  if (tool.faqs && tool.faqs.length > 0) {
    faqSchema = {
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }
  }

  // Build Review schema if verdict exists
  let reviewSchema: Record<string, unknown> | null = null
  if (tool.expertVerdict || tool.ratings?.overall) {
    reviewSchema = {
      '@type': 'Review',
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: tool.title,
      },
      author: {
        '@type': 'Organization',
        name: 'ToolSchool',
        url: 'https://toolschool.io',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: tool.ratings?.overall || tool.stats?.rating || 4,
        bestRating: 5,
        worstRating: 1,
      },
      ...(tool.expertVerdict && { reviewBody: tool.expertVerdict }),
      ...(tool.verdictSummary && { description: tool.verdictSummary }),
      datePublished: tool.createdAt,
      dateModified: tool.updatedAt,
    }
  }

  // Build BreadcrumbList schema
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://toolschool.io',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Tools',
        item: 'https://toolschool.io/tools',
      },
      ...(category ? [{
        '@type': 'ListItem',
        position: 3,
        name: category.title,
        item: `https://toolschool.io/tools?category=${category.slug}`,
      }] : []),
      {
        '@type': 'ListItem',
        position: category ? 4 : 3,
        name: tool.title,
        item: `https://toolschool.io/tools/${tool.slug}`,
      },
    ],
  }

  // Build Organization schema for publisher
  const organizationSchema = {
    '@type': 'Organization',
    '@id': 'https://toolschool.io/#organization',
    name: 'ToolSchool',
    url: 'https://toolschool.io',
    logo: {
      '@type': 'ImageObject',
      url: 'https://toolschool.io/logo.png',
    },
    sameAs: [
      'https://twitter.com/toolschool',
      'https://www.linkedin.com/company/toolschool',
    ],
  }

  // Build WebPage schema
  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `https://toolschool.io/tools/${tool.slug}#webpage`,
    url: `https://toolschool.io/tools/${tool.slug}`,
    name: `${tool.title} Review 2025: Features, Pricing & Alternatives`,
    description: tool.excerpt || tool.tagline || `Comprehensive review of ${tool.title}`,
    isPartOf: {
      '@id': 'https://toolschool.io/#website',
    },
    about: {
      '@id': `https://toolschool.io/tools/${tool.slug}#software`,
    },
    datePublished: tool.createdAt,
    dateModified: tool.updatedAt,
    breadcrumb: {
      '@id': `https://toolschool.io/tools/${tool.slug}#breadcrumb`,
    },
    inLanguage: 'en-US',
    potentialAction: [{
      '@type': 'ReadAction',
      target: [`https://toolschool.io/tools/${tool.slug}`],
    }],
  }

  // Combine all schemas into @graph
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { ...softwareApp, '@id': `https://toolschool.io/tools/${tool.slug}#software` },
      { ...breadcrumbSchema, '@id': `https://toolschool.io/tools/${tool.slug}#breadcrumb` },
      organizationSchema,
      webPageSchema,
      ...(faqSchema ? [faqSchema] : []),
      ...(reviewSchema ? [reviewSchema] : []),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 0) }}
    />
  )
}
