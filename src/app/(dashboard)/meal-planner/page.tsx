import { getMealPlannerData } from '@/lib/dal/meal-planner'
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

  const { mealPlan, recipes } = await getMealPlannerData({
    monday,
    sunday,
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
