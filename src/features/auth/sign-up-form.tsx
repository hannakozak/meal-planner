'use client'

import Link from 'next/link'
import { Mail, Lock, User } from 'lucide-react'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { Label } from '@src/components/ui/label'
import { CardContent } from '@src/components/ui/card'
import { signUpDefaultValues } from '@src/constants'
import { signUpUser } from '@/src/lib/actions/user.actions'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'

export function SignUpForm() {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  })

  const searchParams = useSearchParams()
  const callbackUrls = searchParams.get('callbackUrl') || '/'

  const SignUpButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button
        disabled={pending}
        className="w-full h-11 rounded-lg bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
      >
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    )
  }

  return (
    <CardContent>
      <form action={action} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrls} />
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              required
              defaultValue={signUpDefaultValues.name}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              required
              defaultValue={signUpDefaultValues.email}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              required
              defaultValue={signUpDefaultValues.password}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm password"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              required
              defaultValue={signUpDefaultValues.confirmPassword}
            />
          </div>
        </div>

        <SignUpButton />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/auth/signin"
            className="text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </form>
    </CardContent>
  )
}
