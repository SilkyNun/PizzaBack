import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "@prisma/client";

export class IngredientEntity implements Ingredient {
    @ApiProperty()
    id: number;
   
    @ApiProperty()
    createdAt: Date;
   
    @ApiProperty()
    updatedAt: Date;
   
    @ApiProperty()
    name: string;
   
    @ApiProperty()
    required: boolean;
   
    @ApiProperty()
    pizzaId: number;

}