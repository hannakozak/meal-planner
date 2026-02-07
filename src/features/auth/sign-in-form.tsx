'use client'

import Link from 'next/link'
import { Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { CardContent } from '@/components/ui/card'

export function SignInForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formularz wysłany')
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              required
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
              placeholder="Enter your password"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              autoComplete="current-password"
              required
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

        <Button
          type="submit"
          className="w-full h-11 rounded-lg bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
        >
          Sign In
        </Button>

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
