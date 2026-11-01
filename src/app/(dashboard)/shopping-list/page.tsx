import { getUserShoppingLists } from '@/lib/dal/shopping-list'
import { CreateShoppingListForm } from '@/features/shopping-list/create-shopping-list-form'
import { DeleteShoppingListButton } from '@/features/shopping-list/delete-shopping-list-button'
import Link from 'next/link'

export default async function ShoppingListPage() {
  const shoppingLists = await getUserShoppingLists()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shopping Lists
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Organise your shopping in one place.
          </p>
        </div>

        <CreateShoppingListForm />
      </div>

      {shoppingLists.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No shopping lists yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Create your first shopping list to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shoppingLists.map((list) => (
            <div
              key={list.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <Link href={`/shopping-list/${list.id}`} className="flex-1">
                  <h2 className="font-semibold text-gray-900 hover:text-green-700">
                    {list.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {list._count.items} items
                  </p>
                </Link>

                <DeleteShoppingListButton id={list.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
