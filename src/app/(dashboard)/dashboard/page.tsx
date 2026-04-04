// app/(dashboard)/dashboard/page.tsx
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { Plus, BookOpen, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const latestRecipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Here's what's happening with your recipes.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/recipes/new"
          className="p-6 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors flex items-center gap-4"
        >
          <div className="p-3 bg-primary text-white rounded-lg">
            <Plus size={24} />
          </div>
          <div>
            <span className="block font-semibold">Add Recipe</span>
            <span className="text-xs text-gray-500">Create a new dish</span>
          </div>
        </Link>
      </div>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Recipes</h2>
          <Link
            href="/recipes"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-4">
          {latestRecipes.length > 0 ? (
            latestRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded">
                    <BookOpen size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{recipe.title}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} /> {recipe.cookingTime || '?'} min
                    </p>
                  </div>
                </div>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-sm font-medium text-gray-600 hover:text-black"
                >
                  Edit
                </Link>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">
              No recipes added yet.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
