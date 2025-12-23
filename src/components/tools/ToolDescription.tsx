import type { Tool } from '@/payload-types'
import { RichText } from '@/components/RichText'

interface ToolDescriptionProps {
  tool: Tool
}

export function ToolDescription({ tool }: ToolDescriptionProps) {
  const hasRichContent = tool.content && Array.isArray(tool.content.root?.children) && tool.content.root.children.length > 0
  const hasHowItWorks = tool.howItWorks && Array.isArray(tool.howItWorks.root?.children) && tool.howItWorks.root.children.length > 0

  return (
    <section id="overview" className="bg-white border border-[#e5e5e5] p-8 lg:p-10">
      <h2 className="text-[28px] font-gilda-display text-black mb-6">
        About {tool.title}
      </h2>

      {/* Main Description */}
      {hasRichContent ? (
        <div className="prose prose-gray max-w-none font-ibm-plex-sans text-[16px] leading-relaxed">
          <RichText data={tool.content} />
        </div>
      ) : (
        <p className="font-ibm-plex-sans text-[16px] text-gray-700 leading-relaxed">
          {tool.excerpt || tool.tagline || `${tool.title} is an AI-powered tool designed for creative professionals and innovators.`}
        </p>
      )}

      {/* How It Works Section */}
      {hasHowItWorks && (
        <div className="mt-10 pt-8 border-t border-[#e5e5e5]">
          <h3 className="text-[22px] font-gilda-display text-black mb-5">
            How {tool.title} Works
          </h3>
          <div className="prose prose-gray max-w-none font-ibm-plex-sans text-[16px] leading-relaxed">
            <RichText data={tool.howItWorks} />
          </div>
        </div>
      )}

      {/* Best For / Who Should Use */}
      {tool.bestFor && tool.bestFor.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[#e5e5e5]">
          <h3 className="text-[22px] font-gilda-display text-black mb-5">
            Who Should Use {tool.title}?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.bestFor.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-[#f0fdf4] p-4 border-l-4 border-green-500">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-ibm-plex-sans text-[15px] font-medium text-gray-900">
                    {item.persona}
                  </p>
                  {item.reason && (
                    <p className="font-ibm-plex-sans text-[13px] text-gray-600 mt-1">
                      {item.reason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Who Should Not Use */}
      {tool.notIdealFor && tool.notIdealFor.length > 0 && (
        <div className="mt-8">
          <h4 className="text-[18px] font-gilda-display text-black mb-4">
            Not Ideal For
          </h4>
          <div className="space-y-3">
            {tool.notIdealFor.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-[#fef2f2] p-4 border-l-4 border-red-400">
                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-ibm-plex-sans text-[15px] font-medium text-gray-900">
                    {item.persona}
                  </p>
                  {item.reason && (
                    <p className="font-ibm-plex-sans text-[13px] text-gray-600 mt-1">
                      {item.reason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
