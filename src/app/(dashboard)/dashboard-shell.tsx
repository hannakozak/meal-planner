'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ShoppingCart,
  Settings,
  X,
  Menu,
} from 'lucide-react'
import { LogoutButton } from '@/features/auth/logout-button'
import { Logo } from '@/components/ui/logo'

type DashboardShellProps = {
  children: ReactNode
  userName?: string
}

export function DashboardShell({ children, userName }: DashboardShellProps) {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/recipes', label: 'Recipes', icon: BookOpen },
    { href: '/planner', label: 'Meal Planner', icon: CalendarDays },
    { href: '/shopping-list', label: 'Shopping List', icon: ShoppingCart },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen flex bg-gray-50">
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        aria-label="Sidebar navigation"
        className={`
          fixed lg:static z-50 top-0 left-0 h-full w-64 bg-white border-r
          transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <Logo />
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
      ${
        pathname === href
          ? 'text-primary font-medium'
          : 'hover:text-primary hover:font-medium'
      }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </aside>

      <div className="flex-1 flex flex-col w-full">
        <header className="h-16 bg-white border-b flex items-center px-6">
          <button
            className="lg:hidden mr-4"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
          >
            <Menu size={20} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
              {userName?.charAt(0).toUpperCase()}
            </div>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
