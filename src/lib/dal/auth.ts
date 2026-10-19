import 'server-only'

import { auth } from '@/auth'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/signin')
  }

  return {
    userId: session.user.id,
  }
})
