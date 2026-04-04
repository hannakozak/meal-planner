import type { PropsWithChildren } from 'react'
import { DashboardShell } from './dashboard-shell'
import { auth } from '@/auth'

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await auth()

  return (
    <DashboardShell userName={session?.user?.name ?? undefined}>
      {children}
    </DashboardShell>
  )
}
