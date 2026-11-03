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

export async function getUserShoppingListById(id: string) {
  const { userId } = await verifySession()

  return prisma.shoppingList.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })
}
type CreateShoppingListItemInput = {
  shoppingListId: string
  name: string
  quantity?: number
  unit?: string
}

export async function createShoppingListItem({
  shoppingListId,
  name,
  quantity,
  unit,
}: CreateShoppingListItemInput) {
  const { userId } = await verifySession()

  const shoppingList = await prisma.shoppingList.findFirst({
    where: {
      id: shoppingListId,
      userId,
    },
    select: {
      id: true,
    },
  })

  if (!shoppingList) {
    throw new Error('Shopping list not found')
  }

  return prisma.shoppingListItem.create({
    data: {
      name: name.trim(),
      quantity,
      unit: unit?.trim() || null,
      shoppingListId: shoppingList.id,
    },
  })
}
export async function toggleShoppingListItem(id: string) {
  const { userId } = await verifySession()

  const item = await prisma.shoppingListItem.findFirst({
    where: {
      id,
      shoppingList: {
        userId,
      },
    },
    select: {
      id: true,
      isPurchased: true,
    },
  })

  if (!item) {
    throw new Error('Shopping list item not found')
  }

  return prisma.shoppingListItem.update({
    where: {
      id: item.id,
    },
    data: {
      isPurchased: !item.isPurchased,
    },
  })
}
