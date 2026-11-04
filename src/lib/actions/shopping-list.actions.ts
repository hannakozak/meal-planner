'use server'

import {
  createUserShoppingList,
  deleteUserShoppingList,
  createShoppingListItem,
  toggleShoppingListItem,
  deleteShoppingListItem,
  updateShoppingListItem,
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
export async function addShoppingListItem(input: {
  shoppingListId: string
  name: string
  quantity?: number
  unit?: string
}) {
  const name = input.name.trim()

  if (!name) {
    throw new Error('Item name is required')
  }

  if (
    input.quantity !== undefined &&
    (!Number.isFinite(input.quantity) || input.quantity <= 0)
  ) {
    throw new Error('Quantity must be greater than zero')
  }

  const item = await createShoppingListItem({
    ...input,
    name,
  })

  revalidatePath(`/shopping-list/${input.shoppingListId}`)

  return item
}
export async function toggleShoppingItem(id: string, shoppingListId: string) {
  await toggleShoppingListItem(id)

  revalidatePath(`/shopping-list/${shoppingListId}`)
}
export async function deleteShoppingItem(id: string) {
  const shoppingListId = await deleteShoppingListItem(id)

  revalidatePath(`/shopping-list/${shoppingListId}`)
}
export async function updateShoppingItem(input: {
  id: string
  shoppingListId: string
  name: string
  quantity?: number
  unit?: string
}) {
  const name = input.name.trim()

  if (!name) {
    throw new Error('Item name is required')
  }

  if (
    input.quantity !== undefined &&
    (!Number.isFinite(input.quantity) || input.quantity <= 0)
  ) {
    throw new Error('Quantity must be greater than zero')
  }

  await updateShoppingListItem({
    id: input.id,
    name,
    quantity: input.quantity,
    unit: input.unit,
  })

  revalidatePath(`/shopping-list/${input.shoppingListId}`)
}
