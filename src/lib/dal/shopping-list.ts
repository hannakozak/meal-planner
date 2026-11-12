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
export async function deleteShoppingListItem(id: string) {
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
      shoppingListId: true,
    },
  })

  if (!item) {
    throw new Error('Shopping list item not found')
  }

  await prisma.shoppingListItem.delete({
    where: {
      id: item.id,
    },
  })

  return item.shoppingListId
}
type UpdateShoppingListItemInput = {
  id: string
  name: string
  quantity?: number
  unit?: string
}

export async function updateShoppingListItem({
  id,
  name,
  quantity,
  unit,
}: UpdateShoppingListItemInput) {
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
      name: name.trim(),
      quantity,
      unit: unit?.trim() || null,
    },
  })
}

type AddRecipeIngredientsInput = {
  recipeId: string
  shoppingListId: string
}

function normalizeUnit(unit: string | null | undefined) {
  const value = unit?.trim().toLowerCase()

  if (!value) return null

  const units: Record<string, { group: string; factor: number }> = {
    g: { group: 'weight', factor: 1 },
    gram: { group: 'weight', factor: 1 },
    grams: { group: 'weight', factor: 1 },
    kg: { group: 'weight', factor: 1000 },
    kilogram: { group: 'weight', factor: 1000 },
    kilograms: { group: 'weight', factor: 1000 },

    ml: { group: 'volume', factor: 1 },
    millilitre: { group: 'volume', factor: 1 },
    millilitres: { group: 'volume', factor: 1 },
    milliliter: { group: 'volume', factor: 1 },
    milliliters: { group: 'volume', factor: 1 },
    l: { group: 'volume', factor: 1000 },
    litre: { group: 'volume', factor: 1000 },
    litres: { group: 'volume', factor: 1000 },
    liter: { group: 'volume', factor: 1000 },
    liters: { group: 'volume', factor: 1000 },

    pc: { group: 'count', factor: 1 },
    pcs: { group: 'count', factor: 1 },
    piece: { group: 'count', factor: 1 },
    pieces: { group: 'count', factor: 1 },
  }

  const normalized = units[value]

  return normalized
    ? { ...normalized, original: value }
    : { group: value, factor: 1, original: value }
}

export async function addRecipeIngredientsToShoppingList({
  recipeId,
  shoppingListId,
}: AddRecipeIngredientsInput) {
  const { userId } = await verifySession()

  const [shoppingList, recipe] = await Promise.all([
    prisma.shoppingList.findFirst({
      where: {
        id: shoppingListId,
        userId,
      },
      select: { id: true },
    }),
    prisma.recipe.findFirst({
      where: {
        id: recipeId,
        authorId: userId,
      },
      include: {
        ingredients: {
          include: {
            ingredient: {
              select: { name: true },
            },
          },
        },
      },
    }),
  ])

  if (!shoppingList) throw new Error('Shopping list not found')
  if (!recipe) throw new Error('Recipe not found')
  if (recipe.ingredients.length === 0) {
    throw new Error('Recipe has no ingredients')
  }

  return prisma.$transaction(async (tx) => {
    const existingItems = await tx.shoppingListItem.findMany({
      where: { shoppingListId: shoppingList.id },
    })

    for (const ingredient of recipe.ingredients) {
      const name = ingredient.ingredient.name.trim()
      const incomingUnit = normalizeUnit(ingredient.unit)

      const existingItem = existingItems.find((item) => {
        const existingUnit = normalizeUnit(item.unit)

        return (
          item.name.trim().toLowerCase() === name.toLowerCase() &&
          existingUnit?.group === incomingUnit?.group
        )
      })

      if (existingItem) {
        const existingUnit = normalizeUnit(existingItem.unit)

        let quantity = existingItem.quantity

        if (ingredient.quantity !== null && incomingUnit && existingUnit) {
          const convertedQuantity =
            (ingredient.quantity * incomingUnit.factor) / existingUnit.factor

          quantity = (existingItem.quantity ?? 0) + convertedQuantity
        }
        await tx.shoppingListItem.update({
          where: { id: existingItem.id },
          data: {
            quantity,
            isPurchased: false,
          },
        })

        existingItem.quantity = quantity
        existingItem.isPurchased = false
      } else {
        const newItem = await tx.shoppingListItem.create({
          data: {
            name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            shoppingListId: shoppingList.id,
          },
        })

        existingItems.push(newItem)
      }
    }
  })
}
