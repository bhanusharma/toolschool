import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'

// Hook to ensure only one project is featured in hero at a time
const ensureSingleFeatured: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation === 'create' || operation === 'update') {
    const payload = req.payload

    // If this project is being set as featured in hero, unfeature all others
    if (data.featuredInHero === true) {
      await payload.update({
        collection: 'projects',
        where: {
          featuredInHero: { equals: true },
        },
        data: {
          featuredInHero: false,
        },
      })
    }

    // If this project is being set as featured in showcase, unfeature all others
    if (data.featuredInShowcase === true) {
      await payload.update({
        collection: 'projects',
        where: {
          featuredInShowcase: { equals: true },
        },
        data: {
          featuredInShowcase: false,
        },
      })
    }
  }

  return data
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'communityType', 'projectAuthor', 'views'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [ensureSingleFeatured],
  },
  fields: [
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
              name: 'excerpt',
              type: 'textarea',
            },
            {
              name: 'content',
              type: 'richText',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'featuredImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'heroBackground',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Project Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'projectYear',
                  type: 'number',
                  min: 2000,
                  max: 2030,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'projectAuthor',
                  type: 'text',
                  admin: {
                    width: '75%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'projectUrl',
                  type: 'text',
                  admin: {
                    width: '33%',
                    description: 'Live project URL',
                  },
                },
                {
                  name: 'demoUrl',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'githubUrl',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
            {
              name: 'workflow',
              type: 'textarea',
              admin: {
                description: 'Describe the creation process',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'difficulty',
                  type: 'select',
                  options: [
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Advanced', value: 'advanced' },
                    { label: 'Expert', value: 'expert' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'timeSpent',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'e.g., "2 hours", "3 days"',
                  },
                },
              ],
            },
            {
              name: 'toolsUsed',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'category',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
                {
                  name: 'usage',
                  type: 'textarea',
                  admin: {
                    description: 'How this tool was used',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'duration',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'For audio/video (e.g., "2:39")',
                  },
                },
                {
                  name: 'genre',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'audioFile',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'videoFile',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'mediaGallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'Other', value: 'other' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    // Sidebar
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
      name: 'communityType',
      type: 'relationship',
      relationTo: 'community-types',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'featuredInHero',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature in homepage hero',
      },
    },
    {
      name: 'featuredInShowcase',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature in showcase section',
      },
    },
  ],
}
