'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="p-2 rounded-md hover:bg-gray-100 transition"
    >
      <LogOut size={18} />
    </button>
  )
}
