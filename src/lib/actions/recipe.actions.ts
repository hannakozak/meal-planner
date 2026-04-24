'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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
