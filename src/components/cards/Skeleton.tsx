'use client'

interface SkeletonProps {
  className?: string
}

function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-[#f6f4f1] ${className}`} />
  )
}

// Card skeleton matching the unified card system design
export function CardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'featured' }) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-4 bg-white border border-[#e5e5e5]">
        <Skeleton className="w-12 h-12 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="w-4 h-4 flex-shrink-0" />
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="bg-white border border-[#e5e5e5]">
        <Skeleton className="aspect-[4/3]" />
        <div className="p-6">
          <div className="flex gap-2 mb-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-7 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="w-4 h-4" />
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="bg-white border border-[#e5e5e5]">
      <Skeleton className="aspect-square" />
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

// News card skeleton
export function NewsCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'featured' | 'headline' }) {
  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-4 p-4 bg-white border border-[#e5e5e5]">
        <Skeleton className="w-20 h-14 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    )
  }

  if (variant === 'headline') {
    return (
      <div className="aspect-[21/9] md:aspect-[3/1] bg-gradient-to-br from-gray-200 to-gray-300 relative">
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <Skeleton className="h-5 w-20 mb-4" />
          <Skeleton className="h-10 w-3/4 max-w-2xl mb-3" />
          <Skeleton className="h-6 w-1/2 max-w-xl" />
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="bg-white border border-[#e5e5e5]">
        <Skeleton className="aspect-[16/9]" />
        <div className="p-6">
          <Skeleton className="h-5 w-20 mb-3" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="w-4 h-4" />
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="bg-white border border-[#e5e5e5]">
      <Skeleton className="aspect-[16/10]" />
      <div className="p-5">
        <Skeleton className="h-5 w-16 mb-3" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

// Builder card skeleton
export function BuilderCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'featured' }) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-4 bg-white border border-[#e5e5e5]">
        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="w-4 h-4 flex-shrink-0" />
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="bg-white border border-[#e5e5e5]">
        <Skeleton className="aspect-[4/3]" />
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="w-4 h-4" />
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="bg-white border border-[#e5e5e5]">
      <Skeleton className="aspect-[4/3]" />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

// Project card skeleton
export function ProjectCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'featured' }) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-4 bg-white border border-[#e5e5e5]">
        <Skeleton className="w-16 h-12 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="w-4 h-4 flex-shrink-0" />
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="bg-white border border-[#e5e5e5]">
        <Skeleton className="aspect-[16/9]" />
        <div className="p-6">
          <Skeleton className="h-5 w-20 mb-3" />
          <Skeleton className="h-7 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-5 w-18" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="w-4 h-4" />
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="bg-white border border-[#e5e5e5]">
      <Skeleton className="aspect-[16/10]" />
      <div className="p-5">
        <Skeleton className="h-5 w-16 mb-3" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

// Hero skeleton
export function HeroSkeleton() {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-0 w-[45%] h-full bg-[#e7131a] opacity-90"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
      </div>
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-6 bg-white/10" />
            <Skeleton className="h-16 w-80 mb-4 bg-white/10" />
            <Skeleton className="h-16 w-64 mb-6 bg-white/10" />
            <Skeleton className="h-6 w-96 mb-4 bg-white/10" />
            <Skeleton className="h-6 w-80 mb-8 bg-white/10" />
            <Skeleton className="h-14 w-full max-w-md bg-white/10" />
          </div>
          <div className="hidden lg:block">
            <CardSkeleton variant="featured" />
          </div>
        </div>
      </div>
    </section>
  )
}

// Grid skeleton for card grids
export function GridSkeleton({
  count = 8,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  cardType = 'tool'
}: {
  count?: number
  columns?: { sm?: number; md?: number; lg?: number; xl?: number }
  cardType?: 'tool' | 'news' | 'builder' | 'project'
}) {
  const CardComponent = {
    tool: CardSkeleton,
    news: NewsCardSkeleton,
    builder: BuilderCardSkeleton,
    project: ProjectCardSkeleton,
  }[cardType]

  return (
    <div className={`grid grid-cols-${columns.sm || 1} sm:grid-cols-${columns.sm || 1} md:grid-cols-${columns.md || 2} lg:grid-cols-${columns.lg || 3} xl:grid-cols-${columns.xl || 4} gap-6`}>
      {[...Array(count)].map((_, i) => (
        <CardComponent key={i} />
      ))}
    </div>
  )
}

// Filter bar skeleton
export function FilterBarSkeleton() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-4 bg-white border-b border-[#e5e5e5]">
      <div className="flex items-center gap-3 overflow-x-auto">
        <Skeleton className="h-9 w-28 flex-shrink-0" />
        <Skeleton className="h-9 w-24 flex-shrink-0" />
        <Skeleton className="h-9 w-20 flex-shrink-0" />
        <Skeleton className="h-9 w-22 flex-shrink-0" />
        <Skeleton className="h-9 w-18 flex-shrink-0" />
        <Skeleton className="h-9 w-26 flex-shrink-0" />
      </div>
    </section>
  )
}

export { Skeleton }
