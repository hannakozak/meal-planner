'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { addShoppingListItem } from '@/lib/actions/shopping-list.actions'

type AddShoppingListItemFormProps = {
  shoppingListId: string
}

export function AddShoppingListItemForm({
  shoppingListId,
}: AddShoppingListItemFormProps) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) return

    startTransition(async () => {
      try {
        await addShoppingListItem({
          shoppingListId,
          name,
          ...(quantity.trim() && { quantity: Number(quantity) }),
          ...(unit.trim() && { unit }),
        })

        setName('')
        setQuantity('')
        setUnit('')
        router.refresh()
      } catch (error) {
        console.error('Failed to add shopping list item:', error)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Item name
        </label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Milk"
          maxLength={100}
          required
          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div className="sm:w-24">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          min="0.01"
          step="any"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="e.g. 2"
          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div className="sm:w-28">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Unit
        </label>
        <input
          type="text"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          placeholder="e.g. litres"
          maxLength={30}
          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || !name.trim()}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus size={16} />
        {isPending ? 'Adding...' : 'Add item'}
      </button>
    </form>
  )
}
