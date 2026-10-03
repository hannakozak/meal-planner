import { Button } from '@/components/ui/button'
import { montserrat, lato } from '@/styles/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock3, Heart, UtensilsCrossed } from 'lucide-react'

const recipes = [
  {
    title: 'Mediterranean Chicken Bowl',
    time: '30 min',
    difficulty: 'Easy',
    image: '/mediterranean-chicken-bowl.png',
  },
  {
    title: 'Creamy Pesto Pasta',
    time: '25 min',
    difficulty: 'Easy',
    image: '/creamy-pesto-pasta.png',
  },
  {
    title: 'Roasted Veg Buddha Bowl',
    time: '40 min',
    difficulty: 'Medium',
    image: '/roasted-veg-buddha-bowl.png',
  },
]

export function RecipesSection() {
  return (
    <section id="recipes" className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p
              className={`${lato.className} text-sm font-semibold uppercase tracking-[0.18em] text-green-700`}
            >
              Popular recipes
            </p>

            <h2
              className={`${montserrat.className} mt-2 text-4xl font-bold text-slate-900 md:text-5xl`}
            >
              Find inspiration every day
            </h2>

            <p className={`${lato.className} mt-4 max-w-xl text-slate-600`}>
              Explore simple, healthy and delicious recipes or let AI create
              personalised ideas.
            </p>
          </div>

          <Link href="/recipes">
            <Button
              variant="outline"
              className="rounded-full border-green-700 text-green-800 hover:bg-green-50"
            >
              Browse all recipes
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {recipes.map((recipe) => (
            <article
              key={recipe.title}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative">
                <Image
                  src={recipe.image}
                  width={600}
                  height={400}
                  alt={recipe.title}
                  className="h-82 w-full object-cover"
                />

                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-green-700">
                  <Heart size={17} />
                </span>
              </div>

              <div className="p-5">
                <h3
                  className={`${montserrat.className} text-base font-semibold`}
                >
                  {recipe.title}
                </h3>

                <div
                  className={`${lato.className} mt-4 flex items-center gap-5 text-xs text-slate-500`}
                >
                  <span className="flex items-center gap-1">
                    <Clock3 size={13} />
                    {recipe.time}
                  </span>

                  <span className="flex items-center gap-1">
                    <UtensilsCrossed size={13} />
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
