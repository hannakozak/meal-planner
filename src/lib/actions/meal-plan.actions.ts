'use server'

import {
  addUserMeal,
  removeUserMeal,
  updateUserMeal,
} from '@/lib/dal/meal-planner'
import { MealType, WeekDay } from '@prisma/client'
import { revalidatePath } from 'next/cache'

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
  const meal = await addUserMeal({
    mealPlanId,
    recipeId,
    day,
    mealType,
  })

  revalidatePath('/meal-planner')

  return meal
}

export async function removeRecipeFromMealPlan(mealPlanRecipeId: string) {
  await removeUserMeal(mealPlanRecipeId)

  revalidatePath('/meal-planner')
}

export async function updateMealPlanRecipe({
  mealPlanRecipeId,
  recipeId,
}: {
  mealPlanRecipeId: string
  recipeId: string
}) {
  const updatedMeal = await updateUserMeal(mealPlanRecipeId, recipeId)

  revalidatePath('/meal-planner')

  return updatedMeal
}
