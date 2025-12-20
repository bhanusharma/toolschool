/**
 * Fetch tools from WordPress GraphQL and save as JSON
 * Run with: npx tsx scripts/fetch-wp-tools.ts
 */

const GRAPHQL_ENDPOINT = 'https://vibemakeprod.wpenginepowered.com/graphql'

const TOOL_FRAGMENT = `
  fragment ToolFragment on Tool {
    id
    databaseId
    title
    slug
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    toolCategories {
      nodes {
        id
        name
        slug
        description
      }
    }
    toolFields {
      toolTagline
      toolWebsite
      toolFeatured
      toolPricingModel
      toolPricingSummary
      toolDifficulty
      toolUseCases
      toolPlatforms
      toolLogo {
        node {
          sourceUrl
          altText
          mediaItemUrl
        }
      }
      toolKeyFeatures {
        featureIcon
        featureTitle
        featureDescription
      }
      toolStats {
        statUsers
        statRating
        statCompany
        statYear
      }
    }
  }
`

const GET_ALL_TOOLS = `
  query GetAllTools($first: Int = 100) {
    tools(first: $first) {
      nodes {
        ...ToolFragment
      }
    }
  }
  ${TOOL_FRAGMENT}
`

interface WPTool {
  id: string
  databaseId: number
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  toolCategories?: {
    nodes: Array<{
      id: string
      name: string
      slug: string
      description: string
    }>
  }
  toolFields?: {
    toolTagline?: string
    toolWebsite?: string
    toolFeatured?: boolean
    toolPricingModel?: string
    toolPricingSummary?: string
    toolDifficulty?: string
    toolUseCases?: string[]
    toolPlatforms?: string[]
    toolLogo?: {
      node: {
        sourceUrl: string
        altText: string
        mediaItemUrl: string
      }
    }
    toolKeyFeatures?: Array<{
      featureIcon?: string
      featureTitle: string
      featureDescription: string
    }>
    toolStats?: {
      statUsers?: string
      statRating?: string
      statCompany?: string
      statYear?: string
    }
  }
}

async function fetchAllTools(): Promise<WPTool[]> {
  console.log('Fetching tools from WordPress GraphQL endpoint...')
  console.log('Endpoint:', GRAPHQL_ENDPOINT)

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_ALL_TOOLS,
      variables: { first: 100 },
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (data.errors) {
    console.error('GraphQL errors:', data.errors)
    throw new Error('GraphQL query failed')
  }

  return data.data?.tools?.nodes || []
}

async function main() {
  try {
    const tools = await fetchAllTools()
    console.log(`\nFetched ${tools.length} tools\n`)

    // Save to JSON file
    const fs = await import('fs/promises')
    const path = await import('path')

    const outputPath = path.join(process.cwd(), 'scripts', 'data', 'wp-tools.json')

    // Create data directory if it doesn't exist
    await fs.mkdir(path.dirname(outputPath), { recursive: true })

    await fs.writeFile(outputPath, JSON.stringify(tools, null, 2))
    console.log(`Saved to ${outputPath}`)

    // Print summary
    console.log('\n=== TOOLS SUMMARY ===')
    tools.forEach((tool, index) => {
      const categories = tool.toolCategories?.nodes?.map((c) => c.name).join(', ') || 'None'
      console.log(`${index + 1}. ${tool.title} [${categories}]`)
    })
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()
