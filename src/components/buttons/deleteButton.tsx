'use client'

import { useTransition } from 'react'
import { Trash } from 'lucide-react'
import { ActionButton } from './actionButton'

export function DeleteButton({ action }: { action: () => Promise<void> }) {
  const [isPending, startTransition] = useTransition()

  return (
    <ActionButton
      variant="danger"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await action()
        })
      }
    >
      <Trash size={16} />
      {isPending ? 'Deleting...' : 'Delete'}
    </ActionButton>
  )
}
