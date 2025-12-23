import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'

// Force edge runtime and disable static generation
export const runtime = 'edge'
export const dynamic = 'force-dynamic'

interface SemanticSearchResult {
  id: string
  score: number
  metadata: {
    title: string
    slug: string
    type: string
    description?: string
    category?: string
    image?: string
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

  if (!query.trim()) {
    return NextResponse.json({
      results: [],
      query: '',
      total: 0,
    })
  }

  try {
    // Get Cloudflare context for Vectorize and AI bindings
    const context = await getCloudflareContext({ async: true })
    const { VECTORIZE, AI } = context.env

    if (!VECTORIZE || !AI) {
      // Fall back gracefully if bindings not available (local dev)
      return NextResponse.json({
        results: [],
        query,
        total: 0,
        error: 'Semantic search not available in this environment',
      })
    }

    // Generate embedding for the search query using Workers AI
    const embeddingResponse = await AI.run('@cf/baai/bge-base-en-v1.5', {
      text: [query],
    })

    // Type guard: check if it's the async response (no data) or the embedding response
    if (!('data' in embeddingResponse) || !embeddingResponse.data || embeddingResponse.data.length === 0) {
      return NextResponse.json({
        results: [],
        query,
        total: 0,
        error: 'Failed to generate embedding',
      })
    }

    const queryEmbedding = embeddingResponse.data[0]

    // Query Vectorize for similar vectors
    const searchResults = await VECTORIZE.query(queryEmbedding, {
      topK: limit,
      returnMetadata: 'all',
    })

    // Transform results
    const results: SemanticSearchResult[] = searchResults.matches.map((match) => ({
      id: match.id,
      score: match.score,
      metadata: match.metadata as SemanticSearchResult['metadata'],
    }))

    return NextResponse.json({
      results,
      query,
      total: results.length,
    })
  } catch (error) {
    console.error('Semantic search error:', error)
    return NextResponse.json(
      { error: 'Semantic search failed', results: [], query, total: 0 },
      { status: 500 }
    )
  }
}

// POST endpoint to index new content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body as {
      items: Array<{
        id: string
        title: string
        slug: string
        type: string
        description?: string
        category?: string
        image?: string
      }>
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items to index' }, { status: 400 })
    }

    // Get Cloudflare context
    const context = await getCloudflareContext({ async: true })
    const { VECTORIZE, AI } = context.env

    if (!VECTORIZE || !AI) {
      return NextResponse.json(
        { error: 'Vectorize not available in this environment' },
        { status: 503 }
      )
    }

    // Generate embeddings for all items
    const textsToEmbed = items.map((item) =>
      `${item.title}. ${item.description || ''}`
    )

    const embeddingResponse = await AI.run('@cf/baai/bge-base-en-v1.5', {
      text: textsToEmbed,
    })

    // Type guard for embedding response
    if (!('data' in embeddingResponse) || !embeddingResponse.data || embeddingResponse.data.length !== items.length) {
      return NextResponse.json(
        { error: 'Failed to generate embeddings' },
        { status: 500 }
      )
    }

    // Prepare vectors for upsert
    const vectors = items.map((item, index) => ({
      id: `${item.type}-${item.id}`,
      values: embeddingResponse.data![index],
      metadata: {
        title: item.title,
        slug: item.slug,
        type: item.type,
        description: item.description || '',
        category: item.category || '',
        image: item.image || '',
      },
    }))

    // Upsert vectors into Vectorize
    await VECTORIZE.upsert(vectors)

    return NextResponse.json({
      success: true,
      indexed: items.length,
    })
  } catch (error) {
    console.error('Index error:', error)
    return NextResponse.json(
      { error: 'Indexing failed' },
      { status: 500 }
    )
  }
}
