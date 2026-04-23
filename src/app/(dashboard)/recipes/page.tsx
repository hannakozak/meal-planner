import { PrimaryActionButton } from '@/components/buttons/primaryActionButton'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function RecipesPage() {
  const recipes = await prisma.recipe.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Recipes</h1>
        <PrimaryActionButton href="/recipes/new">
          <Plus size={18} />
          New Recipe
        </PrimaryActionButton>
      </div>
      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <p className="text-lg font-medium">No recipes yet</p>
          <p className="text-sm mb-4">Start by creating your first recipe</p>

          <PrimaryActionButton href="/recipes/new">
            <Plus size={18} />
            New Recipe
          </PrimaryActionButton>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="group block p-6 bg-white border rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold tracking-tight group-hover:text-black transition">
                {recipe.title}
              </h2>
              {recipe.description && (
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {recipe.description}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                {recipe.cookingTime && <span>⏱ {recipe.cookingTime} min</span>}

                <span className="opacity-0 group-hover:opacity-100 transition">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
