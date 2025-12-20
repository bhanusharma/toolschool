import type { CollectionConfig } from 'payload'

export const UserSituations: CollectionConfig = {
  slug: 'user-situations',
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
        description: 'Emoji',
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
      name: 'accentColor',
      type: 'text',
      admin: {
        description: 'Accent color (hex)',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'painPoints',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'severity',
          type: 'select',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ],
        },
      ],
    },
    {
      name: 'goals',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'priority',
          type: 'select',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ],
        },
      ],
    },
    {
      name: 'experienceLevel',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'budgetRange',
      type: 'select',
      options: [
        { label: 'Free Only', value: 'free' },
        { label: 'Low ($1-25/mo)', value: 'low' },
        { label: 'Medium ($25-100/mo)', value: 'medium' },
        { label: 'High ($100+/mo)', value: 'high' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'timeAvailability',
      type: 'select',
      options: [
        { label: 'Minimal (< 5 hrs/week)', value: 'minimal' },
        { label: 'Moderate (5-15 hrs/week)', value: 'moderate' },
        { label: 'Dedicated (15+ hrs/week)', value: 'dedicated' },
      ],
      admin: {
        position: 'sidebar',
      },
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
