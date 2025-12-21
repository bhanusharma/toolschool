'use client'

import { useEffect, useState } from 'react'

interface TutorialProgressProps {
  steps: Array<{ stepNumber: number; title: string }>
  totalSteps: number
}

export function TutorialProgress({ steps, totalSteps }: TutorialProgressProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min((scrollTop / docHeight) * 100, 100)
      setProgress(scrollProgress)

      // Find active step based on scroll position
      const stepElements = steps.map((step) =>
        document.getElementById(`step-${step.stepNumber}`)
      ).filter(Boolean)

      let currentStep = 0
      for (let i = stepElements.length - 1; i >= 0; i--) {
        const el = stepElements[i]
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            currentStep = i + 1
            break
          }
        }
      }
      setActiveStep(currentStep)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [steps])

  return (
    <>
      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-[#e7131a] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile floating progress indicator */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <div className="bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
          <div className="text-center">
            <div className="text-[14px] font-bold">{activeStep}/{totalSteps}</div>
          </div>
        </div>
      </div>
    </>
  )
}
