import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'newsCategory', 'categoryBadge', 'createdAt'],
    group: 'Content',
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
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief summary for listings',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categoryBadge',
      type: 'select',
      options: [
        { label: 'TRENDING', value: 'trending' },
        { label: 'BREAKING', value: 'breaking' },
        { label: 'NEW RELEASE', value: 'new-release' },
        { label: 'ANALYSIS', value: 'analysis' },
        { label: 'INDUSTRY', value: 'industry' },
        { label: 'POLICY', value: 'policy' },
        { label: 'RESEARCH', value: 'research' },
        { label: 'TUTORIAL', value: 'tutorial' },
      ],
    },
    {
      name: 'publicationDateOverride',
      type: 'date',
      admin: {
        description: 'Override the default publication date',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
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
      name: 'newsCategory',
      type: 'relationship',
      relationTo: 'news-categories',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
