import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PizzaModule } from './pizza/pizza.module';

@Module({
  imports: [PrismaModule, PizzaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
