import { auth } from '@/auth'
import { Logo } from '@/src/components/ui/logo'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@src/components/ui/card'
import { SignUpForm } from '@src/features/auth/sign-up-form'
import { Leaf } from 'lucide-react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign Up | Meal Planner',
  description: 'Sign up to manage your daily meal plans.',
}

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>
}) => {
  const { callbackUrl } = await props.searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <Card className="w-full max-w-[95%] sm:max-w-[420px] rounded-xl shadow-md border-0">
      <CardHeader className="text-center space-y-2 pb-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Create Your Account
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign up to get started with Meal Planner.
        </CardDescription>
      </CardHeader>
      <SignUpForm />
    </Card>
  )
}

export default SignUpPage
