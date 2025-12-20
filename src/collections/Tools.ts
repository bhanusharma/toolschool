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
                description: 'Brief summary for listings',
              },
            },
            {
              name: 'content',
              type: 'richText',
              admin: {
                description: 'Full tool description',
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
              maxRows: 6,
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
                  name: 'company',
                  type: 'text',
                },
                {
                  name: 'launchYear',
                  type: 'number',
                  min: 2000,
                  max: 2030,
                },
              ],
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature in discovery listings',
      },
    },
    {
      name: 'toolCategory',
      type: 'relationship',
      relationTo: 'tool-categories',
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
