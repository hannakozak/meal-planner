import Link from 'next/link'
import { ReactNode } from 'react'

export function PrimaryActionButton({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:opacity-90 transition active:scale-95"
    >
      {children}
    </Link>
  )
}
