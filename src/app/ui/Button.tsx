import * as React from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'outline' | 'secondary' | 'danger' | 'disabled'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const baseStyles =
  'inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-violet-900 disabled:pointer-events-none disabled:opacity-50'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-violet-800 text-white hover:bg-violet-900',
  outline: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-100',
  secondary: 'bg-yellow-400 text-violet-900 hover:bg-yellow-500',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  disabled: 'bg-gray-300 text-gray-600 cursor-not-allowed',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-6',
  lg: 'h-12 px-8 text-lg',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
