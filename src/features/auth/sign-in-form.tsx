'use client'

import Link from 'next/link'
import { Mail, Lock } from 'lucide-react'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { Label } from '@src/components/ui/label'
import { Checkbox } from '@src/components/ui/checkbox'
import { CardContent } from '@src/components/ui/card'
import { signInDefaultValues } from '@src/constants'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signInWithCredentials } from '@src/lib/actions/user.actions'

export function SignInForm() {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  })

  const SignInButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button
        disabled={pending}
        className="w-full h-11 rounded-lg bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md variant='default' "
      >
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    )
  }

  return (
    <CardContent>
      <form action={action} className="space-y-7">
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
              defaultValue={signInDefaultValues.email}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              autoComplete="current-password"
              required
              defaultValue={signInDefaultValues.password}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Checkbox
            id="remember"
            className="border-input data-[state=checked]:bg-primary h-4 w-4 rounded"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Remember me
          </Label>
        </div>
        <SignInButton />
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </CardContent>
  )
}
