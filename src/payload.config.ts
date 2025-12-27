import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'
import { searchPlugin } from '@payloadcms/plugin-search'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tools } from './collections/Tools'
import { Builders } from './collections/Builders'
import { Projects } from './collections/Projects'
import { Posts } from './collections/Posts'
import { Examples } from './collections/Examples'
import { Tutorials } from './collections/Tutorials'
import {
  ToolCategories,
  CreationTypes,
  BuilderSpecialties,
  CommunityTypes,
  NewsCategories,
  UserSituations,
} from './collections/taxonomies'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isCLI = process.argv.some((value) => value.match(/^(generate|migrate):?/)) ||
  process.argv.some((value) => value.includes('seed'))
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Core
    Users,
    Media,
    // Main Content
    Tools,
    Builders,
    Projects,
    Posts,
    Examples,
    Tutorials,
    // Taxonomies
    ToolCategories,
    CreationTypes,
    BuilderSpecialties,
    CommunityTypes,
    NewsCategories,
    UserSituations,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
    prodMigrations: migrations,
    // Disable automatic schema push in dev to avoid interactive migration prompts
    // This is needed when using remoteBindings: true with a production database
    push: false,
  }),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    searchPlugin({
      collections: ['tools', 'builders', 'projects', 'posts', 'tutorials'],
      defaultPriorities: {
        tools: 50,      // Highest priority - main content
        tutorials: 40,  // Educational content
        builders: 30,   // Creator profiles
        projects: 20,   // Community showcase
        posts: 10,      // News/articles
      },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        // Include excerpt/description for better search context
        excerpt: originalDoc?.tagline || originalDoc?.excerpt || originalDoc?.bio || '',
      }),
      searchOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'excerpt',
            type: 'textarea',
            admin: {
              position: 'sidebar',
            },
          },
        ],
      },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        // Use remote bindings to connect to production D1 database in development
        // This allows local dev to access the same data as production
        remoteBindings: true,
      } satisfies GetPlatformProxyOptions),
  )
}
