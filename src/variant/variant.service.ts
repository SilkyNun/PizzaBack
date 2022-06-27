import { Injectable } from '@nestjs/common';
import { PizzaVariant, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(createVariantDto: CreateVariantDto, pizzaId: number): Promise<PizzaVariant> {
    const variant: PizzaVariant = await this.prisma.pizzaVariant.create({
      data: {
        pizzaId,
        ...createVariantDto
      }
    });

    return variant;
  }

  //returns count of deleted records
  async remove(pizzaId: number): Promise<number> {
    const {count} = await this.prisma.pizzaVariant.deleteMany({
      where: {
        pizzaId
      }
    });

    return count;
  }
}
