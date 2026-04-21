import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function RecipesPage() {
  const recipes = await prisma.recipe.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Recipes</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="block p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{recipe.title}</h2>

            {recipe.description && (
              <p className="text-sm text-gray-500 mt-2">{recipe.description}</p>
            )}
            <div className="mt-4 text-sm text-gray-400">
              {recipe.cookingTime && <span>⏱ {recipe.cookingTime} min</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
