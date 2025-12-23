import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'toolCategory', 'pricingModel', 'difficulty', 'featured'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Main Info Tab
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'tagline',
              type: 'text',
              maxLength: 120,
              admin: {
                description: 'Short one-liner (max 120 characters)',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              admin: {
                description: 'Brief summary for listings (150-160 chars ideal for meta description)',
              },
            },
            {
              name: 'content',
              type: 'richText',
              admin: {
                description: 'Full tool description (500+ words for SEO)',
              },
            },
            {
              name: 'howItWorks',
              type: 'richText',
              admin: {
                description: 'Technical overview of how the tool works',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Tool logo (min 200x200px)',
              },
            },
            {
              name: 'logoUrl',
              type: 'text',
              admin: {
                description: 'External logo URL (auto-populated from Clearbit)',
              },
            },
            {
              name: 'website',
              type: 'text',
              admin: {
                description: 'Official website URL',
              },
            },
          ],
        },
        {
          label: 'Pricing & Difficulty',
          fields: [
            {
              name: 'pricingModel',
              type: 'select',
              options: [
                { label: 'Free', value: 'free' },
                { label: 'Freemium', value: 'freemium' },
                { label: 'Paid', value: 'paid' },
                { label: 'Custom/Enterprise', value: 'custom' },
              ],
            },
            {
              name: 'pricingSummary',
              type: 'text',
              admin: {
                description: 'e.g., "Free tier available, Pro from $20/mo"',
              },
            },
            {
              name: 'pricingTiers',
              type: 'array',
              maxRows: 5,
              admin: {
                description: 'Detailed pricing breakdown for each tier',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Free", "Pro", "Team", "Enterprise"',
                  },
                },
                {
                  name: 'price',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "$0", "$20/mo", "$200/yr", "Custom"',
                  },
                },
                {
                  name: 'billingPeriod',
                  type: 'select',
                  options: [
                    { label: 'Free', value: 'free' },
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                    { label: 'One-time', value: 'one-time' },
                    { label: 'Custom', value: 'custom' },
                  ],
                },
                {
                  name: 'features',
                  type: 'array',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'limitations',
                  type: 'array',
                  fields: [
                    {
                      name: 'limitation',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'recommended',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Highlight as best value',
                  },
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  admin: {
                    description: 'e.g., "Get Started Free", "Start Trial"',
                  },
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  admin: {
                    description: 'Direct link to this pricing tier',
                  },
                },
              ],
            },
            {
              name: 'priceLastVerified',
              type: 'date',
              admin: {
                description: 'When pricing was last verified (shows freshness)',
              },
            },
            {
              name: 'difficulty',
              type: 'select',
              options: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
              ],
            },
          ],
        },
        {
          label: 'Capabilities',
          fields: [
            {
              name: 'useCases',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Writing', value: 'writing' },
                { label: 'Images', value: 'images' },
                { label: 'Video', value: 'video' },
                { label: 'Audio', value: 'audio' },
                { label: 'Code', value: 'code' },
                { label: 'Design', value: 'design' },
                { label: 'Data', value: 'data' },
                { label: 'Automation', value: 'automation' },
                { label: 'Education', value: 'education' },
                { label: 'Business', value: 'business' },
              ],
            },
            {
              name: 'platforms',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Web', value: 'web' },
                { label: 'iOS', value: 'ios' },
                { label: 'Android', value: 'android' },
                { label: 'Mac', value: 'mac' },
                { label: 'Windows', value: 'windows' },
                { label: 'Linux', value: 'linux' },
                { label: 'API', value: 'api' },
                { label: 'Plugin', value: 'plugin' },
                { label: 'Discord', value: 'discord' },
                { label: 'Slack', value: 'slack' },
              ],
            },
            {
              name: 'keyFeatures',
              type: 'array',
              maxRows: 10,
              admin: {
                description: 'Key features with detailed descriptions',
              },
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: 'Lucide icon name',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'useCase',
                  type: 'text',
                  admin: {
                    description: 'Specific use case for this feature',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'group',
              fields: [
                {
                  name: 'users',
                  type: 'text',
                  admin: {
                    description: 'e.g., "10M+", "500K"',
                  },
                },
                {
                  name: 'rating',
                  type: 'number',
                  min: 0,
                  max: 5,
                  admin: {
                    description: 'Rating out of 5',
                  },
                },
                {
                  name: 'reviewCount',
                  type: 'number',
                  admin: {
                    description: 'Number of reviews (for schema)',
                  },
                },
                {
                  name: 'company',
                  type: 'text',
                },
                {
                  name: 'launchYear',
                  type: 'number',
                  min: 2000,
                  max: 2030,
                },
                {
                  name: 'headquarters',
                  type: 'text',
                  admin: {
                    description: 'e.g., "San Francisco, CA"',
                  },
                },
                {
                  name: 'fundingRaised',
                  type: 'text',
                  admin: {
                    description: 'e.g., "$11.3B"',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Pros & Cons',
          description: 'Honest assessment for user trust and AEO',
          fields: [
            {
              name: 'pros',
              type: 'array',
              maxRows: 8,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Natural language understanding"',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Detailed explanation of this advantage',
                  },
                },
              ],
            },
            {
              name: 'cons',
              type: 'array',
              maxRows: 6,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Knowledge cutoff date"',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Honest explanation of this limitation',
                  },
                },
              ],
            },
            {
              name: 'bestFor',
              type: 'array',
              maxRows: 5,
              admin: {
                description: 'Who should use this tool',
              },
              fields: [
                {
                  name: 'persona',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Content Writers", "Developers"',
                  },
                },
                {
                  name: 'reason',
                  type: 'text',
                  admin: {
                    description: 'Why it is good for them',
                  },
                },
              ],
            },
            {
              name: 'notIdealFor',
              type: 'array',
              maxRows: 3,
              admin: {
                description: 'Who should NOT use this tool (builds trust)',
              },
              fields: [
                {
                  name: 'persona',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'reason',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Use Case Scenarios',
          description: 'Real-world scenarios for AEO optimization',
          fields: [
            {
              name: 'useCaseScenarios',
              type: 'array',
              maxRows: 8,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Writing Blog Posts"',
                  },
                },
                {
                  name: 'persona',
                  type: 'text',
                  admin: {
                    description: 'e.g., "Content Marketer"',
                  },
                },
                {
                  name: 'problem',
                  type: 'textarea',
                  admin: {
                    description: 'The challenge they face',
                  },
                },
                {
                  name: 'solution',
                  type: 'textarea',
                  admin: {
                    description: 'How the tool solves it',
                  },
                },
                {
                  name: 'outcome',
                  type: 'text',
                  admin: {
                    description: 'e.g., "10x faster content creation"',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          description: 'Common questions for featured snippets and AEO',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              maxRows: 15,
              admin: {
                description: 'Add 8-12 FAQs for schema markup and AEO',
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Question as users would search it',
                  },
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'Direct, comprehensive answer (50-300 words)',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Ratings & Verdict',
          description: 'Expert assessment for E-E-A-T signals',
          fields: [
            {
              name: 'ratings',
              type: 'group',
              fields: [
                {
                  name: 'overall',
                  type: 'number',
                  min: 1,
                  max: 5,
                  admin: {
                    description: 'Overall rating (1-5)',
                  },
                },
                {
                  name: 'easeOfUse',
                  type: 'number',
                  min: 1,
                  max: 5,
                  admin: {
                    description: 'Ease of Use rating (1-5)',
                  },
                },
                {
                  name: 'valueForMoney',
                  type: 'number',
                  min: 1,
                  max: 5,
                  admin: {
                    description: 'Value for Money rating (1-5)',
                  },
                },
                {
                  name: 'features',
                  type: 'number',
                  min: 1,
                  max: 5,
                  admin: {
                    description: 'Features rating (1-5)',
                  },
                },
                {
                  name: 'support',
                  type: 'number',
                  min: 1,
                  max: 5,
                  admin: {
                    description: 'Customer Support rating (1-5)',
                  },
                },
              ],
            },
            {
              name: 'expertVerdict',
              type: 'textarea',
              admin: {
                description: 'Final expert assessment (2-3 paragraphs)',
              },
            },
            {
              name: 'verdictSummary',
              type: 'text',
              maxLength: 200,
              admin: {
                description: 'One-line verdict for featured snippets',
              },
            },
          ],
        },
        {
          label: 'Alternatives',
          description: 'Competitor comparison for AEO',
          fields: [
            {
              name: 'alternatives',
              type: 'relationship',
              relationTo: 'tools',
              hasMany: true,
              maxRows: 5,
              admin: {
                description: 'Top alternatives to this tool',
              },
            },
            {
              name: 'comparisonNotes',
              type: 'textarea',
              admin: {
                description: 'Brief comparison guide (e.g., "Choose X over Y when...")',
              },
            },
          ],
        },
        {
          label: 'SEO',
          description: 'Search engine optimization settings',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              maxLength: 60,
              admin: {
                description: 'Custom SEO title (max 60 chars). Leave blank for auto-generated.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              maxLength: 160,
              admin: {
                description: 'Custom meta description (max 160 chars). Leave blank for auto-generated.',
              },
            },
            {
              name: 'focusKeyword',
              type: 'text',
              admin: {
                description: 'Primary keyword to optimize for (e.g., "ChatGPT review")',
              },
            },
            {
              name: 'secondaryKeywords',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                },
              ],
              admin: {
                description: 'Secondary keywords to target',
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Feature in discovery listings',
      },
    },
    {
      name: 'toolCategory',
      type: 'relationship',
      relationTo: 'tool-categories',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'creationTypes',
      type: 'relationship',
      relationTo: 'creation-types',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'userSituations',
      type: 'relationship',
      relationTo: 'user-situations',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
