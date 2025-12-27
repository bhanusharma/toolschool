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

interface AsciiHeroBackgroundProps {
  videoSrc?: string
  opacity?: number
  className?: string
  children?: React.ReactNode
}

export function AsciiHeroBackground({
  videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  opacity = 0.15,
  className = '',
  children,
}: AsciiHeroBackgroundProps) {
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
    <div className={`relative ${className}`}>
      {/* ASCII Video Background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: isLoaded ? opacity : 0, transition: 'opacity 1s ease-in-out' }}
      >
        {Component && (
          <Component
            src={videoSrc}
            numColumns={100}
            colored={false}
            brightness={1.2}
            blend={0}
            highlight={0}
            charset="detailed"
            enableMouse={false}
            enableRipple={false}
            autoPlay={true}
            enableSpacebarToggle={false}
            showStats={false}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
