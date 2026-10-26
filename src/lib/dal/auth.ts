import 'server-only'

import { auth } from '@/auth'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export const verifySession = cache(async () => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/signin')
  }

  return {
    userId: session.user.id,
  }
})

export async function createUser({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })
}
