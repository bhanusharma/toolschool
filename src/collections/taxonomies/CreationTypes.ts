import type { CollectionConfig } from 'payload'

export const CreationTypes: CollectionConfig = {
  slug: 'creation-types',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'icon'],
    group: 'Taxonomies',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
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
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Emoji or icon name',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      maxLength: 120,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Primary color (hex)',
      },
    },
    {
      name: 'gradientColor',
      type: 'text',
      admin: {
        description: 'Gradient end color (hex)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'examplePrompts',
      type: 'array',
      maxRows: 5,
      admin: {
        description: 'Example prompts for this creation type',
      },
      fields: [
        {
          name: 'prompt',
          type: 'text',
          required: true,
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      fields: [
        {
          name: 'toolCount',
          type: 'number',
          admin: {
            description: 'Number of tools in this category',
          },
        },
        {
          name: 'projectCount',
          type: 'number',
          admin: {
            description: 'Number of projects using this type',
          },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order (lower = first)',
      },
    },
  ],
}
