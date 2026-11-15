/*
  Warnings:

  - A unique constraint covering the columns `[userId,weekStart,weekEnd]` on the table `MealPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ShoppingListGeneration" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "mealPlanId" UUID NOT NULL,
    "shoppingListId" UUID NOT NULL,
    "generatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShoppingListGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ShoppingListGeneration_shoppingListId_idx" ON "ShoppingListGeneration"("shoppingListId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingListGeneration_mealPlanId_shoppingListId_key" ON "ShoppingListGeneration"("mealPlanId", "shoppingListId");

-- CreateIndex
CREATE UNIQUE INDEX "MealPlan_userId_weekStart_weekEnd_key" ON "MealPlan"("userId", "weekStart", "weekEnd");

-- AddForeignKey
ALTER TABLE "ShoppingListGeneration" ADD CONSTRAINT "ShoppingListGeneration_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListGeneration" ADD CONSTRAINT "ShoppingListGeneration_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
