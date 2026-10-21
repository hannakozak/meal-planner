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

export type RecipeIngredientInput = {
  name: string
  quantity: number | null
  unit: string | null
  note: string | null
}

export type CreateUserRecipeInput = {
  title: string
  description: string | null
  imageUrl: string | null
  cookingTime: number | null
  servings: number | null
  instructions: string[]
  ingredients: RecipeIngredientInput[]
}

export type UpdateUserRecipeInput = {
  title: string
  description: string | null
  cookingTime: number | null
  servings: number | null
  instructions: string[]
}

export async function getUserRecipes(): Promise<UserRecipeDTO[]> {
  const { userId } = await verifySession()

  return prisma.recipe.findMany({
    where: { authorId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      cookingTime: true,
      servings: true,
      instructions: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function createUserRecipe(input: CreateUserRecipeInput) {
  const { userId } = await verifySession()

  return prisma.$transaction(async (tx) => {
    const ingredients = await Promise.all(
      input.ingredients.map(async (item) => {
        const name = item.name.trim().toLowerCase()

        const ingredient = await tx.ingredient.upsert({
          where: { name },
          update: {},
          create: { name },
        })

        return {
          ingredientId: ingredient.id,
          quantity: item.quantity,
          unit: item.unit,
          note: item.note,
        }
      }),
    )

    return tx.recipe.create({
      data: {
        title: input.title,
        description: input.description,
        imageUrl: input.imageUrl,
        cookingTime: input.cookingTime,
        servings: input.servings,
        instructions: input.instructions,
        authorId: userId,
        ingredients: {
          create: ingredients,
        },
      },
      select: { id: true },
    })
  })
}

export async function updateUserRecipe(
  id: string,
  input: UpdateUserRecipeInput,
) {
  const { userId } = await verifySession()

  const result = await prisma.recipe.updateMany({
    where: {
      id,
      authorId: userId,
    },
    data: {
      title: input.title,
      description: input.description,
      cookingTime: input.cookingTime,
      servings: input.servings,
      instructions: input.instructions,
    },
  })

  if (result.count === 0) {
    throw new Error('Recipe not found')
  }
}

export async function deleteUserRecipe(id: string) {
  const { userId } = await verifySession()

  await prisma.$transaction(async (tx) => {
    const recipe = await tx.recipe.findFirst({
      where: {
        id,
        authorId: userId,
      },
      select: { id: true },
    })

    if (!recipe) {
      throw new Error('Recipe not found')
    }

    await tx.recipeIngredient.deleteMany({
      where: { recipeId: recipe.id },
    })
    await tx.recipeTranslation.deleteMany({
      where: { recipeId: recipe.id },
    })
    await tx.recipeCategory.deleteMany({
      where: { recipeId: recipe.id },
    })
    await tx.favorite.deleteMany({
      where: { recipeId: recipe.id },
    })
    await tx.mealPlanRecipe.deleteMany({
      where: { recipeId: recipe.id },
    })

    const result = await tx.recipe.deleteMany({
      where: {
        id: recipe.id,
        authorId: userId,
      },
    })

    if (result.count === 0) {
      throw new Error('Recipe not found')
    }
  })
}
