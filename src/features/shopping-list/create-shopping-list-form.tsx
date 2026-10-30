'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { createShoppingList } from '@/lib/actions/shopping-list.actions'

export function CreateShoppingListForm() {
  const [title, setTitle] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) return

    startTransition(async () => {
      try {
        await createShoppingList(title)
        setTitle('')
        router.refresh()
      } catch (error) {
        console.error('Failed to create shopping list:', error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. Weekly Shopping"
        maxLength={100}
        className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />

      <button
        type="submit"
        disabled={isPending || !title.trim()}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus size={16} />
        {isPending ? 'Creating...' : 'Create list'}
      </button>
    </form>
  )
}
