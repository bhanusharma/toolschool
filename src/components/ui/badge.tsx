import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border px-3 py-1 text-xs font-medium uppercase tracking-wider transition-colors focus:outline-none font-display',
  {
    variants: {
      variant: {
        default: 'border-[--color-primary] bg-[--color-primary] text-[--color-primary-foreground]',
        secondary: 'border-[--color-border-light] bg-[--color-muted] text-[--color-foreground]',
        outline: 'border-[--color-border-light] bg-transparent text-[--color-foreground]',
        creating: 'border-[--color-creating] bg-[--color-creating]/10 text-[--color-creating]',
        writing: 'border-[--color-writing] bg-[--color-writing]/10 text-[--color-writing]',
        curating: 'border-[--color-curating] bg-[--color-curating]/10 text-[--color-curating]',
        building: 'border-[--color-building] bg-[--color-building]/10 text-[--color-building]',
        video: 'border-[--color-video] bg-[--color-video]/10 text-[--color-video]',
        audio: 'border-[--color-audio] bg-[--color-audio]/10 text-[--color-audio]',
        design: 'border-[--color-design] bg-[--color-design]/10 text-[--color-design]',
        '3d': 'border-[--color-3d] bg-[--color-3d]/10 text-[--color-3d]',
        free: 'border-green-600 bg-green-50 text-green-700',
        freemium: 'border-blue-600 bg-blue-50 text-blue-700',
        paid: 'border-orange-600 bg-orange-50 text-orange-700',
        enterprise: 'border-purple-600 bg-purple-50 text-purple-700',
        custom: 'border-purple-600 bg-purple-50 text-purple-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
