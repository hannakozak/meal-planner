import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { deleteRecipe, updateRecipe } from '@/lib/actions/recipe.actions'
import { DeleteButton } from '@/components/buttons/deleteButton'
import { EditRecipeDialog } from '@/components/editRecipeDialog'
import Image from 'next/image'

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  })

  if (!recipe) return notFound()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>

        {recipe.description && (
          <p className="text-gray-600 text-base leading-relaxed">
            {recipe.description}
          </p>
        )}
      </div>
      {recipe.imageUrl && (
        <div className="relative h-72 w-full overflow-hidden rounded-2xl">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-1">
        <EditRecipeDialog recipe={recipe} />
        <DeleteButton id={recipe.id} action={deleteRecipe} size="sm" />
      </div>
      <div className="flex gap-6 text-sm text-gray-500">
        {recipe.cookingTime && (
          <div className="flex items-center gap-2">
            <span>⏱</span>
            <span>{recipe.cookingTime} min</span>
          </div>
        )}

        {recipe.servings && (
          <div className="flex items-center gap-2">
            <span>🍽</span>
            <span>{recipe.servings} servings</span>
          </div>
        )}
      </div>

      {recipe.ingredients.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ingredients</h2>

          <ul className="space-y-2">
            {recipe.ingredients.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span className="font-medium">{item.ingredient.name}</span>

                <span className="text-gray-500">
                  {item.quantity} {item.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipe.instructions && recipe.instructions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Instructions</h2>

          <div className="grid gap-4">
            {recipe.instructions.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="min-w-[36px] h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
