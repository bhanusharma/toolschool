import { ThumbsUp, ThumbsDown } from 'lucide-react'
import type { Tool } from '@/payload-types'

type ProItem = NonNullable<Tool['pros']>[number]
type ConItem = NonNullable<Tool['cons']>[number]
type BestForItem = NonNullable<Tool['bestFor']>[number]
type NotIdealForItem = NonNullable<Tool['notIdealFor']>[number]

interface ToolProsConsProps {
  pros?: ProItem[] | null
  cons?: ConItem[] | null
  bestFor?: BestForItem[] | null
  notIdealFor?: NotIdealForItem[] | null
}

export function ToolProsCons({ pros, cons }: ToolProsConsProps) {
  const hasPros = pros && pros.length > 0
  const hasCons = cons && cons.length > 0

  return (
    <section id="pros-cons" className="bg-white border border-[#e5e5e5] p-8 lg:p-10">
      <h2 className="text-[28px] font-gilda-display text-black mb-2">
        Pros & Cons
      </h2>
      <p className="font-ibm-plex-sans text-[15px] text-gray-500 mb-8">
        An honest assessment based on our testing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pros Column */}
        {hasPros && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="font-gilda-display text-[20px] text-black">
                What We Like
              </h3>
            </div>
            <ul className="space-y-4">
              {pros.map((pro, index) => (
                <li key={index} className="border-l-4 border-green-500 pl-4 py-1">
                  <p className="font-ibm-plex-sans text-[15px] font-medium text-gray-900">
                    {pro.title}
                  </p>
                  {pro.description && (
                    <p className="font-ibm-plex-sans text-[14px] text-gray-600 mt-1 leading-relaxed">
                      {pro.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cons Column */}
        {hasCons && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <ThumbsDown className="w-4 h-4 text-red-600" />
              </div>
              <h3 className="font-gilda-display text-[20px] text-black">
                What Could Be Better
              </h3>
            </div>
            <ul className="space-y-4">
              {cons.map((con, index) => (
                <li key={index} className="border-l-4 border-red-400 pl-4 py-1">
                  <p className="font-ibm-plex-sans text-[15px] font-medium text-gray-900">
                    {con.title}
                  </p>
                  {con.description && (
                    <p className="font-ibm-plex-sans text-[14px] text-gray-600 mt-1 leading-relaxed">
                      {con.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Summary Box */}
      <div className="mt-8 p-6 bg-[#f8f8f8]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {hasPros && (
            <div>
              <div className="text-[36px] font-gilda-display text-green-600">
                {pros.length}
              </div>
              <p className="font-ibm-plex-sans text-[13px] text-gray-500 uppercase tracking-wider">
                Advantages
              </p>
            </div>
          )}
          {hasCons && (
            <div>
              <div className="text-[36px] font-gilda-display text-red-500">
                {cons.length}
              </div>
              <p className="font-ibm-plex-sans text-[13px] text-gray-500 uppercase tracking-wider">
                Limitations
              </p>
            </div>
          )}
          {hasPros && hasCons && (
            <div>
              <div className="text-[36px] font-gilda-display text-[#e7131a]">
                {pros.length > cons.length ? '+' : ''}{pros.length - cons.length}
              </div>
              <p className="font-ibm-plex-sans text-[13px] text-gray-500 uppercase tracking-wider">
                Net Score
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
