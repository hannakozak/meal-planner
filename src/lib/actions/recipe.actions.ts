'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateRecipe(ingredients: string) {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `
Generate a recipe based on these ingredients: ${ingredients}.

Return ONLY a valid JSON object, no markdown, no backticks, just raw JSON:
{
  "title": "Recipe name",
  "description": "Short description",
  "cookingTime": 30,
  "servings": 4,
  "instructions": ["Step 1...", "Step 2...", "Step 3..."]
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
        },
      })

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
  const cookingTime = Number(formData.get('cookingTime'))

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) throw new Error('User not found')

  await prisma.recipe.create({
    data: {
      title,
      description,
      cookingTime,
      authorId: user.id,
    },
  })

  redirect('/recipes')
}

export async function deleteRecipe(formData: FormData) {
  const id = formData.get('id') as string

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

  await prisma.recipe.update({
    where: { id },
    data: {
      title,
      description,
      cookingTime: cookingTime ? Number(cookingTime) : null,
      servings: servings ? Number(servings) : null,
    },
  })

  revalidatePath('/recipes')
  revalidatePath(`/recipes/${id}`)

  redirect(`/recipes/${id}`)
}
