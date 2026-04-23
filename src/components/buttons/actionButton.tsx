import { ReactNode } from 'react'

type Variant = 'primary' | 'danger' | 'outline'

export function ActionButton({
  children,
  onClick,
  variant = 'primary',
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  disabled?: boolean
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all active:scale-95 disabled:opacity-50 min-w-[120px]'

  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',

    danger: 'bg-red-600 text-white hover:bg-red-700',

    outline:
      'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-300 hover:text-black hover:shadow-sm',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  )
}
