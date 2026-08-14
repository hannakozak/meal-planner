import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { PrimaryActionButton } from '@/components/buttons/primaryActionButton'
import { EditRecipeDialog } from '@/components/editRecipeDialog'
import { DeleteButton } from '@/components/buttons/deleteButton'
import { deleteRecipe } from '@/lib/actions/recipe.actions'
import { Plus, Clock, ChefHat } from 'lucide-react'
import { GenerateRecipeButton } from '@/components/buttons/generateRecipeButton'
import { auth } from '@/auth'

export default async function RecipesPage() {
  const session = await auth()
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Recipes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>
        <PrimaryActionButton href="/recipes/new">
          <Plus size={16} />
          New Recipe
        </PrimaryActionButton>
      </div>

      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <ChefHat size={28} className="text-gray-400" />
          </div>
          <p className="text-base font-medium text-gray-700">No recipes yet</p>
          <p className="text-sm text-gray-400 mt-1 mb-6">
            Start by creating your first recipe
          </p>
          <PrimaryActionButton href="/recipes/new">
            <Plus size={16} />
            New Recipe
          </PrimaryActionButton>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="h-44 w-full object-cover"
                />
              )}
              <Link href={`/recipes/${recipe.id}`} className="block p-5 flex-1">
                <h2 className="text-base font-semibold text-gray-900 leading-snug truncate">
                  {recipe.title}
                </h2>
                {recipe.description && (
                  <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                )}
                {recipe.cookingTime && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <Clock size={13} />
                    {recipe.cookingTime} min
                  </div>
                )}
              </Link>

              <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between mt-auto">
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
                >
                  View recipe →
                </Link>
                <div className="flex items-center gap-1">
                  <EditRecipeDialog recipe={recipe} />
                  <DeleteButton
                    id={recipe.id}
                    action={deleteRecipe}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        {session?.user && <GenerateRecipeButton />}
      </div>
    </div>
  )
}
