import type { CollectionConfig } from 'payload'

export const NewsCategories: CollectionConfig = {
  slug: 'news-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'color'],
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
      name: 'color',
      type: 'text',
      admin: {
        description: 'Badge color (hex)',
      },
    },
  ],
}
