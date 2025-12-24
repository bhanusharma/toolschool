import { Globe, Apple, Smartphone, Monitor, Code, Puzzle, MessageCircle, Hash } from 'lucide-react'
import type { Tool, ToolCategory } from '@/payload-types'

interface ToolQuickFactsProps {
  tool: Tool
  category?: ToolCategory
}

const platformIcons: Record<string, React.ReactNode> = {
  web: <Globe className="w-4 h-4" />,
  ios: <Apple className="w-4 h-4" />,
  android: <Smartphone className="w-4 h-4" />,
  mac: <Monitor className="w-4 h-4" />,
  windows: <Monitor className="w-4 h-4" />,
  linux: <Monitor className="w-4 h-4" />,
  api: <Code className="w-4 h-4" />,
  plugin: <Puzzle className="w-4 h-4" />,
  discord: <MessageCircle className="w-4 h-4" />,
  slack: <Hash className="w-4 h-4" />,
}

const platformLabels: Record<string, string> = {
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
  mac: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  api: 'API',
  plugin: 'Plugin',
  discord: 'Discord',
  slack: 'Slack',
}

export function ToolQuickFacts({ tool }: ToolQuickFactsProps) {
  // Build quick facts for AI snippets
  const quickFacts = [
    {
      question: `What is ${tool.title}?`,
      answer: tool.tagline || tool.excerpt || `${tool.title} is an AI-powered tool.`,
    },
    ...(tool.stats?.company ? [{
      question: `Who makes ${tool.title}?`,
      answer: `${tool.title} is developed by ${tool.stats.company}${tool.stats.headquarters && !tool.stats.headquarters.includes('_') ? `, headquartered in ${tool.stats.headquarters}` : ''}.`,
    }] : []),
    ...(tool.pricingModel ? [{
      question: `How much does ${tool.title} cost?`,
      answer: tool.pricingSummary || getPricingAnswer(tool),
    }] : []),
    ...(tool.useCases && tool.useCases.length > 0 ? [{
      question: `What can you do with ${tool.title}?`,
      answer: `${tool.title} is used for ${tool.useCases.map(uc => uc.toLowerCase()).join(', ')}.`,
    }] : []),
    ...(tool.bestFor && tool.bestFor.length > 0 ? [{
      question: `Who should use ${tool.title}?`,
      answer: `${tool.title} is ideal for ${tool.bestFor.map(b => b.persona.toLowerCase()).join(', ')}.`,
    }] : []),
  ]

  return (
    <div className="w-full flex justify-center bg-white border-b border-[#e5e5e5]">
      <div className="w-full max-w-[1440px] px-6 lg:px-12 py-8">
        {/* Quick Facts Grid - Optimized for AI Snippets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickFacts.slice(0, 6).map((fact, index) => (
            <div key={index} className="bg-[#f8f8f8] p-5">
              <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-gray-500 mb-2">
                {fact.question}
              </h3>
              <p className="font-ibm-plex-sans text-[14px] text-gray-800 leading-relaxed">
                {fact.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Platforms Strip */}
        {tool.platforms && tool.platforms.length > 0 && (
          <div className="mt-6 pt-6 border-t border-[#e5e5e5]">
            <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-gray-500 mb-4">
              Available On
            </h3>
            <div className="flex flex-wrap gap-3">
              {tool.platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#f8f8f8] border border-[#e5e5e5] font-ibm-plex-sans text-[13px] text-gray-700"
                >
                  {platformIcons[platform] || <Globe className="w-4 h-4" />}
                  {platformLabels[platform] || platform}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases Strip */}
        {tool.useCases && tool.useCases.length > 0 && (
          <div className="mt-6 pt-6 border-t border-[#e5e5e5]">
            <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-gray-500 mb-4">
              Use Cases
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.useCases.map((useCase) => (
                <span
                  key={useCase}
                  className="inline-block px-4 py-2 bg-[#f6f4f1] font-ibm-plex-sans-condensed text-[12px] tracking-[0.5px] uppercase text-gray-600"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function getPricingAnswer(tool: Tool): string {
  const model = tool.pricingModel
  if (!model) return ''

  switch (model) {
    case 'free':
      return `${tool.title} is completely free to use.`
    case 'freemium':
      return `${tool.title} offers a free tier with premium plans available for additional features.`
    case 'paid':
      return `${tool.title} is a paid tool. Check the pricing section for current rates.`
    case 'custom':
      return `${tool.title} offers custom enterprise pricing. Contact them for a quote.`
    default:
      return ''
  }
}
