import Link from 'next/link'
import { Leaf } from 'lucide-react'

type LogoProps = {
  href?: string
}

export function Logo({ href = '/' }: LogoProps) {
  return (
    <Link href={href} className="flex items-center gap-2 font-bold text-2xl">
      <Leaf className="h-6 w-6 text-primary stroke-3" />
      <span>Meal Planner</span>
    </Link>
  )
}
