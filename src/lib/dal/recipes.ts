import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal/auth'

export type UserRecipeDTO = {
  id: string
  title: string
  description: string | null
  imageUrl: string | null
  cookingTime: number | null
  servings: number | null
  instructions: string[]
}

export async function getUserRecipes(): Promise<UserRecipeDTO[]> {
  const { userId } = await verifySession()

  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      cookingTime: true,
      servings: true,
      instructions: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return recipes
}
