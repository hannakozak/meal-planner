import { notFound } from 'next/navigation'
import { getUserShoppingListById } from '@/lib/dal/shopping-list'
import { AddShoppingListItemForm } from '@/features/shopping-list/add-shopping-list-item-form'
import { ShoppingListItem } from '@/features/shopping-list/shopping-list-item'

type ShoppingListPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ShoppingListPage({
  params,
}: ShoppingListPageProps) {
  const { id } = await params

  const shoppingList = await getUserShoppingListById(id)

  if (!shoppingList) {
    notFound()
  }

  const totalItems = shoppingList.items.length

  const purchasedItems = shoppingList.items.filter(
    (item) => item.isPurchased,
  ).length

  const remainingItems = totalItems - purchasedItems

  const progress =
    totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {shoppingList.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">Manage your shopping list.</p>
      </div>
      <AddShoppingListItemForm shoppingListId={shoppingList.id} />
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Shopping progress</h2>
            <p className="mt-1 text-sm text-gray-500">
              {purchasedItems} of {totalItems} items purchased
            </p>
          </div>

          <span className="text-lg font-semibold text-green-600">
            {progress}%
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-500">
          {remainingItems} {remainingItems === 1 ? 'item' : 'items'} remaining
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        {shoppingList.items.length === 0 ? (
          <div className="py-8 text-center">
            <h2 className="font-semibold text-gray-900">Your list is empty</h2>
            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first item.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {shoppingList.items.map((item) => (
              <ShoppingListItem
                key={item.id}
                item={item}
                shoppingListId={shoppingList.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
