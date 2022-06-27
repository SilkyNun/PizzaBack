import { Injectable } from '@nestjs/common';
import { Ingredient, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(createIngredientDto: CreateIngredientDto, pizzaId: number): Promise<Ingredient> {
    const ingredient: Ingredient = await this.prisma.ingredient.create({
      data: {
        pizzaId,
        ...createIngredientDto
      }
    });

    return ingredient;
  }

  //returns count of deleted records
  async remove(pizzaId: number): Promise<number> {
    const {count} = await this.prisma.ingredient.deleteMany({
      where: {
        pizzaId
      }
    });

    return count;
  }
}
