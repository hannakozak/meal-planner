import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { MealPlannerView } from '@/features/meal-planner/meal-planner-view'
import { getCurrentWeek, getWeekFromDate } from '@/features/meal-planner/utils'

type MealPlannerPageProps = {
  searchParams: Promise<{
    week?: string
  }>
}

export default async function MealPlannerPage({
  searchParams,
}: MealPlannerPageProps) {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const params = await searchParams

  let monday: Date
  let sunday: Date

  if (params.week) {
    const selectedDate = new Date(`${params.week}T00:00:00`)

    if (Number.isNaN(selectedDate.getTime())) {
      const currentWeek = getCurrentWeek()
      monday = currentWeek.monday
      sunday = currentWeek.sunday
    } else {
      const selectedWeek = getWeekFromDate(selectedDate)
      monday = selectedWeek.monday
      sunday = selectedWeek.sunday
    }
  } else {
    const currentWeek = getCurrentWeek()
    monday = currentWeek.monday
    sunday = currentWeek.sunday
  }

  let mealPlan = await prisma.mealPlan.findFirst({
    where: {
      userId: session.user.id,
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
        userId: session.user.id,
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
      authorId: session.user.id,
    },
    orderBy: {
      title: 'asc',
    },
  })

  return (
    <MealPlannerView
      mealPlanId={mealPlan.id}
      monday={monday}
      sunday={sunday}
      meals={mealPlan.meals}
      recipes={recipes}
    />
  )
}
