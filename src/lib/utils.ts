import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatError(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join('. ')
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    const target = error.meta?.target as string[] | undefined
    const field = target?.[0] ?? 'Field'

    if (field === 'email') return 'User already exists'
    return `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} already exists`
  }

  if (error instanceof Error) {
    return error.message
  }

  return JSON.stringify(error)
}
