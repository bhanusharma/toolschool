'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import type { Tool } from '@/payload-types'

type FAQ = NonNullable<Tool['faqs']>[number]

interface ToolFAQProps {
  faqs: FAQ[]
  toolName: string
}

export function ToolFAQ({ faqs, toolName }: ToolFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="bg-white border border-[#e5e5e5] p-8 lg:p-10">
      <div className="flex items-start gap-3 mb-8">
        <div className="w-10 h-10 bg-[#e7131a10] rounded-full flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-5 h-5 text-[#e7131a]" />
        </div>
        <div>
          <h2 className="text-[28px] font-gilda-display text-black">
            Frequently Asked Questions
          </h2>
          <p className="font-ibm-plex-sans text-[15px] text-gray-500">
            Common questions about {toolName}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border transition-colors ${
              openIndex === index ? 'border-[#e7131a] bg-[#fafafa]' : 'border-[#e5e5e5]'
            }`}
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[#fafafa] transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-ibm-plex-sans text-[15px] font-medium text-gray-900 pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-[#e7131a] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5">
                <div className="pt-3 border-t border-[#e5e5e5]">
                  <p className="font-ibm-plex-sans text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Answers Summary for AI/Search */}
      <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
        <h3 className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-gray-400 mb-4">
          Quick Answers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.slice(0, 4).map((faq, index) => (
            <div key={index} className="bg-[#f8f8f8] p-4">
              <p className="font-ibm-plex-sans text-[13px] font-medium text-gray-700 mb-1">
                {faq.question}
              </p>
              <p className="font-ibm-plex-sans text-[12px] text-gray-500 line-clamp-2">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
