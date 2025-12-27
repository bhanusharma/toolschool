'use client'

import { useState, useEffect, useRef, ComponentType } from 'react'
import type { VideoToAsciiProps } from 'video2ascii'

type CharsetKey = 'standard' | 'detailed' | 'blocks' | 'minimal' | 'binary' | 'dots' | 'arrows' | 'emoji'

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

// Wrapper component that handles lazy loading
function Video2AsciiWrapper(props: VideoToAsciiProps & { remountKey?: string }) {
  const { remountKey, ...videoProps } = props
  const [Component, setComponent] = useState<ComponentType<VideoToAsciiProps> | null>(loadedVideo2Ascii)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    if (!Component) {
      loadVideo2Ascii()
        .then((comp) => {
          if (mountedRef.current) {
            setComponent(() => comp)
          }
        })
        .catch((err) => {
          if (mountedRef.current) {
            console.error('Failed to load video2ascii:', err)
            setError(err.message)
          }
        })
    }
    return () => {
      mountedRef.current = false
    }
  }, [Component])

  if (error) {
    return (
      <div className="w-full aspect-video bg-red-50 flex items-center justify-center">
        <span className="text-red-500 font-ibm-plex-sans text-sm">Error: {error}</span>
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="w-full aspect-video bg-black/5 flex items-center justify-center">
        <span className="text-black/40 font-ibm-plex-sans text-sm">Loading video2ascii...</span>
      </div>
    )
  }

  // remountKey forces component to remount when video src or charset changes
  return <Component key={remountKey} {...videoProps} />
}

export default function Video2AsciiExperiment() {
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
  const [customUrl, setCustomUrl] = useState('')
  const [numColumns, setNumColumns] = useState(120)
  const [colored, setColored] = useState(true)
  const [brightness, setBrightness] = useState(1.0)
  const [blend, setBlend] = useState(0)
  const [highlight, setHighlight] = useState(0)
  const [charset, setCharset] = useState<CharsetKey>('detailed')
  const [enableMouse, setEnableMouse] = useState(true)
  const [enableRipple, setEnableRipple] = useState(true)
  const [showStats, setShowStats] = useState(true)

  const sampleVideos = [
    { label: 'Big Buck Bunny', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { label: 'Sintel Trailer', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
    { label: 'Tears of Steel', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
    { label: 'Elephant Dream', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  ]

  const charsets: { key: CharsetKey; label: string }[] = [
    { key: 'standard', label: 'Standard (.:-=+*#%@)' },
    { key: 'detailed', label: 'Detailed (70 chars)' },
    { key: 'blocks', label: 'Blocks (░▒▓█)' },
    { key: 'minimal', label: 'Minimal (.oO@)' },
    { key: 'binary', label: 'Binary ( █)' },
    { key: 'dots', label: 'Dots (·•●)' },
    { key: 'arrows', label: 'Arrows (←↙↓↘→↗↑↖)' },
    { key: 'emoji', label: 'Emoji (Moon phases)' },
  ]

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-gilda-display text-black mb-2">Video2ASCII Experiment</h1>
        <p className="text-black/60 font-ibm-plex-sans text-sm">
          Testing the video2ascii library for potential use on tool pages or homepage.
          WebGL-powered video to ASCII art conversion.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 p-6 bg-black/[0.02] border border-black/[0.06]">
        <h2 className="font-ibm-plex-sans-condensed text-xs tracking-[0.2em] uppercase text-black/40 mb-4">Controls</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video Selection */}
          <div>
            <label className="block text-sm font-ibm-plex-sans text-black/70 mb-2">Sample Video</label>
            <select
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-black/10 text-sm font-ibm-plex-sans"
            >
              {sampleVideos.map(v => (
                <option key={v.url} value={v.url}>{v.label}</option>
              ))}
            </select>
          </div>

          {/* Custom URL */}
          <div className="md:col-span-2 lg:col-span-2">
            <label className="block text-sm font-ibm-plex-sans text-black/70 mb-2">Custom Video URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="flex-1 px-3 py-2 bg-white border border-black/10 text-sm font-ibm-plex-sans"
              />
              <button
                onClick={() => customUrl && setVideoUrl(customUrl)}
                className="px-4 py-2 bg-black text-white text-sm font-ibm-plex-sans hover:bg-black/80 transition-colors"
              >
                Load
              </button>
            </div>
          </div>

          {/* Columns */}
          <div>
            <label className="block text-sm font-ibm-plex-sans text-black/70 mb-2">
              Columns: {numColumns}
            </label>
            <input
              type="range"
              min="40"
              max="200"
              value={numColumns}
              onChange={(e) => setNumColumns(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Brightness */}
          <div>
            <label className="block text-sm font-ibm-plex-sans text-black/70 mb-2">
              Brightness: {brightness.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Blend */}
          <div>
            <label className="block text-sm font-ibm-plex-sans text-black/70 mb-2">
              Blend with Original: {blend}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={blend}
              onChange={(e) => setBlend(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Highlight */}
          <div>
            <label className="block text-sm font-ibm-plex-sans text-black/70 mb-2">
              Background Highlight: {highlight}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={highlight}
              onChange={(e) => setHighlight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Charset */}
          <div>
            <label className="block text-sm font-ibm-plex-sans text-black/70 mb-2">Character Set</label>
            <select
              value={charset}
              onChange={(e) => setCharset(e.target.value as CharsetKey)}
              className="w-full px-3 py-2 bg-white border border-black/10 text-sm font-ibm-plex-sans"
            >
              {charsets.map(c => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-ibm-plex-sans text-black/70 cursor-pointer">
              <input
                type="checkbox"
                checked={colored}
                onChange={(e) => setColored(e.target.checked)}
                className="w-4 h-4"
              />
              Colored
            </label>
            <label className="flex items-center gap-2 text-sm font-ibm-plex-sans text-black/70 cursor-pointer">
              <input
                type="checkbox"
                checked={enableMouse}
                onChange={(e) => setEnableMouse(e.target.checked)}
                className="w-4 h-4"
              />
              Mouse Effects
            </label>
            <label className="flex items-center gap-2 text-sm font-ibm-plex-sans text-black/70 cursor-pointer">
              <input
                type="checkbox"
                checked={enableRipple}
                onChange={(e) => setEnableRipple(e.target.checked)}
                className="w-4 h-4"
              />
              Click Ripple
            </label>
            <label className="flex items-center gap-2 text-sm font-ibm-plex-sans text-black/70 cursor-pointer">
              <input
                type="checkbox"
                checked={showStats}
                onChange={(e) => setShowStats(e.target.checked)}
                className="w-4 h-4"
              />
              Show Stats
            </label>
          </div>
        </div>
      </div>

      {/* Video Player */}
      {/* Note: video2ascii doesn't support dynamic prop updates, so we use a key to force remount on any setting change */}
      <div className="bg-black">
        <Video2AsciiWrapper
          remountKey={`${videoUrl}-${charset}-${numColumns}-${colored}-${brightness}-${blend}-${highlight}-${enableMouse}-${enableRipple}-${showStats}`}
          src={videoUrl}
          numColumns={numColumns}
          colored={colored}
          brightness={brightness}
          blend={blend / 100}
          highlight={highlight}
          charset={charset}
          enableMouse={enableMouse}
          enableRipple={enableRipple}
          autoPlay={true}
          enableSpacebarToggle={true}
          showStats={showStats}
          className="w-full aspect-video"
        />
      </div>

      <div className="mt-4 text-sm text-black/50 font-ibm-plex-sans">
        <p>Press <kbd className="px-2 py-0.5 bg-black/5 border border-black/10 text-xs">Space</kbd> to play/pause. Click to create ripple effects.</p>
      </div>

      {/* Use Cases */}
      <div className="mt-12 p-6 bg-black/[0.02] border border-black/[0.06]">
        <h2 className="font-ibm-plex-sans-condensed text-xs tracking-[0.2em] uppercase text-black/40 mb-4">Potential Use Cases</h2>
        <ul className="space-y-2 text-sm font-ibm-plex-sans text-black/70">
          <li>• <strong>Tool Detail Pages:</strong> Hero section with ASCII-style video demos of AI tools</li>
          <li>• <strong>Homepage Hero:</strong> Attention-grabbing ASCII video background</li>
          <li>• <strong>Video Tool Categories:</strong> Preview videos in ASCII style before showing full quality</li>
          <li>• <strong>Loading States:</strong> ASCII effect while full video loads</li>
          <li>• <strong>Retro/Tech Aesthetic:</strong> Reinforce the developer/maker vibe of the platform</li>
        </ul>
      </div>

      {/* Technical Notes */}
      <div className="mt-6 p-6 bg-black/[0.02] border border-black/[0.06]">
        <h2 className="font-ibm-plex-sans-condensed text-xs tracking-[0.2em] uppercase text-black/40 mb-4">Technical Notes</h2>
        <ul className="space-y-2 text-sm font-ibm-plex-sans text-black/70">
          <li>• <strong>Bundle Size:</strong> ~32KB minified (no dependencies)</li>
          <li>• <strong>Performance:</strong> WebGL2 GPU-accelerated, all rendering on GPU via GLSL shaders</li>
          <li>• <strong>Browser Support:</strong> Requires WebGL2 (all modern browsers)</li>
          <li>• <strong>SSR:</strong> Must use dynamic import with ssr: false</li>
        </ul>
      </div>
    </div>
  )
}
