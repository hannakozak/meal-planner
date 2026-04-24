'use client'

import { Trash } from 'lucide-react'
import { ActionButton } from '@/components/buttons/actionButton'

export function DeleteButton({
  id,
  action,
  size = 'md',
}: {
  id: string
  action: (formData: FormData) => Promise<void>
  size?: 'sm' | 'md'
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <ActionButton variant="ghost-danger" size={size} type="submit">
        <Trash size={size === 'sm' ? 12 : 14} />
        Delete
      </ActionButton>
    </form>
  )
}
