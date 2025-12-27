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
      <div className="mt-10 pt-8 border-t border-[#e5e5e5]">
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {hasPros && (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-green-100 flex items-center justify-center">
                <span className="text-[24px] font-gilda-display text-green-600">
                  {pros.length}
                </span>
              </div>
              <div>
                <p className="font-ibm-plex-sans text-[14px] font-medium text-gray-900">Advantages</p>
                <p className="font-ibm-plex-sans text-[12px] text-gray-500">identified</p>
              </div>
            </div>
          )}
          {hasCons && (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-red-100 flex items-center justify-center">
                <span className="text-[24px] font-gilda-display text-red-500">
                  {cons.length}
                </span>
              </div>
              <div>
                <p className="font-ibm-plex-sans text-[14px] font-medium text-gray-900">Limitations</p>
                <p className="font-ibm-plex-sans text-[12px] text-gray-500">noted</p>
              </div>
            </div>
          )}
          {hasPros && hasCons && (
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 flex items-center justify-center ${pros.length >= cons.length ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className={`text-[24px] font-gilda-display ${pros.length >= cons.length ? 'text-green-600' : 'text-red-500'}`}>
                  {pros.length > cons.length ? '+' : ''}{pros.length - cons.length}
                </span>
              </div>
              <div>
                <p className="font-ibm-plex-sans text-[14px] font-medium text-gray-900">Net Score</p>
                <p className="font-ibm-plex-sans text-[12px] text-gray-500">{pros.length >= cons.length ? 'favorable' : 'consider alternatives'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
