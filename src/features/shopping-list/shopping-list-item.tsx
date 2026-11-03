'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleShoppingItem } from '@/lib/actions/shopping-list.actions'

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

      {item.quantity != null && (
        <span className="shrink-0 text-sm text-gray-500">
          {item.quantity} {item.unit}
        </span>
      )}
    </div>
  )
}
