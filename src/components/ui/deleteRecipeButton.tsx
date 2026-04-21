'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteRecipeButton({
  id,
  action,
}: {
  id: string
  action: (id: string) => Promise<void>
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <button
      disabled={isPending}
      onClick={() => {
        const ok = window.confirm('Delete this recipe permanently?')

        if (!ok) return

        startTransition(async () => {
          await action(id)
          router.push('/recipes')
        })
      }}
      className="px-3 py-1.5 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
