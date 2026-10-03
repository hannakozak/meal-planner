import { montserrat, lato } from '@/styles/fonts'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Meal planning used to feel like a chore. Now I can organise my whole week in just a few minutes.',
    name: 'Sarah M.',
    role: 'Busy parent',
  },
  {
    quote:
      'I love having my recipes, meal plan and shopping list all in one place. It makes cooking so much easier.',
    name: 'Emma R.',
    role: 'Home cook',
  },
  {
    quote:
      'The AI recipe ideas are brilliant when I have no idea what to cook with what I already have.',
    name: 'James T.',
    role: 'Food lover',
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-green-50/70 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`${lato.className} text-sm font-semibold uppercase tracking-[0.18em] text-green-700`}
          >
            What people say
          </p>

          <h2
            className={`${montserrat.className} mt-2 text-4xl font-bold text-slate-900 md:text-5xl`}
          >
            Made for simpler days
          </h2>

          <p className={`${lato.className} mt-4 text-lg text-slate-600`}>
            See how meal planning can become a little easier.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
            >
              <div className="flex gap-1 text-green-700">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={17} fill="currentColor" />
                ))}
              </div>

              <p
                className={`${lato.className} mt-5 text-base leading-7 text-slate-600`}
              >
                “{testimonial.quote}”
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p
                  className={`${montserrat.className} text-sm font-semibold text-slate-900`}
                >
                  {testimonial.name}
                </p>

                <p className={`${lato.className} mt-1 text-xs text-slate-500`}>
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
