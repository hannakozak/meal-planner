'use client'

import { generateRecipe } from '@/lib/actions/recipe.actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function GenerateRecipeButton() {
  const router = useRouter()
  const [ingredients, setIngredients] = useState('')
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  async function handleGenerate() {
    if (!ingredients.trim()) return
    setLoading(true)
    setError('')
    try {
      const recipe = await generateRecipe(ingredients)
      router.push(`/recipes/${recipe?.id}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="e.g. chicken, rice, broccoli"
        className="border rounded-lg px-3 py-2 flex-1"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate with AI'}
      </button>
    </div>
  )
}
