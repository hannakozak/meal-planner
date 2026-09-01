'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { removeRecipeFromMealPlan } from '@/lib/actions/meal-plan.actions'

type RemoveMealButtonProps = {
  mealPlanRecipeId: string
}

export function RemoveMealButton({ mealPlanRecipeId }: RemoveMealButtonProps) {
  const [isPending, setIsPending] = useState(false)

  async function handleRemove() {
    setIsPending(true)

    try {
      await removeRecipeFromMealPlan(mealPlanRecipeId)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={isPending}
      aria-label="Remove recipe"
      className="text-gray-400 transition-colors hover:text-red-500 disabled:opacity-50"
    >
      <X size={15} />
    </button>
  )
}
