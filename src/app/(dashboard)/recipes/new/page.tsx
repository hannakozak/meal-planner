import { createRecipe } from '@/src/lib/actions/recipe.actions'

export default function NewRecipePage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Add Recipe</h1>

      <form action={createRecipe} className="space-y-4">
        <input
          name="title"
          placeholder="Recipe title"
          className="w-full border p-2 rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded-lg"
        />

        <input
          name="cookingTime"
          type="number"
          placeholder="Cooking time (minutes)"
          className="w-full border p-2 rounded-lg"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Save
        </button>
      </form>
    </div>
  )
}
