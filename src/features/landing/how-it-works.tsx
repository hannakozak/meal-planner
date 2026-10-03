import { montserrat, lato } from '@/styles/fonts'
import { CalendarDays, ListChecks, ShoppingCart } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: ListChecks,
    title: 'Save recipes',
    description: 'Add your own recipes or generate new ideas with AI.',
  },
  {
    number: '2',
    icon: CalendarDays,
    title: 'Plan your week',
    description: 'Organise your meals and plan your week in one place.',
  },
  {
    number: '3',
    icon: ShoppingCart,
    title: 'Create shopping list',
    description: 'Get a ready-made list of ingredients for your meals.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-green-50/70 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`${lato.className} text-sm font-semibold uppercase tracking-[0.18em] text-green-700`}
          >
            Simple process
          </p>

          <h2
            className={`${montserrat.className} mt-2 text-4xl font-bold text-slate-900 md:text-5xl`}
          >
            How it works
          </h2>

          <p className={`${lato.className} mt-4 text-lg text-slate-600`}>
            Get from idea to dinner in just a few simple steps.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div key={step.number} className="relative z-10">
                <div className="h-full rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800">
                      {step.number}
                    </span>

                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                      <Icon size={22} />
                    </span>
                  </div>

                  <h3
                    className={`${montserrat.className} text-lg font-semibold`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`${lato.className} mt-2 text-sm leading-6 text-slate-600`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
