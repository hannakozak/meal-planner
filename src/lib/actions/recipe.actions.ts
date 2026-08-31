'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateRecipe(ingredients: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

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

      const recipe = await prisma.recipe.create({
        data: {
          title: recipeData.title,
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          instructions: recipeData.instructions,
          authorId: session.user.id!,
          ingredients: {
            create: await Promise.all(
              recipeData.ingredients.map(
                async (item: {
                  name: string
                  quantity: number | null
                  unit: string | null
                  note: string | null
                }) => {
                  const ingredient = await prisma.ingredient.upsert({
                    where: {
                      name: item.name.trim().toLowerCase(),
                    },
                    update: {},
                    create: {
                      name: item.name.trim().toLowerCase(),
                    },
                  })

                  return {
                    quantity: item.quantity,
                    unit: item.unit,
                    note: item.note,
                    ingredientId: ingredient.id,
                  }
                },
              ),
            ),
          },
        },
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
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error('Not authenticated')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const imageUrl = formData.get('imageUrl') as string
  const cookingTimeValue = formData.get('cookingTime')
  const servingsValue = formData.get('servings')
  const ingredientNames = formData.getAll('ingredientName') as string[]
  const ingredientQuantities = formData.getAll('ingredientQuantity') as string[]
  const ingredientUnits = formData.getAll('ingredientUnit') as string[]
  const ingredientNotes = formData.getAll('ingredientNote') as string[]
  const instructions = formData
    .getAll('instruction')
    .map((step) => String(step).trim())
    .filter(Boolean)

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) throw new Error('User not found')

  const ingredients = ingredientNames
    .map((name, index) => ({
      name: name.trim().toLowerCase(),
      quantity: ingredientQuantities[index]
        ? Number(ingredientQuantities[index])
        : null,
      unit: ingredientUnits[index]?.trim() || null,
      note: ingredientNotes[index]?.trim() || null,
    }))
    .filter((ingredient) => ingredient.name.length > 0)

  const uniqueIngredients = Array.from(
    new Map(ingredients.map((item) => [item.name, item])).values(),
  )

  await prisma.recipe.create({
    data: {
      title,
      description,
      imageUrl: imageUrl?.trim() || null,
      cookingTime: cookingTimeValue ? Number(cookingTimeValue) : null,
      servings: servingsValue ? Number(servingsValue) : null,
      instructions,
      authorId: user.id,
      ingredients: {
        create: await Promise.all(
          uniqueIngredients.map(async (item) => {
            const ingredient = await prisma.ingredient.upsert({
              where: { name: item.name },
              update: {},
              create: { name: item.name },
            })

            return {
              quantity: item.quantity,
              note: item.note,
              unit: item.unit,
              ingredientId: ingredient.id,
            }
          }),
        ),
      },
    },
  })

  revalidatePath('/recipes')
  redirect('/recipes')
}

export async function deleteRecipe(formData: FormData) {
  const id = formData.get('id') as string

  await prisma.recipeIngredient.deleteMany({ where: { recipeId: id } })
  await prisma.recipeTranslation.deleteMany({ where: { recipeId: id } })
  await prisma.recipeCategory.deleteMany({ where: { recipeId: id } })
  await prisma.favorite.deleteMany({ where: { recipeId: id } })
  await prisma.mealPlanRecipe.deleteMany({ where: { recipeId: id } })

  await prisma.recipe.delete({
    where: { id },
  })

  revalidatePath('/recipes')
}

export async function updateRecipe(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const cookingTime = formData.get('cookingTime')
  const servings = formData.get('servings')

  const instructions = String(formData.get('instructions') ?? '')
    .split('\n')
    .map((step) => step.trim())
    .filter(Boolean)

  await prisma.recipe.update({
    where: { id },
    data: {
      title,
      description,
      cookingTime: cookingTime ? Number(cookingTime) : null,
      servings: servings ? Number(servings) : null,
      instructions,
    },
  })

  revalidatePath('/recipes')
  revalidatePath(`/recipes/${id}`)

  redirect(`/recipes/${id}`)
}
