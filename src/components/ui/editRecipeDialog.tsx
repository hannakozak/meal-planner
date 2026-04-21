'use client'

import { useState, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function EditRecipeDialog({
  recipe,
  action,
}: {
  recipe: any
  action: (formData: FormData) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit recipe</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()

            const formData = new FormData(e.currentTarget)

            startTransition(async () => {
              await action(formData)
              setOpen(false)
            })
          }}
        >
          <Input name="title" defaultValue={recipe.title} />

          <Textarea
            name="description"
            defaultValue={recipe.description ?? ''}
          />

          <Input
            name="cookingTime"
            type="number"
            defaultValue={recipe.cookingTime ?? ''}
          />

          <Input
            name="servings"
            type="number"
            defaultValue={recipe.servings ?? ''}
          />

          <Button disabled={isPending} className="w-full">
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
