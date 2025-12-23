'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  className?: string
}

export function CodeBlock({ code, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={`relative group mb-4 ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
      <pre className="bg-gray-900 text-gray-100 p-4 pr-12 rounded-lg overflow-x-auto text-[14px] max-w-full">
        <code className="whitespace-pre-wrap break-words">{code}</code>
      </pre>
    </div>
  )
}
