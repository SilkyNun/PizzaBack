import { Ingredient, Pizza, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

enum PizzaTypes {
    MEAT = 'Мясная',
    VEGAN = 'Вегетарианская',
    GRILL = 'Гриль',
    SPICE = 'Острая',
    CLOSED = 'Закрытая'
}

enum PizzaNames {
    CHEESEBURGER = 'Чизбургер-пицца',
    CHEESE = 'Сырная',
    CHEESE_CHICKEN = 'Сырный цыпленок',
    ASIAN_SHRIMPS = 'Креветки по-азиатски'
}

enum DoughTypes {
    THIN = 'тонкое',
    TRADITIONAL = 'традиционное'
}

enum IngredientNames {
    ITALIAN_WEED = 'Итальянские травы',
    TOMATO_SOUCE = 'Томатный соус',
    SPICY_PEPPERONY = 'Пикантная пепперони',
    BRINZA_QUADS = 'Кубики брынзы',
    MOZZARELLA = 'Моцарелла',
    HAM = 'Ветчина',
    CHAMPINION = 'Шампиньоны',
    RED_ONION = 'Красный лук',
    SWEET_PEPPER = 'Сладкий перец',
    CHICKEN_PIECES = 'Куриные кусочки'
}

enum PizzaSizes {
    SMALL = 26,
    MEDIUM = 30,
    BIG = 40
}

class CreateIngredientDto {
    name: string;
    required: boolean
}

class CreateVariantDto {
    dough: string;
    size: number;
    weight: number;
    price: number;
}

class CreatePizzaDto {
    type: string;
    name: string;
    variants: CreateVariantDto[];
    ingredients: CreateIngredientDto[];
}

async function main() {

    for (let i = 0; i < 50; i++) {
        const pizza: CreatePizzaDto = new CreatePizzaDto();
        pizza.type = getRandom(PizzaTypes);
        pizza.name = getRandom(PizzaNames);

        pizza.ingredients = makeIngredients();
        pizza.variants = makeVariants();

        const pizzaCreated: Pizza = await prisma.pizza.create({
            data: {
                type: pizza.type,
                name: pizza.name,
                image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/67b0d323495748309513111b1f59e27b_366x366.jpeg'
            }
        });

        pizza.ingredients.forEach(async (i) => await prisma.ingredient.create({
            data: {
                pizzaId: pizzaCreated.id,
                ...i
            }
        }));

        pizza.variants.forEach(async (v) => await prisma.pizzaVariant.create({
            data: {
                pizzaId: pizzaCreated.id,
                ...v
            }
        }));
    }

}

function getRandom(type: object) {
    const values = Object.values(type);
    const choise = Math.round(Math.random() * (values.length - 1));
    return values.at(choise);
}

function makeIngredients(): CreateIngredientDto[] {
    const ingredients: CreateIngredientDto[] = new Array<CreateIngredientDto>();

    for (let i = 0; i < Math.round(Math.random() * 5); i++) {
        const dto: CreateIngredientDto = new CreateIngredientDto();

        dto.name = getRandom(IngredientNames);
        dto.required = Math.round(Math.random()) === 0 ? false : true;

        ingredients.push(dto);
    }

    return ingredients;
}

function makeVariants(): CreateVariantDto[] {
    const variants: CreateVariantDto[] = new Array<CreateVariantDto>();

    variants.push(makeVariant(DoughTypes.THIN, PizzaSizes.SMALL));
    variants.push(makeVariant(DoughTypes.THIN, PizzaSizes.MEDIUM));
    variants.push(makeVariant(DoughTypes.THIN, PizzaSizes.BIG));
    variants.push(makeVariant(DoughTypes.TRADITIONAL, PizzaSizes.SMALL));
    variants.push(makeVariant(DoughTypes.TRADITIONAL, PizzaSizes.MEDIUM));
    variants.push(makeVariant(DoughTypes.TRADITIONAL, PizzaSizes.BIG));

    return variants;
}

function makeVariant(dough: string, size: number): CreateVariantDto {
    const dto: CreateVariantDto = new CreateVariantDto();
    dto.dough = dough;
    dto.size = size;
    dto.price = Math.round(Math.random() * 400 + 300);
    dto.weight = Math.round(Math.random() * 300 + 500);

    return dto;
}



main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect
    });