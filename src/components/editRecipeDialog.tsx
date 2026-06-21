'use client'

import { useTransition } from 'react'
import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { updateRecipe } from '@/lib/actions/recipe.actions'
import { ActionButton } from '@/components/buttons/actionButton'

type EditRecipeDialogProps = {
  recipe: {
    id: string
    title: string
    description?: string | null
    cookingTime?: number | null
    servings?: number | null
    instructions?: string[]
  }
}

export function EditRecipeDialog({ recipe }: EditRecipeDialogProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ActionButton variant="outline" size="sm">
          <Pencil size={14} />
          Edit
        </ActionButton>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Recipe Details</DialogTitle>
        </DialogHeader>

        <form
          action={(formData) =>
            startTransition(async () => {
              await updateRecipe(recipe.id, formData)
            })
          }
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Recipe title
            </label>
            <input
              name="title"
              defaultValue={recipe.title}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={recipe.description ?? ''}
              className="min-h-24 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Cooking time
              </label>
              <input
                name="cookingTime"
                type="number"
                defaultValue={recipe.cookingTime ?? ''}
                placeholder="Minutes"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Servings
              </label>
              <input
                name="servings"
                type="number"
                defaultValue={recipe.servings ?? ''}
                placeholder="Number of servings"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Instructions
            </label>
            <textarea
              name="instructions"
              defaultValue={(recipe.instructions ?? []).join('\n')}
              placeholder="Write each step on a new line"
              className="min-h-56 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-green-500"
            />
            <p className="text-xs text-gray-500">
              Write each instruction step on a separate line.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </DialogClose>

            <button
              disabled={isPending}
              className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
