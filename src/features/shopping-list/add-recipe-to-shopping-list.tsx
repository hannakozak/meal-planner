'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { addRecipeToShoppingList } from '@/lib/actions/shopping-list.actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ShoppingList = {
  id: string
  title: string
}

type Props = {
  shoppingLists: ShoppingList[]
  recipeId: string
}

export function AddRecipeToShoppingList({ shoppingLists, recipeId }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedListId, setSelectedListId] = useState('')

  async function handleAddIngredients() {
    if (!selectedListId) {
      toast.error('Please select a shopping list')
      return
    }

    try {
      const result = await addRecipeToShoppingList(recipeId, selectedListId)

      toast.success(result.message)
      setOpen(false)
      setSelectedListId('')
      router.refresh()
    } catch {
      toast.error('Could not add ingredients to shopping list')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add ingredients to shopping list</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add ingredients to shopping list</DialogTitle>
        </DialogHeader>

        {shoppingLists.length > 0 ? (
          <div className="space-y-4">
            <label htmlFor="shopping-list" className="text-sm font-medium">
              Select shopping list
            </label>

            <select
              id="shopping-list"
              value={selectedListId}
              onChange={(event) => setSelectedListId(event.target.value)}
              className="w-full rounded-md border bg-background p-2 text-sm"
            >
              <option value="">Choose a list</option>
              {shoppingLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            You don't have any shopping lists yet.
          </p>
        )}
        <Button
          onClick={handleAddIngredients}
          disabled={!selectedListId}
          className="w-full"
        >
          Add ingredients
        </Button>
      </DialogContent>
    </Dialog>
  )
}
