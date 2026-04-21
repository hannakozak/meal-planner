import { Metadata } from 'next'
import { auth } from '@/auth'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { SignInForm } from '@/features/auth/sign-in-form'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/ui/logo'

export const metadata: Metadata = {
  title: 'Sign In | Meal Planner',
  description: 'Log in to manage your daily meal plans.',
}

const SignInPage = async () => {
  const session = await auth()
  if (session) {
    return redirect('/dashboard')
  }

  return (
    <Card className="w-full max-w-[95%] sm:max-w-[420px] rounded-xl shadow-md border-0">
      <CardHeader className="text-center space-y-2 pb-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Welcome Back!
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to your account to continue.
        </CardDescription>
      </CardHeader>
      <SignInForm />
    </Card>
  )
}

export default SignInPage
