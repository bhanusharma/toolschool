import React, { type JSX } from 'react'
import Link from 'next/link'

interface RichTextNode {
  type?: string
  tag?: string
  format?: number | string
  text?: string
  children?: RichTextNode[]
  url?: string
  newTab?: boolean
  listType?: string
  value?: { url?: string; alt?: string }
  relationTo?: string
  indent?: number
}

interface RichTextProps {
  data: {
    root?: {
      children?: RichTextNode[]
    }
  } | null | undefined
}

export function RichText({ data }: RichTextProps) {
  if (!data?.root?.children) {
    return null
  }

  return (
    <div className="rich-text">
      {data.root.children.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  )
}

function RenderNode({ node }: { node: RichTextNode }) {
  // Handle text nodes
  if (node.type === 'text' || (!node.type && node.text !== undefined)) {
    let content: React.ReactNode = node.text

    // Handle text formatting
    if (typeof node.format === 'number') {
      if (node.format & 1) content = <strong>{content}</strong> // bold
      if (node.format & 2) content = <em>{content}</em> // italic
      if (node.format & 8) content = <u>{content}</u> // underline
      if (node.format & 4) content = <s>{content}</s> // strikethrough
      if (node.format & 16) content = <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[14px] font-mono">{content}</code> // code
    }

    return <>{content}</>
  }

  // Handle different node types
  switch (node.type) {
    case 'paragraph':
      return (
        <p className="mb-4 last:mb-0">
          {node.children?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </p>
      )

    case 'heading':
      const HeadingTag = (node.tag || 'h2') as keyof React.JSX.IntrinsicElements
      const headingClasses: Record<string, string> = {
        h1: 'text-[32px] font-gilda-display mb-6 mt-8 first:mt-0',
        h2: 'text-[24px] font-gilda-display mb-4 mt-6 first:mt-0',
        h3: 'text-[20px] font-gilda-display mb-3 mt-5 first:mt-0',
        h4: 'text-[18px] font-gilda-display mb-3 mt-4 first:mt-0',
        h5: 'text-[16px] font-ibm-plex-sans font-semibold mb-2 mt-4 first:mt-0',
        h6: 'text-[14px] font-ibm-plex-sans font-semibold mb-2 mt-3 first:mt-0',
      }
      return (
        <HeadingTag className={headingClasses[node.tag || 'h2'] || headingClasses.h2}>
          {node.children?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </HeadingTag>
      )

    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      const listClasses = node.listType === 'number'
        ? 'list-decimal pl-6 mb-4 space-y-2'
        : 'list-disc pl-6 mb-4 space-y-2'
      return (
        <ListTag className={listClasses}>
          {node.children?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </ListTag>
      )

    case 'listitem':
      return (
        <li className="pl-1">
          {node.children?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </li>
      )

    case 'link':
      const isExternal = node.url?.startsWith('http')
      if (isExternal) {
        return (
          <a
            href={node.url}
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
            className="text-[#e7131a] hover:underline"
          >
            {node.children?.map((child, index) => (
              <RenderNode key={index} node={child} />
            ))}
          </a>
        )
      }
      return (
        <Link href={node.url || '#'} className="text-[#e7131a] hover:underline">
          {node.children?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </Link>
      )

    case 'quote':
      return (
        <blockquote className="border-l-4 border-[#e7131a] pl-4 my-6 italic text-gray-600">
          {node.children?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </blockquote>
      )

    case 'upload':
      if (node.value?.url) {
        return (
          <figure className="my-6">
            <img
              src={node.value.url}
              alt={node.value.alt || ''}
              className="w-full"
            />
            {node.value.alt && (
              <figcaption className="text-center text-[13px] text-gray-500 mt-2">
                {node.value.alt}
              </figcaption>
            )}
          </figure>
        )
      }
      return null

    case 'horizontalrule':
      return <hr className="my-8 border-t border-[#e5e5e5]" />

    default:
      // Handle nested children for unknown types
      if (node.children) {
        return (
          <>
            {node.children.map((child, index) => (
              <RenderNode key={index} node={child} />
            ))}
          </>
        )
      }
      return null
  }
}
