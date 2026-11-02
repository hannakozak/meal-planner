import { notFound } from 'next/navigation'
import { getUserShoppingListById } from '@/lib/dal/shopping-list'
import { AddShoppingListItemForm } from '@/features/shopping-list/add-shopping-list-item-form'

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
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-100 py-3"
              >
                <span className="text-sm font-medium text-gray-800">
                  {item.name}
                </span>
                {item.quantity && (
                  <span className="text-sm text-gray-500">
                    {item.quantity} {item.unit}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
