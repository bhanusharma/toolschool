'use client'

interface NewsArticleClientProps {
  title: string
}

export default function NewsArticleClient({ title }: NewsArticleClientProps) {
  const shareOnTwitter = () => {
    const text = `${title} - AI News by ToolSchool`
    const url = window.location.href
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = window.location.href
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="font-ibm-plex-sans-condensed text-[14px] tracking-wider uppercase text-black/50 mb-4">
        Share this article
      </h3>
      <div className="flex gap-4">
        <button
          onClick={shareOnTwitter}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300"
          aria-label="Share on Twitter"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </button>
        <button
          onClick={shareOnLinkedIn}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0077B5] hover:text-white transition-all duration-300"
          aria-label="Share on LinkedIn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </button>
        <button
          onClick={copyToClipboard}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300"
          aria-label="Copy link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
      </div>
    </div>
  )
}
