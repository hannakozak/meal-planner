'use client'

import Link from 'next/link'
import { Mail, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { CardContent } from '@/components/ui/card'

export function SignUpForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formularz wysłany')
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              required
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
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              required
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
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              className="pl-10 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Checkbox
            id="terms"
            className="border-input data-[state=checked]:bg-primary h-4 w-4 rounded transition-colors"
            required
          />
          <Label
            htmlFor="terms"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            I agree to the{' '}
            <Link
              href="/terms"
              className="text-primary font-medium hover:text-primary/80 transition-colors"
            >
              Terms & Conditions
            </Link>
          </Label>
        </div>
        <Button
          type="submit"
          className="w-full h-11 rounded-lg bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
        >
          Sign Up
        </Button>

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
