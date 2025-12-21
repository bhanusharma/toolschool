export default function ToolsLoading() {
  return (
    <section className="max-w-[1440px] mx-auto px-12 py-8">
      {/* Header skeleton */}
      <div className="mb-8 space-y-4">
        <div className="h-10 w-48 bg-muted shimmer" />
        <div className="h-5 w-96 bg-muted shimmer" />
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-4 mb-8">
        <div className="h-10 w-32 bg-muted shimmer" />
        <div className="h-10 w-32 bg-muted shimmer" />
        <div className="h-10 w-32 bg-muted shimmer" />
      </div>

      {/* Tools grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border border-border-light p-4 space-y-4">
            {/* Logo */}
            <div className="w-12 h-12 bg-muted shimmer" />

            {/* Title */}
            <div className="h-6 w-3/4 bg-muted shimmer" />

            {/* Tagline */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted shimmer" />
              <div className="h-4 w-2/3 bg-muted shimmer" />
            </div>

            {/* Tags */}
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-muted shimmer" />
              <div className="h-6 w-20 bg-muted shimmer" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
