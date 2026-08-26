'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

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
