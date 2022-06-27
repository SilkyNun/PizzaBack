import { Injectable } from '@nestjs/common';
import { Ingredient, Pizza, PrismaClient } from '@prisma/client';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VariantService } from 'src/variant/variant.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzaService {

  constructor(
    private prisma: PrismaService,
    private ingredientService: IngredientService,
    private variantService: VariantService
  ) {}

  async create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    const pizza: Pizza = await this.prisma.pizza.create({
      data: {
        type: createPizzaDto.type,
        name: createPizzaDto.name,
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/67b0d323495748309513111b1f59e27b_366x366.jpeg'
      }
    });

    createPizzaDto.ingredients.forEach(i => this.ingredientService.create(i, pizza.id));
    createPizzaDto.variants.forEach(v => this.variantService.create(v, pizza.id));

    return this.prisma.pizza.findUnique({
      where: {
        id: pizza.id
      },
      include: {
        variants: true,
        ingredients: true
      }
    })
  }

  findAll(): Promise<Pizza[]> {
    return this.prisma.pizza.findMany({
      include: {
        variants: true,
        ingredients: true
      }
    });
  }

  findOne(id: number): Promise<Pizza> {
    return this.prisma.pizza.findUnique({
      where: {
        id
      },
      include: {
        variants: true,
        ingredients: true
      }
    });
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    this.ingredientService.remove(id);
    this.variantService.remove(id);

    updatePizzaDto.ingredients.forEach(i => this.ingredientService.create(i, id));
    updatePizzaDto.variants.forEach(v => this.variantService.create(v, id));

    delete updatePizzaDto.ingredients;
    delete updatePizzaDto.variants;

    const updPizza: Pizza = await this.prisma.pizza.update({
      where: {
        id
      },
      data: {
        ...updatePizzaDto
      }
    });

    return updPizza;
  }

  remove(id: number): Promise<Pizza> {
    return this.prisma.pizza.delete({
      where: {
        id
      },
      include: {
        variants: true,
        ingredients: true
      }
    })
  }
}
