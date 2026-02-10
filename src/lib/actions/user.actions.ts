'use server'
import { signInSchema, signUpSchema } from '@src/lib/validators'
import { signIn, signOut } from '../../../auth'
import { hashSync } from 'bcrypt-ts-edge'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    const plainPassword = user.password
    user.password = hashSync(user.password, 10)

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    })

    return { success: true, message: 'User created and signed in successfully' }
  } catch (error) {
    console.log('validation error', error)
    return { success: false, message: 'User creation failed' }
  }
}

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    await signIn('credentials', user)
    return { success: true, message: 'Signed in successfully' }
  } catch (error) {
    console.log('validation error', error)
    return { success: false, message: 'Invalid email or password' }
  }
}

export async function signOutUser() {
  await signOut()
}
