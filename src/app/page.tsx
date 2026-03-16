import { Logo } from '@/src/components/ui/logo'
import { UserButton } from '@/src/features/auth/user-button'
import { Button } from '@src/components/ui/button'
import { montserrat, lato } from '@src/styles/fonts'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex items-center justify-between mb-12">
        <Logo />
        <UserButton />
      </div>

      <section className="mb-16">
        <div className="mx-auto max-w-6xl px-6 py-12  md:px-12 lg:px-20">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <aside className="max-w-xl">
              <h1
                className={`${montserrat.className} text-4xl font-extrabold text-gray-900 md:text-5xl`}
              >
                Meal Planner
              </h1>

              <h2
                className={`${montserrat.className} mt-4 text-2xl font-semibold text-gray-800 md:text-3xl`}
              >
                Organise your meals, your way
                <br />
                <span className="text-gray-600">
                  Discover, save, and share delicious recipes!
                </span>
              </h2>

              <p className="mt-6 text-lg text-gray-600">
                <span className={lato.className}>
                  Join our community of cooking enthusiasts — find recipes, save
                  your favorites, and share them with others.
                </span>
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="default">Add Recipe</Button>
                <Button variant="default">Browse Recipes</Button>
              </div>
            </aside>

            <Image
              src="/meal-bowl.png"
              width={340}
              height={340}
              priority
              alt="Meal bowl illustration"
              className="w-full max-w-sm rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
