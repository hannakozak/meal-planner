import { Metadata } from 'next'
import { Leaf } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { SignInForm } from '@/features/auth/sign-in-form'
import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign In | Meal Planner',
  description: 'Log in to manage your daily meal plans.',
}

const SignInPage = async () => {
  const session = await auth()
  if (session) {
    return redirect('/')
  }

  return (
    <Card className="w-full max-w-[95%] sm:max-w-[420px] rounded-xl shadow-md border-0">
      <CardHeader className="text-center space-y-2 pb-6">
        <div className="flex justify-center items-center gap-2 mb-2">
          <div>
            <Leaf className="h-8 w-8 text-primary" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Meal Planner
          </span>
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
