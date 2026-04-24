'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ActionButton } from '@/components/buttons/actionButton'
import { Pencil } from 'lucide-react'
import { useTransition } from 'react'
import { updateRecipe } from '@/lib/actions/recipe.actions'

export function EditRecipeDialog({
  recipe,
}: {
  recipe: {
    id: string
    title: string
    description?: string | null
    cookingTime?: number | null
  }
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ActionButton variant="outline" size="sm">
          <Pencil size={12} />
          Edit
        </ActionButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Recipe</DialogTitle>
        </DialogHeader>
        <form
          action={(formData) =>
            startTransition(async () => {
              await updateRecipe(recipe.id, formData)
            })
          }
          className="space-y-4"
        >
          <Input
            name="title"
            defaultValue={recipe.title}
            placeholder="Recipe title"
            required
          />

          <Textarea
            name="description"
            defaultValue={recipe.description ?? ''}
            placeholder="Description"
          />

          <Input
            name="cookingTime"
            type="number"
            defaultValue={recipe.cookingTime ?? ''}
            placeholder="Cooking time (minutes)"
          />
          <div className="flex justify-end gap-2 pt-2">
            <ActionButton variant="outline">Cancel</ActionButton>

            <ActionButton variant="primary" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save changes'}
            </ActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
