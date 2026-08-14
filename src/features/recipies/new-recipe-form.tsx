'use client'

import { useState } from 'react'
import { createRecipe } from '@/lib/actions/recipe.actions'
import { IngredientRow } from './ingredient-row'
import { InstructionField } from './instruction-field'
import { Plus } from 'lucide-react'
import { RecipeImageUpload } from '@/features/recipies/recipe-image-upload'

export function NewRecipeForm() {
  const [ingredients, setIngredients] = useState([crypto.randomUUID()])
  const [instructions, setInstructions] = useState([crypto.randomUUID()])

  function addIngredient() {
    setIngredients((current) => [...current, crypto.randomUUID()])
  }

  function removeIngredient(id: string) {
    setIngredients((current) => current.filter((item) => item !== id))
  }

  function addInstruction() {
    setInstructions((current) => [...current, crypto.randomUUID()])
  }

  function removeInstruction(id: string) {
    setInstructions((current) => current.filter((item) => item !== id))
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Recipe</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a recipe with ingredients, quantities and instructions.
        </p>
      </div>

      <form action={createRecipe} className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium">Recipe title</label>
            <input
              name="title"
              placeholder="e.g. Chocolate cake"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Short description of the recipe"
              className="min-h-24 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <RecipeImageUpload />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cooking time</label>
              <input
                name="cookingTime"
                type="number"
                placeholder="Minutes"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Servings</label>
              <input
                name="servings"
                type="number"
                placeholder="Number of servings"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Ingredients</h2>
              <p className="text-sm text-gray-500">
                Add ingredient name, amount, unit and optional note.
              </p>
            </div>

            <button
              type="button"
              onClick={addIngredient}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium transition hover:bg-gray-50"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {ingredients.map((id) => (
              <IngredientRow
                key={id}
                canRemove={ingredients.length > 1}
                onRemove={() => removeIngredient(id)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Instructions</h2>
              <p className="text-sm text-gray-500">
                Add the main steps needed to prepare the recipe.
              </p>
            </div>

            <button
              type="button"
              onClick={addInstruction}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium transition hover:bg-gray-50"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="space-y-4">
            {instructions.map((id, index) => (
              <InstructionField
                key={id}
                step={index + 1}
                canRemove={instructions.length > 1}
                onRemove={() => removeInstruction(id)}
              />
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 active:scale-95">
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  )
}
