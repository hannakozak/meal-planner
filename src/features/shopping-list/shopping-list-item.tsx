'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleShoppingItem } from '@/lib/actions/shopping-list.actions'
import { Trash2 } from 'lucide-react'
import { deleteShoppingItem } from '@/lib/actions/shopping-list.actions'

type ShoppingListItemProps = {
  item: {
    id: string
    name: string
    quantity: number | null
    unit: string | null
    isPurchased: boolean
  }
  shoppingListId: string
}

export function ShoppingListItem({
  item,
  shoppingListId,
}: ShoppingListItemProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleToggle() {
    startTransition(async () => {
      try {
        await toggleShoppingItem(item.id, shoppingListId)
        router.refresh()
      } catch (error) {
        console.error('Failed to update shopping list item:', error)
      }
    })
  }
  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteShoppingItem(item.id)
        router.refresh()
      } catch (error) {
        console.error('Failed to delete shopping list item:', error)
      }
    })
  }

  return (
    <div
      className={`flex items-center justify-between gap-4 border-b border-gray-100 py-3 ${
        item.isPurchased ? 'opacity-50' : ''
      }`}
    >
      <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={item.isPurchased}
          onChange={handleToggle}
          disabled={isPending}
          className="h-4 w-4 rounded border-gray-300 accent-green-600"
        />

        <span
          className={`text-sm font-medium text-gray-800 ${
            item.isPurchased ? 'text-gray-400 line-through' : ''
          }`}
        >
          {item.name}
        </span>
      </label>
      <div className="flex shrink-0 items-center gap-3">
        {item.quantity != null && (
          <span className="text-sm text-gray-500">
            {item.quantity} {item.unit}
          </span>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              disabled={isPending}
              aria-label={`Delete ${item.name}`}
              title="Delete item"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete item?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove {item.name} from your shopping
                list? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
