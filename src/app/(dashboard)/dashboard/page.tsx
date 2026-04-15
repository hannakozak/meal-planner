import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import {
  Plus,
  BookOpen,
  Clock,
  Utensils,
  Calendar,
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'

export default async function DashboardPage() {
  const [recipeCount, latestRecipes] = await Promise.all([
    prisma.recipe.count(),
    prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
  ])

  const stats = [
    {
      label: 'Total Recipes',
      value: recipeCount,
      icon: Utensils,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Weekly Plans',
      value: 3,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Shopping List',
      value: 18,
      icon: ShoppingBag,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      label: 'Done this week',
      value: 12,
      icon: CheckCircle2,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your culinary world in one place.
          </p>
        </div>
        <Link
          href="/recipes/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:opacity-90 transition-all font-medium shadow-sm active:scale-95"
        >
          <Plus size={18} />
          <span>New Recipe</span>
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Creations
            </h2>
            <Link
              href="/recipes"
              className="group text-sm font-semibold text-primary flex items-center gap-1"
            >
              See all{' '}
              <ChevronRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid gap-3">
            {latestRecipes.length > 0 ? (
              latestRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group flex items-center justify-between p-4 bg-white border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `hsl(${recipe.title.charCodeAt(0) * 5}, 60%, 90%)`,
                      }}
                    >
                      <BookOpen
                        size={20}
                        style={{
                          color: `hsl(${recipe.title.charCodeAt(0) * 5}, 60%, 40%)`,
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {recipe.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> {recipe.cookingTime || '--'} min
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-300 px-1.5 py-0.5 border border-gray-200 rounded">
                          Recipe
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-full transition-all"
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-2xl bg-gray-50/50">
                <p className="text-gray-400">No recipes yet. Start cooking!</p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Cooking Tip</h2>
          <div className="p-6 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Utensils size={20} />
              </div>
              <h3 className="font-bold text-lg">Did you know?</h3>
            </div>
            <p className="text-sm text-white/90 leading-relaxed min-h-[50px] relative z-10">
              Adding a pinch of salt to your coffee can reduce bitterness and
              enhance the flavor profile. Try it with your next brew!
            </p>
            <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center text-xs text-white/70">
              <span>Updated daily</span>
              <span className="font-medium">Chef's Secret</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
