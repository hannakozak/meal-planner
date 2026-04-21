'use server'

import { prisma } from '@/src/lib/prisma'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
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

export async function deleteRecipe(id: string) {
  await prisma.recipe.delete({
    where: { id },
  })

  revalidatePath('/recipes')
  redirect('/recipes')
}
