import { ReactNode } from 'react'

type Variant = 'primary' | 'danger' | 'outline' | 'ghost-danger'
type Size = 'sm' | 'md'

export function ActionButton({
  children,
  onClick,
  variant = 'primary',
  disabled,
  size = 'md',
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  disabled?: boolean
  size?: Size
  type?: 'button' | 'submit' | 'reset'
}) {
  const base =
    'inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-all active:scale-95 disabled:opacity-50'

  const sizes = {
    sm: 'px-2.5 py-1 text-xs w-20',
    md: 'px-4 py-2 text-sm w-28',
  }

  const variants = {
    'ghost-danger':
      'border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-200',
    primary: 'bg-primary text-white hover:opacity-90',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline:
      'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-300 hover:text-black hover:shadow-sm',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </button>
  )
}
