import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { lato } from '@/styles/fonts'

export function LandingNavbar() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-8 lg:px-12 xl:px-16">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className={`${lato.className} text-sm text-slate-600 transition hover:text-green-700`}
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className={`${lato.className} text-sm text-slate-600 transition hover:text-green-700`}
          >
            How it works
          </a>

          <a
            href="#recipes"
            className={`${lato.className} text-sm text-slate-600 transition hover:text-green-700`}
          >
            Recipes
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/signin">
            <Button
              variant="outline"
              className="rounded-full border-green-700 px-5 text-green-800 hover:bg-green-50"
            >
              Log in
            </Button>
          </Link>

          <Link href="/auth/signup">
            <Button className="rounded-full bg-green-700 px-5 text-white hover:bg-green-800">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
