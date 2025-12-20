import type { CollectionConfig } from 'payload'

export const CommunityTypes: CollectionConfig = {
  slug: 'community-types',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name',
      },
    },
  ],
}
