import { Module } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { VariantModule } from 'src/variant/variant.module';

@Module({
  imports: [IngredientModule, VariantModule],
  controllers: [PizzaController],
  providers: [PizzaService]
})
export class PizzaModule {}
