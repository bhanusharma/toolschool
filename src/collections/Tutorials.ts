import type { CollectionConfig } from 'payload'

export const Tutorials: CollectionConfig = {
  slug: 'tutorials',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'difficulty', 'estimatedTime', 'featured', 'status'],
    group: 'Learning',
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
              name: 'subtitle',
              type: 'text',
              admin: {
                description: 'Brief description shown under the title',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              admin: {
                description: 'Summary for listing pages (2-3 sentences)',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'introduction',
              type: 'richText',
              admin: {
                description: 'Introduction section before the steps',
              },
            },
          ],
        },
        {
          label: 'Tutorial Steps',
          fields: [
            {
              name: 'steps',
              type: 'array',
              admin: {
                description: 'The main tutorial content broken into steps',
              },
              fields: [
                {
                  name: 'stepNumber',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Step number (e.g., 1, 2, 3)',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Step title (e.g., "Set Up Your Knowledge Base")',
                  },
                },
                {
                  name: 'estimatedMinutes',
                  type: 'number',
                  admin: {
                    description: 'Estimated time for this step in minutes',
                  },
                },
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'Main step content with instructions',
                  },
                },
                {
                  name: 'alternativeContent',
                  type: 'richText',
                  admin: {
                    description: 'Alternative instructions (e.g., for different tools)',
                  },
                },
                {
                  name: 'alternativeLabel',
                  type: 'text',
                  admin: {
                    description: 'Label for the alternative (e.g., "Using Airtable instead")',
                  },
                },
                {
                  name: 'tip',
                  type: 'textarea',
                  admin: {
                    description: 'Optional pro tip or helpful note',
                  },
                },
                {
                  name: 'warning',
                  type: 'textarea',
                  admin: {
                    description: 'Optional warning or common mistake',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Tools & Prerequisites',
          fields: [
            {
              name: 'toolsUsed',
              type: 'relationship',
              relationTo: 'tools',
              hasMany: true,
              admin: {
                description: 'Tools used in this tutorial (links to tool library)',
              },
            },
            {
              name: 'toolStack',
              type: 'array',
              admin: {
                description: 'Tool stack with roles (for display)',
              },
              fields: [
                {
                  name: 'role',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Role in the workflow (e.g., "Knowledge Base", "AI Reasoning")',
                  },
                },
                {
                  name: 'primaryTool',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Primary tool name (e.g., "Notion")',
                  },
                },
                {
                  name: 'alternativeTool',
                  type: 'text',
                  admin: {
                    description: 'Alternative tool option (e.g., "Airtable")',
                  },
                },
              ],
            },
            {
              name: 'prerequisites',
              type: 'array',
              admin: {
                description: 'What the user needs before starting',
              },
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'notionTemplateUrl',
              type: 'text',
              admin: {
                description: 'Notion template duplicate URL (e.g., https://www.notion.so/...?duplicate=true)',
              },
            },
          ],
        },
        {
          label: 'What\'s Next',
          fields: [
            {
              name: 'whatYouBuilt',
              type: 'textarea',
              admin: {
                description: 'Summary of what the user accomplished',
              },
            },
            {
              name: 'nextSteps',
              type: 'array',
              admin: {
                description: 'Suggested next steps or expansions',
              },
              fields: [
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
            {
              name: 'relatedTutorials',
              type: 'relationship',
              relationTo: 'tutorials',
              hasMany: true,
              admin: {
                description: 'Related tutorials to recommend',
              },
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
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
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
        description: 'Feature on the learn page',
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'estimatedTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Total estimated time in minutes',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Workflow Automation', value: 'workflow-automation' },
        { label: 'AI Agents', value: 'ai-agents' },
        { label: 'Content Creation', value: 'content-creation' },
        { label: 'Data & Analytics', value: 'data-analytics' },
        { label: 'Productivity', value: 'productivity' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
