import { Button } from '@/components/ui/button'
import { montserrat, lato } from '@/styles/fonts'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="bg-green-50/70 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
        <div className="rounded-[32px] border border-slate-100 bg-white px-8 py-12 text-center shadow-sm md:px-16 md:py-16">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-700">
            <Sparkles size={21} />
          </div>

          <h2
            className={`${montserrat.className} mx-auto mt-5 max-w-2xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl`}
          >
            Ready to make meal planning easier?
          </h2>

          <p
            className={`${lato.className} mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600`}
          >
            Start organising your recipes, planning your meals and creating
            shopping lists today.
          </p>

          <div className="mt-8">
            <Link href="/auth/signup">
              <Button className="h-12 rounded-full bg-green-700 px-7 text-sm font-semibold text-white shadow-lg shadow-green-700/15 hover:bg-green-800">
                Get started for free
                <ArrowRight size={17} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
