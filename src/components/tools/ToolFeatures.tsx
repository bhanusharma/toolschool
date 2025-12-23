import React from 'react'
import { Check, Zap, Shield, Cpu, Palette, MessageSquare, BarChart3, Layers, Sparkles, Wand2 } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { Tool } from '@/payload-types'

type KeyFeature = NonNullable<Tool['keyFeatures']>[number]

interface ToolFeaturesProps {
  features: KeyFeature[]
}

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  check: Check,
  zap: Zap,
  shield: Shield,
  cpu: Cpu,
  palette: Palette,
  messageSquare: MessageSquare,
  barChart: BarChart3,
  layers: Layers,
  sparkles: Sparkles,
  wand: Wand2,
}

const featureColors = [
  { bg: '#e7131a15', color: '#e7131a' },
  { bg: '#1a73e815', color: '#1a73e8' },
  { bg: '#34a85315', color: '#34a853' },
  { bg: '#fbbc0415', color: '#fbbc04' },
  { bg: '#9c27b015', color: '#9c27b0' },
  { bg: '#00bcd415', color: '#00bcd4' },
  { bg: '#ff572215', color: '#ff5722' },
  { bg: '#673ab715', color: '#673ab7' },
  { bg: '#10b98115', color: '#10b981' },
  { bg: '#f59e0b15', color: '#f59e0b' },
]

export function ToolFeatures({ features }: ToolFeaturesProps) {
  return (
    <section id="features" className="bg-white border border-[#e5e5e5] p-8 lg:p-10">
      <h2 className="text-[28px] font-gilda-display text-black mb-2">
        Key Features
      </h2>
      <p className="font-ibm-plex-sans text-[15px] text-gray-500 mb-8">
        What makes this tool stand out
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const colorScheme = featureColors[index % featureColors.length]
          const IconComponent = feature.icon ? iconMap[feature.icon] : null

          return (
            <div
              key={index}
              className="flex gap-4 p-5 bg-[#f8f8f8] hover:bg-[#f0eeeb] transition-colors"
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colorScheme.bg }}
              >
                {IconComponent ? (
                  <IconComponent className="w-6 h-6" color={colorScheme.color} />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: colorScheme.color }}
                  >
                    <path
                      d="M9 11L12 14L22 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-[17px] text-black mb-1.5 font-gilda-display">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="font-ibm-plex-sans text-[14px] text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                )}
                {feature.useCase && (
                  <p className="font-ibm-plex-sans text-[13px] text-gray-400 mt-2 italic">
                    Use case: {feature.useCase}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
