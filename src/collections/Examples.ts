import type { CollectionConfig } from 'payload'

export const Examples: CollectionConfig = {
  slug: 'examples',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'difficultyLevel', 'timeToCreate', 'creationType'],
    group: 'Content',
  },
  access: {
    read: () => true,
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
              name: 'tagline',
              type: 'text',
              maxLength: 120,
            },
            {
              name: 'content',
              type: 'richText',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'difficultyLevel',
                  type: 'select',
                  options: [
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Advanced', value: 'advanced' },
                  ],
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'timeToCreate',
                  type: 'select',
                  options: [
                    { label: '5 minutes', value: '5-minutes' },
                    { label: '10 minutes', value: '10-minutes' },
                    { label: '30 minutes', value: '30-minutes' },
                    { label: '1 hour', value: '1-hour' },
                    { label: '2-4 hours', value: '2-4-hours' },
                    { label: '1 day', value: '1-day' },
                    { label: 'Multiple days', value: 'multiple-days' },
                  ],
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'costRange',
                  type: 'select',
                  options: [
                    { label: 'Free', value: 'free' },
                    { label: 'Under $10', value: 'under-10' },
                    { label: '$10-25', value: '10-25' },
                    { label: '$25-50', value: '25-50' },
                    { label: '$50-100', value: '50-100' },
                    { label: 'Over $100', value: 'over-100' },
                  ],
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Creator & Tools',
          fields: [
            {
              name: 'creatorInfo',
              type: 'group',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description: 'e.g., "AI Artist", "Content Creator"',
                  },
                },
                {
                  name: 'website',
                  type: 'text',
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
                  name: 'purpose',
                  type: 'text',
                  admin: {
                    description: 'What was this tool used for?',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Process',
          fields: [
            {
              name: 'stepByStep',
              type: 'array',
              fields: [
                {
                  name: 'stepNumber',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'richText',
                },
              ],
            },
            {
              name: 'promptsUsed',
              type: 'array',
              fields: [
                {
                  name: 'tool',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'prompt',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Results',
          fields: [
            {
              name: 'beforeAfter',
              type: 'group',
              fields: [
                {
                  name: 'before',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'after',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'keyOutcomes',
              type: 'array',
              fields: [
                {
                  name: 'outcome',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'metric',
                  type: 'text',
                  admin: {
                    description: 'e.g., "50% time saved"',
                  },
                },
              ],
            },
            {
              name: 'lessonsLearned',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Resources',
          fields: [
            {
              name: 'downloadFiles',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
            {
              name: 'helpfulLinks',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
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
      name: 'creationType',
      type: 'relationship',
      relationTo: 'creation-types',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
