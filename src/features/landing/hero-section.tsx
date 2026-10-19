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
    <section className="relative isolate overflow-hidden bg-white ">
      <div className=" ">
        <Image
          src="/hero-bowl.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[1%_center] md:object-[1%_center] lg:object-[10%_center]"
        />
      </div>

      <div
        className="
          relative mx-auto flex w-full max-w-[1440px] items-center
          px-6 py-12
          sm:px-8 sm:py-14
          md:min-h-[680px] md:px-10 md:py-12
          lg:min-h-[700px] lg:px-16
          xl:min-h-[650px]
        "
      >
        <div className="w-full max-w-[700px]">
          <p
            className={`${lato.className} mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-green-700`}
          >
            <Sparkles size={16} />
            Simple meal planning
          </p>

          <h1
            className={`${montserrat.className} max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[64px]`}
          >
            Plan your meals.
            <br />
            Eat well.
            <br />
            <span className="text-green-700">Stress less.</span>
          </h1>

          <p
            className={`${lato.className} mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8`}
          >
            A simple and beautiful meal planner to help you organise recipes,
            plan your weekly meals and create shopping lists — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth/signup">
              <Button className="h-12 rounded-full bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-700/15 hover:bg-green-800 sm:px-7">
                Get started for free
                <ArrowRight size={17} />
              </Button>
            </Link>

            <a href="#how-it-works">
              <Button
                variant="outline"
                className="h-12 rounded-full border-green-700 bg-white/90 px-5 text-sm font-semibold text-green-800 hover:bg-green-50 sm:px-7"
              >
                See how it works
              </Button>
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-5">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
                <Heart size={19} />
              </div>
              <p
                className={`${lato.className} mt-2 text-xs leading-5 text-slate-700`}
              >
                Save your favourite recipes
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
                <CalendarDays size={19} />
              </div>
              <p
                className={`${lato.className} mt-2 text-xs leading-5 text-slate-700`}
              >
                Plan your weekly meals
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
                <ShoppingCart size={19} />
              </div>
              <p
                className={`${lato.className} mt-2 text-xs leading-5 text-slate-700`}
              >
                Create shopping lists
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
