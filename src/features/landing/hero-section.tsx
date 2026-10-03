import { Button } from '@/components/ui/button'
import { montserrat, lato } from '@/styles/fonts'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Heart,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-green-50" />

      <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-green-50" />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-8 pb-10 pt-4 md:grid-cols-2 md:px-12 md:pb-12 md:pt-6 lg:px-16 lg:pt-8">
        <div className="relative z-10">
          <p
            className={`${lato.className} mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-green-700`}
          >
            <Sparkles size={16} />
            Simple meal planning
          </p>

          <h1
            className={`${montserrat.className} max-w-xl text-5xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-[64px]`}
          >
            Plan your meals.
            <br />
            Eat well.
            <br />
            <span className="text-green-700">Stress less.</span>
          </h1>

          <p
            className={`${lato.className} mt-6 max-w-lg text-lg leading-8 text-slate-600`}
          >
            A simple and beautiful meal planner to help you organise recipes,
            plan your weekly meals and create shopping lists — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth/signup">
              <Button className="h-12 rounded-full bg-green-700 px-7 text-sm font-semibold text-white shadow-lg shadow-green-700/15 hover:bg-green-800">
                Get started for free
                <ArrowRight size={17} />
              </Button>
            </Link>

            <a href="#how-it-works">
              <Button
                variant="outline"
                className="h-12 rounded-full border-green-700 px-7 text-sm font-semibold text-green-800 hover:bg-green-50"
              >
                See how it works
              </Button>
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-5">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
                <Heart size={19} />
              </div>

              <p
                className={`${lato.className} mt-2 text-xs leading-5 text-slate-600`}
              >
                Save your favourite recipes
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
                <CalendarDays size={19} />
              </div>

              <p
                className={`${lato.className} mt-2 text-xs leading-5 text-slate-600`}
              >
                Plan your weekly meals
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
                <ShoppingCart size={19} />
              </div>

              <p
                className={`${lato.className} mt-2 text-xs leading-5 text-slate-600`}
              >
                Create shopping lists
              </p>
            </div>
          </div>
        </div>

        <div className="relative md:-mr-4">
          <div className="absolute inset-8 rounded-full bg-green-50 blur-3xl" />

          <div className="relative overflow-hidden rounded-[38px]">
            <Image
              src="/hero-bowl.png"
              width={1536}
              height={1024}
              priority
              alt="Healthy chicken and avocado bowl"
              className="h-[430px] w-full object-cover md:h-[570px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
