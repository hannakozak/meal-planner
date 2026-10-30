'use server'

import {
  createUserShoppingList,
  deleteUserShoppingList,
} from '@/lib/dal/shopping-list'
import { revalidatePath } from 'next/cache'

export async function createShoppingList(title: string) {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    throw new Error('Shopping list title is required')
  }

  const shoppingList = await createUserShoppingList(trimmedTitle)

  revalidatePath('/shopping-list')

  return shoppingList
}

export async function deleteShoppingList(id: string) {
  await deleteUserShoppingList(id)

  revalidatePath('/shopping-list')
}
