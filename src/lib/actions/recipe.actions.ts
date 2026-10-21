'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  createUserRecipe,
  deleteUserRecipe,
  updateUserRecipe,
} from '@/lib/dal/recipes'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateRecipe(ingredients: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `
You are a practical recipe assistant for a meal-planning web app.

Create one realistic, useful recipe based mainly on these ingredients:
${ingredients}

Rules:
- Use the provided ingredients as the main ingredients.
- You may add a few basic pantry ingredients if needed, such as salt, pepper, oil, water, garlic, onion, lemon juice, herbs or spices.
- Do not create unrealistic ingredient combinations.
- Use clear, simple cooking instructions.
- Use realistic quantities and units.
- Use common units only: g, kg, ml, l, tbsp, tsp, pcs, cup.
- For liquids use ml or l.
- For dry ingredients use g or kg.
- For eggs, bananas, apples, onions, garlic cloves and similar countable items use pcs.
- Cooking time should be realistic.
- Servings should be between 1 and 6.
- Instructions should be practical and easy to follow.
- Return 4 to 8 ingredients.
- Return 3 to 8 instruction steps.

Return ONLY a valid JSON object.
No markdown.
No backticks.
No explanation.

Use this exact structure:
{
  "title": "Recipe name",
  "description": "Short appetising description",
  "cookingTime": 30,
  "servings": 4,
  "ingredients": [
    {
      "name": "ingredient name",
      "quantity": 200,
      "unit": "g",
      "note": "optional note or null"
    }
  ],
  "instructions": [
    "Step 1...",
    "Step 2...",
    "Step 3..."
  ]
}
`

  const maxRetries = 3

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      const text = result.response.text()
      const clean = text.replace(/```json|```/g, '').trim()
      const recipeData = JSON.parse(clean)

      const recipe = await createUserRecipe({
        title: recipeData.title,
        description: recipeData.description ?? null,
        imageUrl: null,
        cookingTime: recipeData.cookingTime ?? null,
        servings: recipeData.servings ?? null,
        instructions: recipeData.instructions,
        ingredients: recipeData.ingredients.map(
          (item: {
            name: string
            quantity: number | null
            unit: string | null
            note: string | null
          }) => ({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            note: item.note,
          }),
        ),
      })

      revalidatePath('/recipes')

      return recipe
    } catch (error: any) {
      const isLastAttempt = attempt === maxRetries
      const is503 = error?.message?.includes('503')

      if (is503 && !isLastAttempt) {
        await new Promise((res) => setTimeout(res, attempt * 1000))
        continue
      }

      if (is503) {
        throw new Error(
          'AI is currently overloaded. Please try again in a moment.',
        )
      }

      throw error
    }
  }
}

export async function createRecipe(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()

  if (!title) {
    throw new Error('Recipe title is required')
  }

  const description = String(formData.get('description') ?? '').trim()
  const imageUrl = String(formData.get('imageUrl') ?? '').trim()
  const cookingTimeValue = String(formData.get('cookingTime') ?? '')
  const servingsValue = String(formData.get('servings') ?? '')

  const ingredientNames = formData.getAll('ingredientName')
  const ingredientQuantities = formData.getAll('ingredientQuantity')
  const ingredientUnits = formData.getAll('ingredientUnit')
  const ingredientNotes = formData.getAll('ingredientNote')

  const instructions = formData
    .getAll('instruction')
    .map((step) => String(step).trim())
    .filter(Boolean)

  const ingredients = ingredientNames
    .map((value, index) => {
      const name = String(value).trim().toLowerCase()
      const quantityValue = String(ingredientQuantities[index] ?? '').trim()

      return {
        name,
        quantity: quantityValue ? Number(quantityValue) : null,
        unit: String(ingredientUnits[index] ?? '').trim() || null,
        note: String(ingredientNotes[index] ?? '').trim() || null,
      }
    })
    .filter((ingredient) => ingredient.name.length > 0)

  const uniqueIngredients = Array.from(
    new Map(ingredients.map((item) => [item.name, item])).values(),
  )

  await createUserRecipe({
    title,
    description: description || null,
    imageUrl: imageUrl || null,
    cookingTime: cookingTimeValue ? Number(cookingTimeValue) : null,
    servings: servingsValue ? Number(servingsValue) : null,
    instructions,
    ingredients: uniqueIngredients,
  })

  revalidatePath('/recipes')
  redirect('/recipes')
}

export async function deleteRecipe(formData: FormData) {
  const id = String(formData.get('id') ?? '').trim()

  if (!id) {
    throw new Error('Recipe ID is required')
  }

  await deleteUserRecipe(id)

  revalidatePath('/recipes')
}

export async function updateRecipe(id: string, formData: FormData) {
  if (!id.trim()) {
    throw new Error('Recipe ID is required')
  }

  const title = String(formData.get('title') ?? '').trim()

  if (!title) {
    throw new Error('Recipe title is required')
  }

  const description = String(formData.get('description') ?? '').trim()
  const cookingTimeValue = String(formData.get('cookingTime') ?? '')
  const servingsValue = String(formData.get('servings') ?? '')

  const instructions = String(formData.get('instructions') ?? '')
    .split('\n')
    .map((step) => step.trim())
    .filter(Boolean)

  await updateUserRecipe(id, {
    title,
    description: description || null,
    cookingTime: cookingTimeValue ? Number(cookingTimeValue) : null,
    servings: servingsValue ? Number(servingsValue) : null,
    instructions,
  })

  revalidatePath('/recipes')
  revalidatePath(`/recipes/${id}`)

  redirect(`/recipes/${id}`)
}
