import { MealType, WeekDay } from '@prisma/client'
import { MEAL_TYPES, WEEK_DAYS } from './constants'
import { formatWeekDate } from './utils'
import { WeekNavigation } from './week-navigation'
import { AddRecipeDialog } from './add-recipe-dialog'
import { RemoveMealButton } from './remove-meal-button'
import { EditMealDialog } from './edit-meal-dialog'

type Meal = {
  id: string
  day: WeekDay | null
  mealType: MealType
  recipe: {
    id: string
    title: string
  }
}

type Recipe = {
  id: string
  title: string
  imageUrl: string | null
}

type MealPlannerViewProps = {
  mealPlanId: string
  monday: Date
  sunday: Date
  meals: Meal[]
  recipes: Recipe[]
}

export function MealPlannerView({
  mealPlanId,
  monday,
  sunday,
  meals,
  recipes,
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                      className="min-h-[112px] rounded-xl border border-gray-200 bg-gray-50/50 p-3 transition-colors hover:border-gray-300"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {mealType}
                      </p>

                      {meal ? (
                        <div className="mt-3 flex items-start justify-between gap-2">
                          <p className="line-clamp-3 text-sm font-semibold leading-5 text-gray-900">
                            {meal.recipe.title}
                          </p>

                          <div className="flex items-center gap-x-0.5">
                            <EditMealDialog
                              mealPlanRecipeId={meal.id}
                              currentRecipeId={meal.recipe.id}
                              recipes={recipes}
                              day={key}
                              mealType={mealType}
                            />

                            <RemoveMealButton mealPlanRecipeId={meal.id} />
                          </div>
                        </div>
                      ) : (
                        <AddRecipeDialog
                          mealPlanId={mealPlanId}
                          recipes={recipes}
                          day={key}
                          mealType={mealType}
                        />
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
