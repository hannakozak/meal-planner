import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal/auth'

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
