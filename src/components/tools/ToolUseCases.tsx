import { User, AlertCircle, Lightbulb, ArrowRight } from 'lucide-react'
import type { Tool } from '@/payload-types'

type UseCaseScenario = NonNullable<Tool['useCaseScenarios']>[number]

interface ToolUseCasesProps {
  scenarios: UseCaseScenario[]
  toolName: string
}

const scenarioColors = [
  { bg: '#e7131a10', border: '#e7131a', icon: '#e7131a' },
  { bg: '#1a73e810', border: '#1a73e8', icon: '#1a73e8' },
  { bg: '#34a85310', border: '#34a853', icon: '#34a853' },
  { bg: '#9c27b010', border: '#9c27b0', icon: '#9c27b0' },
  { bg: '#ff572210', border: '#ff5722', icon: '#ff5722' },
  { bg: '#00bcd410', border: '#00bcd4', icon: '#00bcd4' },
  { bg: '#fbbc0410', border: '#fbbc04', icon: '#fbbc04' },
  { bg: '#673ab710', border: '#673ab7', icon: '#673ab7' },
]

export function ToolUseCases({ scenarios, toolName }: ToolUseCasesProps) {
  return (
    <section id="use-cases" className="bg-white border border-[#e5e5e5] p-8 lg:p-10">
      <h2 className="text-[28px] font-gilda-display text-black mb-2">
        Real-World Use Cases
      </h2>
      <p className="font-ibm-plex-sans text-[15px] text-gray-500 mb-8">
        How people are using {toolName} to solve problems
      </p>

      <div className="space-y-6">
        {scenarios.map((scenario, index) => {
          const colors = scenarioColors[index % scenarioColors.length]

          return (
            <div
              key={index}
              className="border-l-4 pl-6 py-4"
              style={{ borderColor: colors.border }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.bg }}
                >
                  <User className="w-5 h-5" style={{ color: colors.icon }} />
                </div>

                <div className="flex-1">
                  {/* Title and Persona */}
                  <div className="mb-3">
                    <h3 className="font-gilda-display text-[18px] text-black">
                      {scenario.title}
                    </h3>
                    {scenario.persona && (
                      <span className="font-ibm-plex-sans text-[13px] text-gray-500">
                        {scenario.persona}
                      </span>
                    )}
                  </div>

                  {/* Problem -> Solution -> Outcome Flow */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scenario.problem && (
                      <div className="bg-[#fef2f2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="font-ibm-plex-sans-condensed text-[11px] tracking-wider uppercase text-red-600">
                            Challenge
                          </span>
                        </div>
                        <p className="font-ibm-plex-sans text-[14px] text-gray-700 leading-relaxed">
                          {scenario.problem}
                        </p>
                      </div>
                    )}

                    {scenario.solution && (
                      <div className="bg-[#f0f9ff] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-blue-500" />
                          <span className="font-ibm-plex-sans-condensed text-[11px] tracking-wider uppercase text-blue-600">
                            Solution
                          </span>
                        </div>
                        <p className="font-ibm-plex-sans text-[14px] text-gray-700 leading-relaxed">
                          {scenario.solution}
                        </p>
                      </div>
                    )}

                    {scenario.outcome && (
                      <div className="bg-[#f0fdf4] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowRight className="w-4 h-4 text-green-500" />
                          <span className="font-ibm-plex-sans-condensed text-[11px] tracking-wider uppercase text-green-600">
                            Outcome
                          </span>
                        </div>
                        <p className="font-ibm-plex-sans text-[14px] text-gray-700 leading-relaxed font-medium">
                          {scenario.outcome}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
