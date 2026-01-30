import { PrismaClient, Role, MealType, WeekDay } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ======================
  // USERS
  // ======================

  const user = await prisma.user.create({
    data: {
      name: 'Jola',
      email: 'jola@example.com',
      role: Role.USER,
    },
  })

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      role: Role.ADMIN,
    },
  })

  // ======================
  // INGREDIENTS
  // ======================

  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: 'Egg', unit: 'piece', caloriesPerUnit: 70, proteinPerUnit: 6 },
      { name: 'Milk', unit: 'ml', caloriesPerUnit: 0.5 },
      { name: 'Flour', unit: 'g', caloriesPerUnit: 3.6 },
      {
        name: 'Chicken Breast',
        unit: 'g',
        caloriesPerUnit: 1.65,
        proteinPerUnit: 0.31,
      },
      { name: 'Rice', unit: 'g', caloriesPerUnit: 1.3 },
      { name: 'Tomato', unit: 'piece', caloriesPerUnit: 20 },
      { name: 'Cucumber', unit: 'piece', caloriesPerUnit: 15 },
    ],
  })

  const egg = await prisma.ingredient.findUnique({ where: { name: 'Egg' } })
  const flour = await prisma.ingredient.findUnique({ where: { name: 'Flour' } })
  const milk = await prisma.ingredient.findUnique({ where: { name: 'Milk' } })
  const chicken = await prisma.ingredient.findUnique({
    where: { name: 'Chicken Breast' },
  })
  const rice = await prisma.ingredient.findUnique({ where: { name: 'Rice' } })

  // ======================
  // CATEGORIES
  // ======================

  const breakfastCategory = await prisma.category.create({
    data: { name: 'Breakfast' },
  })

  const dinnerCategory = await prisma.category.create({
    data: { name: 'Dinner' },
  })

  // ======================
  // RECIPES
  // ======================

  const pancakes = await prisma.recipe.create({
    data: {
      title: 'Classic Pancakes',
      description: 'Fluffy homemade pancakes perfect for breakfast.',
      instructions: [
        'Mix flour, milk and eggs.',
        'Heat a pan.',
        'Pour batter and cook until golden.',
      ],
      cookingTime: 20,
      servings: 2,
      authorId: user.id,

      ingredients: {
        create: [
          { ingredientId: egg!.id, quantity: 2 },
          { ingredientId: flour!.id, quantity: 200 },
          { ingredientId: milk!.id, quantity: 300 },
        ],
      },

      categories: {
        create: [{ categoryId: breakfastCategory.id }],
      },
    },
  })

  const chickenRice = await prisma.recipe.create({
    data: {
      title: 'Chicken with Rice',
      description: 'Simple high-protein dinner meal.',
      instructions: ['Cook rice.', 'Grill chicken.', 'Serve together.'],
      cookingTime: 30,
      servings: 3,
      authorId: user.id,

      ingredients: {
        create: [
          { ingredientId: chicken!.id, quantity: 300 },
          { ingredientId: rice!.id, quantity: 200 },
        ],
      },

      categories: {
        create: [{ categoryId: dinnerCategory.id }],
      },
    },
  })

  // ======================
  // FAVORITES
  // ======================

  await prisma.favorite.create({
    data: {
      userId: user.id,
      recipeId: pancakes.id,
    },
  })

  // ======================
  // MEAL PLAN
  // ======================

  const mealPlan = await prisma.mealPlan.create({
    data: {
      userId: user.id,
      weekStart: new Date('2026-02-02'),
      weekEnd: new Date('2026-02-08'),
    },
  })

  await prisma.mealPlanRecipe.createMany({
    data: [
      {
        mealPlanId: mealPlan.id,
        recipeId: pancakes.id,
        day: WeekDay.MONDAY,
        mealType: MealType.BREAKFAST,
      },
      {
        mealPlanId: mealPlan.id,
        recipeId: chickenRice.id,
        day: WeekDay.MONDAY,
        mealType: MealType.DINNER,
      },
    ],
  })

  // ======================
  // SHOPPING LIST
  // ======================

  const shoppingList = await prisma.shoppingList.create({
    data: {
      userId: user.id,
      title: 'Weekly groceries',
      recipeId: chickenRice.id,
    },
  })

  await prisma.shoppingListItem.createMany({
    data: [
      {
        shoppingListId: shoppingList.id,
        name: 'Chicken Breast',
        quantity: 300,
        unit: 'g',
      },
      {
        shoppingListId: shoppingList.id,
        name: 'Rice',
        quantity: 200,
        unit: 'g',
      },
      {
        shoppingListId: shoppingList.id,
        name: 'Tomatoes',
        quantity: 3,
        unit: 'piece',
      },
    ],
  })

  console.log('✅ Seeding finished!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
