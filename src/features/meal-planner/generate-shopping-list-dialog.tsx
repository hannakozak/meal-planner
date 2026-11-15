'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { addMealPlanToShoppingList } from '@/lib/actions/shopping-list.actions'

type ShoppingList = {
  id: string
  title: string
}

type Props = {
  shoppingLists: ShoppingList[]
  mealPlanId: string
}

export function GenerateShoppingListDialog({
  shoppingLists,
  mealPlanId,
}: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedListId, setSelectedListId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleGenerateShoppingList() {
    if (!selectedListId) {
      toast.error('Please select a shopping list')
      return
    }

    setIsLoading(true)

    try {
      const result = await addMealPlanToShoppingList(mealPlanId, selectedListId)

      toast.success(result.message)
      setOpen(false)
      setSelectedListId('')
      router.refresh()
    } catch {
      toast.error('Could not generate shopping list')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Generate Shopping List</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Shopping List</DialogTitle>
        </DialogHeader>

        {shoppingLists.length > 0 ? (
          <div className="space-y-4">
            <label htmlFor="meal-shopping-list" className="text-sm font-medium">
              Select shopping list
            </label>

            <select
              id="meal-shopping-list"
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
          onClick={handleGenerateShoppingList}
          disabled={!selectedListId || isLoading}
          className="w-full"
        >
          {isLoading ? 'Generating...' : 'Generate Shopping List'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
