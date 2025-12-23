import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { TutorialProgress } from '@/components/TutorialProgress'
import { SocialShare } from '@/components/SocialShare'
import { CodeBlock } from '@/components/CodeBlock'

export const revalidate = 600 // 10 minutes ISR

// Calculate reading time based on word count (average 200 words per minute)
function calculateReadingTime(tutorial: Tutorial): number {
  let wordCount = 0

  // Count words in introduction
  if (tutorial.introduction?.root?.children) {
    wordCount += countWordsInContent(tutorial.introduction.root.children)
  }

  // Count words in steps
  tutorial.steps?.forEach(step => {
    if (step.content?.root?.children) {
      wordCount += countWordsInContent(step.content.root.children)
    }
    if (step.tip) wordCount += step.tip.split(/\s+/).length
    if (step.warning) wordCount += step.warning.split(/\s+/).length
  })

  // Count words in whatYouBuilt
  if (tutorial.whatYouBuilt) {
    wordCount += tutorial.whatYouBuilt.split(/\s+/).length
  }

  return Math.max(1, Math.ceil(wordCount / 200))
}

function countWordsInContent(nodes: any[]): number {
  let count = 0
  nodes.forEach(node => {
    if (node.text) {
      count += node.text.split(/\s+/).filter(Boolean).length
    }
    if (node.children) {
      count += countWordsInContent(node.children)
    }
  })
  return count
}

interface TutorialStep {
  stepNumber: number
  title: string
  estimatedMinutes?: number
  content?: any
  alternativeContent?: any
  alternativeLabel?: string
  tip?: string
  warning?: string
}

interface ToolStackItem {
  role: string
  primaryTool: string
  alternativeTool?: string
}

interface NextStep {
  title: string
  description?: string
}

interface Tutorial {
  id: number | string
  title: string
  subtitle?: string
  slug: string
  excerpt?: string
  featuredImage?: {
    url?: string
    alt?: string
  } | number
  introduction?: any
  steps?: TutorialStep[]
  toolStack?: ToolStackItem[]
  prerequisites?: Array<{ item: string }>
  notionTemplateUrl?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: number
  category?: string
  whatYouBuilt?: string
  nextSteps?: NextStep[]
  toolsUsed?: Array<{
    id: number | string
    title: string
    slug: string
    logo?: { url?: string } | number
  }> | number[]
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
}

// Render rich text content from Payload
function RenderRichText({ content, className = '' }: { content: any; className?: string }) {
  if (!content) return null

  if (typeof content === 'string') {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  }

  if (content.root?.children || Array.isArray(content)) {
    const nodes = content.root?.children || content

    return (
      <div className={`prose prose-lg max-w-none overflow-hidden ${className}`}>
        {nodes.map((node: any, index: number) => {
          if (node.type === 'paragraph') {
            const children = renderInlineContent(node.children)
            return <p key={index} className="mb-4 text-[16px] leading-[28px] text-black/80">{children}</p>
          }
          if (node.type === 'heading') {
            const text = node.children?.map((child: any) => child.text || '').join('') || ''
            if (node.tag === 'h2') {
              return <h2 key={index} className="font-gilda-display text-[24px] mt-8 mb-4 text-black">{text}</h2>
            }
            if (node.tag === 'h3') {
              return <h3 key={index} className="font-gilda-display text-[20px] mt-6 mb-3 text-black">{text}</h3>
            }
            return <h4 key={index} className="font-ibm-plex-sans font-semibold text-[18px] mt-5 mb-2 text-black">{text}</h4>
          }
          if (node.type === 'list') {
            const ListTag = node.listType === 'number' ? 'ol' : 'ul'
            const listClass = node.listType === 'number' ? 'list-decimal' : 'list-disc'
            return (
              <ListTag key={index} className={`mb-4 pl-6 ${listClass}`}>
                {node.children?.map((item: any, i: number) => (
                  <li key={i} className="mb-2 text-[16px] leading-[28px] text-black/80">
                    {renderInlineContent(item.children)}
                  </li>
                ))}
              </ListTag>
            )
          }
          if (node.type === 'code') {
            const code = node.children?.map((child: any) => child.text || '').join('') || ''
            return <CodeBlock key={index} code={code} />
          }
          // Default
          const text = node.children?.map((child: any) => child.text || '').join('') || node.text || ''
          return text ? <p key={index} className="mb-4 text-[16px] leading-[28px] text-black/80">{text}</p> : null
        })}
      </div>
    )
  }

  return null
}

function renderInlineContent(children: any[]): React.ReactNode {
  if (!children) return null
  return children.map((child: any, i: number) => {
    if (child.type === 'link') {
      const href = child.fields?.url || child.url || '#'
      const text = child.children?.map((c: any) => c.text || '').join('') || ''
      return <a key={i} href={href} className="text-[#e7131a] hover:underline" target="_blank" rel="noopener noreferrer">{text}</a>
    }
    if (child.bold) {
      return <strong key={i} className="font-semibold">{child.text}</strong>
    }
    if (child.italic) {
      return <em key={i}>{child.text}</em>
    }
    if (child.code) {
      return <code key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-[14px] font-mono">{child.text}</code>
    }
    return <span key={i}>{child.text || ''}</span>
  })
}

async function getTutorial(slug: string): Promise<Tutorial | null> {
  try {
    const payload = await getPayload({ config })
    const tutorials = await payload.find({
      collection: 'tutorials',
      where: {
        slug: { equals: slug }
      },
      depth: 2,
      limit: 1,
    })
    return tutorials.docs[0] as Tutorial || null
  } catch (error) {
    console.error('Failed to fetch tutorial:', error)
    return null
  }
}

function getImageUrl(tutorial: Tutorial): string | null {
  if (typeof tutorial.featuredImage !== 'object' || !tutorial.featuredImage?.url) {
    return null
  }
  return tutorial.featuredImage.url
}

// Check if URL is internal (needs unoptimized flag on Cloudflare Workers)
function isInternalUrl(url: string): boolean {
  return url.startsWith('/api/') || url.startsWith('/media/')
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tutorial = await getTutorial(slug)

  if (!tutorial) {
    notFound()
  }

  const _imageUrl = getImageUrl(tutorial)
  const totalSteps = tutorial.steps?.length || 0
  const readingTime = calculateReadingTime(tutorial)
  const tutorialUrl = `https://toolschool.ai/learn/${tutorial.slug}`

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Progress Indicator */}
      {tutorial.steps && tutorial.steps.length > 0 && (
        <TutorialProgress
          steps={tutorial.steps.map(s => ({ stepNumber: s.stepNumber, title: s.title }))}
          totalSteps={totalSteps}
        />
      )}

      {/* Hero Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] bg-black text-white">
          <div className="px-6 lg:px-12 py-12 lg:py-16">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[13px] font-ibm-plex-sans text-white/60 mb-6">
                <Link href="/learn" className="hover:text-white transition-colors">Learn</Link>
                <span>/</span>
                <span className="text-white/80">{tutorial.title}</span>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {tutorial.difficulty && (
                  <span className={`px-3 py-1 text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase border ${difficultyColors[tutorial.difficulty]}`}>
                    {tutorial.difficulty}
                  </span>
                )}
                {tutorial.estimatedTime && (
                  <span className="px-3 py-1 text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase bg-white/10 text-white border border-white/20">
                    {tutorial.estimatedTime} MINUTES
                  </span>
                )}
                {totalSteps > 0 && (
                  <span className="px-3 py-1 text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase bg-white/10 text-white border border-white/20">
                    {totalSteps} STEPS
                  </span>
                )}
                <span className="px-3 py-1 text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase bg-white/10 text-white border border-white/20">
                  {readingTime} MIN READ
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[32px] lg:text-[48px] leading-tight font-gilda-display mb-4">
                {tutorial.title}
              </h1>

              {/* Subtitle */}
              {tutorial.subtitle && (
                <p className="text-[18px] lg:text-[20px] text-white/80 font-ibm-plex-sans leading-relaxed">
                  {tutorial.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] bg-white">
          <div className="px-6 lg:px-12 py-12">
            <div className="grid lg:grid-cols-[1fr_320px] gap-12">
              {/* Left Column - Tutorial Content */}
              <div className="min-w-0">
                {/* Tool Stack */}
                {tutorial.toolStack && tutorial.toolStack.length > 0 && (
                  <div className="mb-10 p-6 bg-gray-50 border border-gray-200">
                    <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black/50 mb-4">
                      TOOL STACK
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {tutorial.toolStack.map((tool, index) => (
                        <div key={index} className="text-center p-4 bg-white border border-gray-100">
                          <div className="text-[12px] font-ibm-plex-sans text-black/50 mb-1">{tool.role}</div>
                          <div className="text-[16px] font-ibm-plex-sans font-medium text-black">{tool.primaryTool}</div>
                          {tool.alternativeTool && (
                            <div className="text-[13px] font-ibm-plex-sans text-black/50 mt-1">or {tool.alternativeTool}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Introduction */}
                {tutorial.introduction && (
                  <div className="mb-12">
                    <RenderRichText content={tutorial.introduction} className="font-ibm-plex-sans" />
                  </div>
                )}

                {/* Tutorial Steps */}
                {tutorial.steps && tutorial.steps.length > 0 && (
                  <div className="space-y-12">
                    {tutorial.steps.map((step, index) => (
                      <div key={index} id={`step-${step.stepNumber}`} className="scroll-mt-24">
                        {/* Step Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="flex-shrink-0 w-12 h-12 bg-black text-white flex items-center justify-center font-ibm-plex-sans-condensed text-[18px] font-bold">
                            {step.stepNumber}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-[24px] lg:text-[28px] font-gilda-display text-black">
                              {step.title}
                            </h2>
                            {step.estimatedMinutes && (
                              <span className="text-[13px] font-ibm-plex-sans text-black/50">
                                ~{step.estimatedMinutes} minutes
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="pl-16">
                          <RenderRichText content={step.content} className="font-ibm-plex-sans" />

                          {/* Tip */}
                          {step.tip && (
                            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500">
                              <div className="flex items-start gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-blue-600 mt-0.5">
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="M12 16v-4M12 8h.01" />
                                </svg>
                                <div>
                                  <div className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-blue-800 mb-1">Pro Tip</div>
                                  <p className="text-[14px] font-ibm-plex-sans text-blue-900">{step.tip}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Warning */}
                          {step.warning && (
                            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500">
                              <div className="flex items-start gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-amber-600 mt-0.5">
                                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                  <line x1="12" y1="9" x2="12" y2="13" />
                                  <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <div>
                                  <div className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-amber-800 mb-1">Watch Out</div>
                                  <p className="text-[14px] font-ibm-plex-sans text-amber-900">{step.warning}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Alternative */}
                          {step.alternativeContent && step.alternativeLabel && (
                            <details className="mt-6 group">
                              <summary className="cursor-pointer text-[14px] font-ibm-plex-sans-condensed tracking-wider uppercase text-black/60 hover:text-black flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-open:rotate-90 transition-transform">
                                  <polyline points="9 18 15 12 9 6" />
                                </svg>
                                {step.alternativeLabel}
                              </summary>
                              <div className="mt-4 pl-6 border-l-2 border-gray-200">
                                <RenderRichText content={step.alternativeContent} className="font-ibm-plex-sans" />
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* What You Built */}
                {tutorial.whatYouBuilt && (
                  <div className="mt-16 p-8 bg-green-50 border border-green-200">
                    <div className="flex items-start gap-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-green-600">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <div>
                        <h3 className="font-gilda-display text-[24px] text-green-900 mb-2">
                          What You Built
                        </h3>
                        <p className="text-[16px] font-ibm-plex-sans text-green-800">
                          {tutorial.whatYouBuilt}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                {tutorial.nextSteps && tutorial.nextSteps.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-gilda-display text-[24px] text-black mb-6">
                      What&apos;s Next
                    </h3>
                    <div className="space-y-4">
                      {tutorial.nextSteps.map((step, index) => (
                        <div key={index} className="p-4 bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
                          <h4 className="font-ibm-plex-sans font-medium text-[16px] text-black mb-1">
                            {step.title}
                          </h4>
                          {step.description && (
                            <p className="text-[14px] font-ibm-plex-sans text-black/60">
                              {step.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Share */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-ibm-plex-sans text-black/60">
                      Found this helpful? Share it with others!
                    </p>
                    <SocialShare title={tutorial.title} url={tutorialUrl} />
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar (sticky) */}
              <aside>
                <div className="lg:sticky lg:top-6">
                {/* Notion Template Button */}
                {tutorial.notionTemplateUrl && (
                  <div className="mb-8">
                    <a
                      href={tutorial.notionTemplateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full bg-black text-white px-6 py-4 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase hover:bg-[#e7131a] transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      Duplicate Notion Template
                    </a>
                    <p className="text-[12px] font-ibm-plex-sans text-black/50 text-center mt-2">
                      Get started faster with our pre-built template
                    </p>
                  </div>
                )}

                {/* Prerequisites */}
                {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
                  <div className="mb-8 p-6 bg-gray-50 border border-gray-200">
                    <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black/50 mb-4">
                      BEFORE YOU START
                    </h3>
                    <ul className="space-y-2">
                      {tutorial.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2 text-[14px] font-ibm-plex-sans text-black/80">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-green-600 mt-0.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {prereq.item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Step Navigation */}
                {tutorial.steps && tutorial.steps.length > 0 && (
                  <div className="mb-8 p-6 bg-gray-50 border border-gray-200">
                    <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black/50 mb-4">
                      STEPS
                    </h3>
                    <nav className="space-y-2">
                      {tutorial.steps.map((step) => (
                        <a
                          key={step.stepNumber}
                          href={`#step-${step.stepNumber}`}
                          className="flex items-center gap-3 text-[14px] font-ibm-plex-sans text-black/70 hover:text-black transition-colors"
                        >
                          <span className="w-6 h-6 bg-black/10 flex items-center justify-center text-[12px] font-medium">
                            {step.stepNumber}
                          </span>
                          <span className="line-clamp-1">{step.title}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Tools Used */}
                {tutorial.toolsUsed && Array.isArray(tutorial.toolsUsed) && tutorial.toolsUsed.length > 0 && (
                  <div className="p-6 bg-gray-50 border border-gray-200">
                    <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-black/50 mb-4">
                      TOOLS IN THIS TUTORIAL
                    </h3>
                    <div className="space-y-3">
                      {tutorial.toolsUsed.map((tool: any) => {
                        if (typeof tool === 'number') return null
                        const toolLogo = typeof tool.logo === 'object' ? tool.logo?.url : null
                        return (
                          <Link
                            key={tool.id}
                            href={`/tools/${tool.slug}`}
                            className="flex items-center gap-3 text-[14px] font-ibm-plex-sans text-black/70 hover:text-black transition-colors"
                          >
                            {toolLogo ? (
                              <Image src={toolLogo} alt={tool.title} width={24} height={24} className="rounded" unoptimized={isInternalUrl(toolLogo)} />
                            ) : (
                              <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">
                                {tool.title.charAt(0)}
                              </div>
                            )}
                            {tool.title}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Learn */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] bg-white px-6 lg:px-12 py-8 border-t border-black/10">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase text-black hover:text-[#e7131a] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Tutorials
          </Link>
        </div>
      </div>
    </div>
  )
}
