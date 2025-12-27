'use client'

import { useState, useEffect, useRef, ComponentType } from 'react'
import type { VideoToAsciiProps } from 'video2ascii'

// Store the loaded component outside of React to prevent recreation
let loadedVideo2Ascii: ComponentType<VideoToAsciiProps> | null = null
let loadPromise: Promise<ComponentType<VideoToAsciiProps>> | null = null

function loadVideo2Ascii(): Promise<ComponentType<VideoToAsciiProps>> {
  if (loadedVideo2Ascii) {
    return Promise.resolve(loadedVideo2Ascii)
  }
  if (loadPromise) {
    return loadPromise
  }
  loadPromise = import('video2ascii').then((mod) => {
    loadedVideo2Ascii = mod.default
    return loadedVideo2Ascii
  })
  return loadPromise
}

interface AsciiHeroProps {
  children: React.ReactNode
  videoSrc?: string
}

export function AsciiHero({
  children,
  videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
}: AsciiHeroProps) {
  const [Component, setComponent] = useState<ComponentType<VideoToAsciiProps> | null>(loadedVideo2Ascii)
  const [isLoaded, setIsLoaded] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    if (!Component) {
      loadVideo2Ascii()
        .then((comp) => {
          if (mountedRef.current) {
            setComponent(() => comp)
            // Small delay to ensure video starts playing
            setTimeout(() => setIsLoaded(true), 100)
          }
        })
        .catch((err) => {
          console.error('Failed to load video2ascii:', err)
        })
    } else {
      setIsLoaded(true)
    }
    return () => {
      mountedRef.current = false
    }
  }, [Component])

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-[1440px] bg-[#0a0a0a] overflow-hidden">
        {/* ASCII Video Background Layer - Original video visible with ASCII overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        >
          {Component && (
            <Component
              src={videoSrc}
              numColumns={80}
              colored={true}
              brightness={1.2}
              blend={0.7}
              highlight={0}
              charset="detailed"
              enableMouse={true}
              enableRipple={true}
              autoPlay={true}
              enableSpacebarToggle={false}
              showStats={false}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Minimal overlay just for text readability on left side */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </div>

        {/* Content - highest z-index */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}
