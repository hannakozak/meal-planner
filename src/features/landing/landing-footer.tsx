import { Logo } from '@/components/ui/logo'
import { lato } from '@/styles/fonts'

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-8 py-8 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
        <Logo />

        <nav
          className={`${lato.className} flex flex-wrap gap-6 text-sm text-slate-500`}
        >
          <a href="#features" className="transition hover:text-green-700">
            Features
          </a>

          <a href="#recipes" className="transition hover:text-green-700">
            Recipes
          </a>

          <a href="#how-it-works" className="transition hover:text-green-700">
            How it works
          </a>
        </nav>

        <p className={`${lato.className} text-sm text-slate-400`}>
          © {new Date().getFullYear()} Meal Planner
        </p>
      </div>
    </footer>
  )
}
