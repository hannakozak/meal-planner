import { Logo } from '@/components/ui/logo'
import { montserrat, lato } from '@/styles/fonts'
import Image from 'next/image'
import {
  CalendarDays,
  ListChecks,
  Settings,
  ShoppingCart,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'

const features = [
  {
    icon: ListChecks,
    title: 'Recipe collection',
    description: 'Keep all your favourite recipes in one place.',
  },
  {
    icon: CalendarDays,
    title: 'Weekly planner',
    description: 'Plan meals, stay organised and save time.',
  },
  {
    icon: ShoppingCart,
    title: 'Shopping lists',
    description: 'Automatically create ingredient lists.',
  },
  {
    icon: Sparkles,
    title: 'AI recipe ideas',
    description: 'Generate new recipes based on your preferences.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Works on any device',
    description: 'A clean and simple interface that fits your lifestyle.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-8 md:grid-cols-[0.85fr_1.15fr] md:px-12 lg:px-16">
        <div>
          <p
            className={`${lato.className} mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-green-700`}
          >
            Features
          </p>

          <h2
            className={`${montserrat.className} max-w-lg text-4xl font-bold leading-tight text-slate-900 md:text-5xl`}
          >
            Everything you need to plan delicious meals
          </h2>

          <div className="mt-8 space-y-5">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div key={feature.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Icon size={19} />
                  </span>

                  <div>
                    <h3
                      className={`${montserrat.className} font-semibold text-slate-900`}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className={`${lato.className} mt-1 text-sm leading-6 text-slate-600`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="rounded-[30px] border border-slate-100 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-5">
          <div className="overflow-hidden rounded-[22px] border border-slate-100 bg-slate-50">
            <div className="grid min-h-[500px] grid-cols-[125px_1fr]">
              <aside className="border-r border-slate-100 bg-white p-4">
                <div className="origin-left scale-[0.8]">
                  <Logo />
                </div>

                <div className="mt-8 space-y-1 text-[11px]">
                  {[
                    'Dashboard',
                    'Recipes',
                    'Meal Planner',
                    'Shopping List',
                    'Settings',
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-xl px-3 py-2.5 ${
                        index === 0
                          ? 'bg-green-50 font-semibold text-green-700'
                          : 'text-slate-600'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`${montserrat.className} text-xl font-bold`}>
                      Dashboard
                    </h3>

                    <p
                      className={`${lato.className} mt-1 text-xs text-slate-500`}
                    >
                      Manage your culinary world in one place.
                    </p>
                  </div>

                  <span className="rounded-lg bg-green-700 px-3 py-2 text-[10px] font-semibold text-white">
                    + New Recipe
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-2">
                  {[
                    ['Total Recipes', '12'],
                    ['Weekly Plans', '3'],
                    ['Shopping List', '8'],
                    ['Done this week', '5'],
                  ].map(([title, value]) => (
                    <div
                      key={title}
                      className="rounded-xl border border-slate-100 bg-white p-3"
                    >
                      <p className="text-[9px] text-slate-500">{title}</p>

                      <p
                        className={`${montserrat.className} mt-1 text-lg font-bold`}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4
                        className={`${montserrat.className} text-sm font-bold`}
                      >
                        Recent Creations
                      </h4>

                      <span className="text-[10px] font-medium text-green-700">
                        See all →
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {[
                        'Quick Tomato & Egg Scramble',
                        'Chicken Pasta Primavera',
                        'Roasted Vegetable Bowl',
                      ].map((recipe) => (
                        <div
                          key={recipe}
                          className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-2.5"
                        >
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src="/hero-bowl.png"
                              width={80}
                              height={80}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-semibold">
                              {recipe}
                            </p>

                            <p className="mt-1 text-[9px] text-slate-500">
                              15 min
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`${montserrat.className} text-sm font-bold`}>
                      Cooking Tip
                    </h4>

                    <div className="mt-3 rounded-2xl bg-green-700 p-4 text-white">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                          <UtensilsCrossed size={15} />
                        </span>

                        <p className="text-xs font-bold">Did you know?</p>
                      </div>

                      <p
                        className={`${lato.className} mt-3 text-[10px] leading-5 text-green-50`}
                      >
                        Adding a pinch of salt to your coffee can reduce
                        bitterness and enhance the flavour profile.
                      </p>

                      <div className="mt-4 border-t border-white/20 pt-3 text-[9px]">
                        Updated daily
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
