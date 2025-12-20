import type { CollectionConfig } from 'payload'

export const ToolCategories: CollectionConfig = {
  slug: 'tool-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
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
        description: 'Lucide icon name (e.g., "type", "image", "video")',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color code (e.g., "#3B82F6")',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order (lower = first)',
      },
      defaultValue: 0,
    },
  ],
}
