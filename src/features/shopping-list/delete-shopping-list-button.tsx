'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { deleteShoppingList } from '@/lib/actions/shopping-list.actions'

type DeleteShoppingListButtonProps = {
  id: string
}

export function DeleteShoppingListButton({
  id,
}: DeleteShoppingListButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this shopping list?',
    )

    if (!confirmed) return

    startTransition(async () => {
      try {
        await deleteShoppingList(id)
        router.refresh()
      } catch (error) {
        console.error('Failed to delete shopping list:', error)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete shopping list"
      title="Delete shopping list"
      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  )
}
