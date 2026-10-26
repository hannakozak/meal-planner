import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal/auth'
import { MealType, WeekDay } from '@prisma/client'

type GetMealPlannerDataInput = {
  monday: Date
  sunday: Date
}

export async function getMealPlannerData({
  monday,
  sunday,
}: GetMealPlannerDataInput) {
  const { userId } = await verifySession()

  let mealPlan = await prisma.mealPlan.findFirst({
    where: {
      userId,
      weekStart: monday,
      weekEnd: sunday,
    },
    include: {
      meals: {
        include: {
          recipe: true,
        },
      },
    },
  })

  if (!mealPlan) {
    mealPlan = await prisma.mealPlan.create({
      data: {
        userId,
        weekStart: monday,
        weekEnd: sunday,
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

  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      title: 'asc',
    },
  })

  return {
    mealPlan,
    recipes,
  }
}

type AddRecipeToMealPlanInput = {
  mealPlanId: string
  recipeId: string
  day: WeekDay
  mealType: MealType
}

export async function addUserMeal({
  mealPlanId,
  recipeId,
  day,
  mealType,
}: AddRecipeToMealPlanInput) {
  const { userId } = await verifySession()

  const mealPlan = await prisma.mealPlan.findFirst({
    where: {
      id: mealPlanId,
      userId,
    },
  })

  if (!mealPlan) {
    throw new Error('Meal plan not found')
  }

  const recipe = await prisma.recipe.findFirst({
    where: {
      id: recipeId,
      authorId: userId,
    },
    select: {
      id: true,
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
    select: {
      id: true,
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

export async function removeUserMeal(mealPlanRecipeId: string) {
  const { userId } = await verifySession()

  const meal = await prisma.mealPlanRecipe.findFirst({
    where: {
      id: mealPlanRecipeId,
      mealPlan: {
        userId,
      },
    },
    select: {
      id: true,
    },
  })

  if (!meal) {
    throw new Error('Meal not found')
  }

  await prisma.mealPlanRecipe.delete({
    where: {
      id: meal.id,
    },
  })
}

export async function updateUserMeal(
  mealPlanRecipeId: string,
  recipeId: string,
) {
  const { userId } = await verifySession()

  const meal = await prisma.mealPlanRecipe.findFirst({
    where: {
      id: mealPlanRecipeId,
      mealPlan: {
        userId,
      },
    },
    select: {
      id: true,
    },
  })

  if (!meal) {
    throw new Error('Meal not found')
  }

  const recipe = await prisma.recipe.findFirst({
    where: {
      id: recipeId,
      authorId: userId,
    },
    select: {
      id: true,
    },
  })

  if (!recipe) {
    throw new Error('Recipe not found')
  }

  return prisma.mealPlanRecipe.update({
    where: {
      id: meal.id,
    },
    data: {
      recipeId: recipe.id,
    },
    include: {
      recipe: true,
    },
  })
}
