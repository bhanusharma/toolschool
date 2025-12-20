import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'

// Hook to handle unique featured positions for makers
const handleFeaturedPosition: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  if (operation === 'create' || operation === 'update') {
    const payload = req.payload

    // If featured is being disabled, clear the position
    if (data.featured === false) {
      data.featuredPosition = null
      return data
    }

    // If featured with a position, check for conflicts
    if (data.featured === true && data.featuredPosition) {
      const currentId = originalDoc?.id

      // Find any maker with the same position (excluding current)
      const conflicts = await payload.find({
        collection: 'makers',
        where: {
          and: [
            { featuredPosition: { equals: data.featuredPosition } },
            { featured: { equals: true } },
            ...(currentId ? [{ id: { not_equals: currentId } }] : []),
          ],
        },
      })

      // If conflict exists, find next available position
      if (conflicts.docs.length > 0) {
        const allFeatured = await payload.find({
          collection: 'makers',
          where: {
            featured: { equals: true },
          },
          limit: 10,
        })

        const usedPositions = allFeatured.docs
          .filter((m) => m.id !== currentId)
          .map((m) => m.featuredPosition)
          .filter(Boolean)

        // Find first available position 1-10
        for (let pos = 1; pos <= 10; pos++) {
          if (!usedPositions.includes(pos)) {
            data.featuredPosition = pos
            break
          }
        }

        // If all positions taken, unfeature the oldest conflict
        if (usedPositions.length >= 10) {
          const oldestConflict = conflicts.docs[0]
          await payload.update({
            collection: 'makers',
            id: oldestConflict.id,
            data: { featured: false, featuredPosition: null },
          })
        }
      }
    }
  }

  return data
}

export const Makers: CollectionConfig = {
  slug: 'makers',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'specialties', 'featured'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [handleFeaturedPosition],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              name: 'title',
              label: 'Name',
              type: 'text',
              required: true,
            },
            {
              name: 'bio',
              type: 'textarea',
              admin: {
                description: 'Short biography',
              },
            },
            {
              name: 'content',
              type: 'richText',
              admin: {
                description: 'Full profile description',
              },
            },
            {
              name: 'location',
              type: 'text',
              admin: {
                description: 'City, Country',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'profileImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'website',
              type: 'text',
            },
          ],
        },
        {
          label: 'Professional',
          fields: [
            {
              name: 'experienceLevel',
              type: 'select',
              options: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
                { label: 'Expert', value: 'expert' },
              ],
            },
            {
              name: 'toolsExpertise',
              type: 'relationship',
              relationTo: 'tools',
              hasMany: true,
              admin: {
                description: 'AI tools this maker uses',
              },
            },
            {
              name: 'availability',
              type: 'select',
              options: [
                { label: 'Available for Work', value: 'available' },
                { label: 'Selective Projects', value: 'selective' },
                { label: 'Not Available', value: 'unavailable' },
                { label: 'Open Source Only', value: 'open-source-only' },
              ],
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
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Dribbble', value: 'dribbble' },
                    { label: 'Behance', value: 'behance' },
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
      name: 'specialties',
      type: 'relationship',
      relationTo: 'maker-specialties',
      hasMany: true,
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
        description: 'Feature in homepage slider',
      },
    },
    {
      name: 'featuredPosition',
      type: 'number',
      min: 1,
      max: 10,
      admin: {
        position: 'sidebar',
        description: 'Position in featured slider (1-10)',
        condition: (data) => data.featured,
      },
    },
  ],
}
