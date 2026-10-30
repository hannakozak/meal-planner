import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal/auth'

export async function getUserShoppingLists() {
  const { userId } = await verifySession()

  return prisma.shoppingList.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      _count: {
        select: {
          items: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function createUserShoppingList(title: string) {
  const { userId } = await verifySession()

  return prisma.shoppingList.create({
    data: {
      title: title.trim(),
      userId,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  })
}

export async function deleteUserShoppingList(id: string) {
  const { userId } = await verifySession()

  const result = await prisma.shoppingList.deleteMany({
    where: {
      id,
      userId,
    },
  })

  if (result.count === 0) {
    throw new Error('Shopping list not found')
  }
}
