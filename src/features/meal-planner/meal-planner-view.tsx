import { MealType, WeekDay } from '@prisma/client'
import { MEAL_TYPES, WEEK_DAYS } from './constants'
import { formatWeekDate } from './utils'
import { WeekNavigation } from './week-navigation'

type Meal = {
  day: WeekDay | null
  mealType: MealType
  recipe: {
    title: string
  }
}

type MealPlannerViewProps = {
  monday: Date
  sunday: Date
  meals: Meal[]
}

export function MealPlannerView({
  monday,
  sunday,
  meals,
}: MealPlannerViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Meal Planner
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Plan your meals for the week.
        </p>
      </div>

      <WeekNavigation monday={monday} sunday={sunday} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {WEEK_DAYS.map(({ key, label }, index) => {
          const date = new Date(monday)
          date.setDate(monday.getDate() + index)

          return (
            <div
              key={key}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="border-b border-gray-100 pb-3">
                <h2 className="font-semibold text-gray-900">{label}</h2>

                <p className="mt-1 text-sm text-gray-400">
                  {formatWeekDate(date)}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {MEAL_TYPES.map((mealType) => {
                  const meal = meals.find(
                    (meal) => meal.day === key && meal.mealType === mealType,
                  )

                  return (
                    <div
                      key={mealType}
                      className="rounded-xl border border-dashed border-gray-300 p-3"
                    >
                      <p className="text-xs font-medium uppercase text-gray-400">
                        {mealType}
                      </p>

                      {meal ? (
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {meal.recipe.title}
                        </p>
                      ) : (
                        <button
                          type="button"
                          className="mt-2 text-sm text-gray-400 hover:text-gray-700"
                        >
                          + Add recipe
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
