import { Star, Award } from 'lucide-react'
import type { Tool } from '@/payload-types'

type Ratings = NonNullable<Tool['ratings']>

interface ToolVerdictProps {
  verdict?: string | null
  summary?: string | null
  ratings?: Ratings | null
  toolName: string
}

export function ToolVerdict({ verdict, summary, ratings, toolName }: ToolVerdictProps) {
  const overallRating = ratings?.overall || 4

  // Calculate rating label
  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent'
    if (rating >= 4) return 'Very Good'
    if (rating >= 3.5) return 'Good'
    if (rating >= 3) return 'Average'
    return 'Below Average'
  }

  return (
    <section id="verdict" className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white p-8 lg:p-10">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 bg-[#e7131a] rounded-full flex items-center justify-center flex-shrink-0">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-[28px] font-gilda-display text-white">
            ToolSchool Verdict
          </h2>
          <p className="font-ibm-plex-sans text-[15px] text-white/60">
            Our expert assessment of {toolName}
          </p>
        </div>
      </div>

      {/* Rating Display */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Overall Score */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-[#e7131a] rounded-full flex flex-col items-center justify-center">
            <span className="text-[32px] font-gilda-display text-white leading-none">
              {overallRating.toFixed(1)}
            </span>
            <span className="text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase text-white/80">
              out of 5
            </span>
          </div>
          <div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(overallRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-white/30'
                  }`}
                />
              ))}
            </div>
            <p className="font-ibm-plex-sans text-[18px] font-medium text-white">
              {getRatingLabel(overallRating)}
            </p>
          </div>
        </div>

        {/* Rating Breakdown */}
        {ratings && (
          <div className="flex-1 grid grid-cols-2 gap-4">
            {ratings.easeOfUse && (
              <RatingItem label="Ease of Use" value={ratings.easeOfUse} />
            )}
            {ratings.features && (
              <RatingItem label="Features" value={ratings.features} />
            )}
            {ratings.valueForMoney && (
              <RatingItem label="Value for Money" value={ratings.valueForMoney} />
            )}
            {ratings.support && (
              <RatingItem label="Customer Support" value={ratings.support} />
            )}
          </div>
        )}
      </div>

      {/* Summary Quote */}
      {summary && (
        <div className="bg-white/10 border-l-4 border-[#e7131a] p-6 mb-8">
          <blockquote className="font-gilda-display text-[20px] text-white italic leading-relaxed">
            &ldquo;{summary}&rdquo;
          </blockquote>
        </div>
      )}

      {/* Full Verdict */}
      {verdict && (
        <div className="prose prose-invert max-w-none">
          <p className="font-ibm-plex-sans text-[16px] text-white/90 leading-relaxed whitespace-pre-wrap">
            {verdict}
          </p>
        </div>
      )}

      {/* Bottom Line */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-ibm-plex-sans-condensed text-[12px] tracking-wider uppercase text-white/60">
            Bottom Line:
          </span>
          <span className="font-ibm-plex-sans text-[15px] text-white">
            {overallRating >= 4.5 && `${toolName} is an excellent choice and highly recommended.`}
            {overallRating >= 4 && overallRating < 4.5 && `${toolName} is a solid option worth considering for most users.`}
            {overallRating >= 3.5 && overallRating < 4 && `${toolName} is a good tool with some areas for improvement.`}
            {overallRating >= 3 && overallRating < 3.5 && `${toolName} is average and may suit specific use cases.`}
            {overallRating < 3 && `${toolName} may not be the best choice for most users.`}
          </span>
        </div>
      </div>
    </section>
  )
}

function RatingItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="font-ibm-plex-sans text-[13px] text-white/70">{label}</span>
          <span className="font-ibm-plex-sans text-[13px] text-white">{value.toFixed(1)}</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e7131a] rounded-full transition-all duration-500"
            style={{ width: `${(value / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
