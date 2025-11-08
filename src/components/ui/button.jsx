import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-honey-dark text-charcoal hover:bg-honey shadow-lg shadow-honey/50 hover:shadow-honey/70 hover:scale-105",
        outline: "border-2 border-honey text-honey hover:bg-honey hover:text-charcoal",
        ghost: "hover:bg-honey/10 hover:text-honey",
        secondary: "bg-soft-green text-charcoal hover:bg-soft-green/90 shadow-lg",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
