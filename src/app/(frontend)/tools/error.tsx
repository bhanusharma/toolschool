'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Tools page error:', error)
  }, [error])

  return (
    <section className="max-w-[1440px] mx-auto px-12 py-20">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-vibe-red" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-display tracking-tight">
            Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md">
            We couldn&apos;t load the tools directory. This might be a temporary issue.
          </p>
        </div>

        <Button
          onClick={reset}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </Button>

        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </section>
  )
}
