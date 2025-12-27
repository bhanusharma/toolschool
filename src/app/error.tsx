'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-6">
        <h1 className="font-gilda-display text-[72px] text-[#e7131a] leading-none mb-4">
          500
        </h1>
        <h2 className="font-ibm-plex-sans-condensed text-[14px] tracking-[0.15em] uppercase text-black/50 mb-6">
          Something went wrong
        </h2>
        <p className="font-ibm-plex-sans text-[16px] text-black/60 mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="bg-black text-white px-8 py-4 font-ibm-plex-sans-condensed text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#e7131a]"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
