-- CreateTable
CREATE TABLE "Pizza" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PizzaVariant" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dough" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "PizzaVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PizzaVariant" ADD CONSTRAINT "PizzaVariant_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
