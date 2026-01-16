import { montserrat, lato } from '@/app/ui/fonts'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1
        className={`${montserrat.className} text-4xl font-bold text-gray-800 md:text-3xl md:leading-normal`}
      >
        Mealory
      </h1>
      <h2 className={`${montserrat.className} text-2xl font-bold`}>
        Organise your meals, your way <br />
        Discover, save, and share delicious recipes!
      </h2>
      <p className="mt-4 text-lg text-gray-700">
        <span className={lato.className}>
          Join our community of cooking enthusiasts — find recipes, save your
          favorites, and share them with others!
        </span>
      </p>
    </main>
  )
}
