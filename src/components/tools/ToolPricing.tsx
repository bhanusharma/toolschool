import { Check, X, ExternalLink, Calendar } from 'lucide-react'
import type { Tool } from '@/payload-types'

type PricingTier = NonNullable<Tool['pricingTiers']>[number]

interface ToolPricingProps {
  tiers?: PricingTier[] | null
  summary?: string | null
  model?: string | null
  lastVerified?: string | null
  website?: string | null
}

const pricingModelLabels: Record<string, { label: string; color: string }> = {
  free: { label: 'Free', color: '#34a853' },
  freemium: { label: 'Freemium', color: '#1a73e8' },
  paid: { label: 'Paid', color: '#9c27b0' },
  custom: { label: 'Enterprise', color: '#ff5722' },
}

export function ToolPricing({ tiers, summary, model, lastVerified, website }: ToolPricingProps) {
  const hasTiers = tiers && tiers.length > 0

  return (
    <section id="pricing" className="bg-white border border-[#e5e5e5] p-8 lg:p-10">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[28px] font-gilda-display text-black mb-2">
            Pricing
          </h2>
          {lastVerified && (
            <p className="font-ibm-plex-sans text-[13px] text-gray-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last verified: {new Date(lastVerified).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
        {model && pricingModelLabels[model] && (
          <span
            className="inline-block px-4 py-2 text-white text-[12px] font-ibm-plex-sans-condensed tracking-wider uppercase"
            style={{ backgroundColor: pricingModelLabels[model].color }}
          >
            {pricingModelLabels[model].label}
          </span>
        )}
      </div>

      {summary && (
        <p className="font-ibm-plex-sans text-[16px] text-gray-700 mb-8 leading-relaxed">
          {summary}
        </p>
      )}

      {/* Pricing Tiers Grid */}
      {hasTiers && (
        <div className={`grid gap-6 pt-6 items-start ${
          tiers.length === 1 ? 'grid-cols-1 max-w-md' :
          tiers.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          tiers.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative flex flex-col border bg-white ${
                tier.recommended
                  ? 'border-[#e7131a] shadow-lg ring-1 ring-[#e7131a] mt-0'
                  : 'border-[#e5e5e5] mt-4'
              }`}
            >
              {/* Recommended Badge */}
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e7131a] text-white text-[11px] font-ibm-plex-sans-condensed tracking-wider uppercase px-4 py-1.5 whitespace-nowrap z-10">
                  Most Popular
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                {/* Tier Name */}
                <h3 className="font-gilda-display text-[20px] text-black mb-2">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-[32px] font-gilda-display text-black leading-tight">
                    {tier.price}
                  </span>
                  {tier.billingPeriod && tier.billingPeriod !== 'free' && tier.billingPeriod !== 'one-time' && (
                    <span className="font-ibm-plex-sans text-[14px] text-gray-400 ml-1">
                      /{tier.billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>

                {/* Features */}
                {tier.features && tier.features.length > 0 && (
                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.features.map((f, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="font-ibm-plex-sans text-[14px] text-gray-700">
                          {f.feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Limitations */}
                {tier.limitations && tier.limitations.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {tier.limitations.map((l, lIndex) => (
                      <li key={lIndex} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="font-ibm-plex-sans text-[13px] text-gray-500">
                          {l.limitation}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                {tier.ctaUrl ? (
                  <a
                    href={tier.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`mt-auto w-full py-3 font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase text-center transition-colors ${
                      tier.recommended
                        ? 'bg-[#e7131a] text-white hover:bg-[#c10e14]'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {tier.ctaText || 'Get Started'}
                  </a>
                ) : tier.ctaText ? (
                  <span className="mt-auto w-full py-3 bg-gray-100 text-gray-600 font-ibm-plex-sans-condensed text-[13px] tracking-wider uppercase text-center">
                    {tier.ctaText}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fallback for no tiers */}
      {!hasTiers && model && (
        <div className="bg-[#f8f8f8] p-6">
          {model === 'free' && (
            <p className="font-ibm-plex-sans text-[15px] text-gray-700">
              This tool is completely free to use with no paid plans.
            </p>
          )}
          {model === 'freemium' && (
            <p className="font-ibm-plex-sans text-[15px] text-gray-700">
              Free tier available. Premium features require a paid subscription.
            </p>
          )}
          {model === 'paid' && (
            <p className="font-ibm-plex-sans text-[15px] text-gray-700">
              This is a paid tool. Visit their website for current pricing.
            </p>
          )}
          {model === 'custom' && (
            <p className="font-ibm-plex-sans text-[15px] text-gray-700">
              Enterprise pricing available. Contact their sales team for a custom quote.
            </p>
          )}
        </div>
      )}

      {/* View Full Pricing Link */}
      {website && (
        <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 font-ibm-plex-sans text-[14px] text-[#e7131a] hover:underline"
          >
            View full pricing details on official website
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </section>
  )
}
