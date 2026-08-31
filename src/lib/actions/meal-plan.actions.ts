'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { MealType, WeekDay } from '@prisma/client'

export async function getOrCreateMealPlan(weekStart: Date, weekEnd: Date) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const existingMealPlan = await prisma.mealPlan.findFirst({
    where: {
      userId: session.user.id,
      weekStart,
      weekEnd,
    },
    include: {
      meals: {
        include: {
          recipe: true,
        },
      },
    },
  })

  if (existingMealPlan) {
    return existingMealPlan
  }

  return prisma.mealPlan.create({
    data: {
      userId: session.user.id,
      weekStart,
      weekEnd,
    },
    include: {
      meals: {
        include: {
          recipe: true,
        },
      },
    },
  })
}

type AddRecipeToMealPlanInput = {
  mealPlanId: string
  recipeId: string
  day: WeekDay
  mealType: MealType
}

export async function addRecipeToMealPlan({
  mealPlanId,
  recipeId,
  day,
  mealType,
}: AddRecipeToMealPlanInput) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const mealPlan = await prisma.mealPlan.findFirst({
    where: {
      id: mealPlanId,
      userId: session.user.id,
    },
  })

  if (!mealPlan) {
    throw new Error('Meal plan not found')
  }

  const recipe = await prisma.recipe.findFirst({
    where: {
      id: recipeId,
      authorId: session.user.id,
    },
  })

  if (!recipe) {
    throw new Error('Recipe not found')
  }

  const existingMeal = await prisma.mealPlanRecipe.findFirst({
    where: {
      mealPlanId,
      day,
      mealType,
    },
  })

  if (existingMeal) {
    throw new Error('This meal slot is already occupied')
  }

  return prisma.mealPlanRecipe.create({
    data: {
      mealPlanId,
      recipeId,
      day,
      mealType,
    },
    include: {
      recipe: true,
    },
  })
}
