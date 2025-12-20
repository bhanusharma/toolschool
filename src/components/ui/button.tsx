import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-display',
  {
    variants: {
      variant: {
        default: 'bg-[--color-primary] text-[--color-primary-foreground] border border-[--color-primary] hover:bg-transparent hover:text-[--color-primary]',
        secondary: 'bg-[--color-muted] text-[--color-foreground] border border-[--color-border-light] hover:bg-[--color-primary] hover:text-[--color-primary-foreground] hover:border-[--color-primary]',
        outline: 'border border-[--color-primary] bg-transparent text-[--color-primary] hover:bg-[--color-primary] hover:text-[--color-primary-foreground]',
        ghost: 'hover:bg-[--color-muted] border border-transparent',
        link: 'text-[--color-foreground] underline-offset-4 hover:underline border-none',
        destructive: 'bg-[--color-destructive] text-[--color-destructive-foreground] border border-[--color-destructive] hover:bg-transparent hover:text-[--color-destructive]',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-sm',
        xl: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
