'use client'

import { useState } from 'react'
import { MealType, WeekDay } from '@prisma/client'
import { addRecipeToMealPlan } from '@/lib/actions/meal-plan.actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Recipe = {
  id: string
  title: string
}

type AddRecipeDialogProps = {
  mealPlanId: string
  recipes: Recipe[]
  day: WeekDay
  mealType: MealType
}

export function AddRecipeDialog({
  mealPlanId,
  recipes,
  day,
  mealType,
}: AddRecipeDialogProps) {
  const [open, setOpen] = useState(false)
  const [recipeId, setRecipeId] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  async function handleAdd() {
    if (!recipeId) {
      setError('Please select a recipe.')
      return
    }

    setIsPending(true)
    setError('')

    try {
      await addRecipeToMealPlan({
        mealPlanId,
        recipeId,
        day,
        mealType,
      })

      setOpen(false)
      setRecipeId('')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setIsPending(false)
    }
  }

  function handleOpenChange(value: boolean) {
    setOpen(value)

    if (!value) {
      setRecipeId('')
      setError('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-4 inline-flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-gray-700"
        >
          + Add recipe
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add recipe</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Add a recipe to your {mealType.toLowerCase()} on{' '}
            {day.charAt(0) + day.slice(1).toLowerCase()}
          </p>

          <Select
            value={recipeId}
            onValueChange={(value) => {
              setRecipeId(value)
              setError('')
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a recipe" />
            </SelectTrigger>

            <SelectContent>
              {recipes.map((recipe) => (
                <SelectItem key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAdd}
              disabled={isPending || !recipeId}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? 'Adding...' : 'Add recipe'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
