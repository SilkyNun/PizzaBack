import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { Pizza } from "@prisma/client";
import { IngredientEntity } from "src/ingredient/entity/ingredient.entity";
import { VariantEntity } from "src/variant/entity/variant.entity";

export class PizzaEntity implements Pizza {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;
    
    @ApiProperty()
    type: string;
    
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    image: string;

    @ApiProperty({type: [VariantEntity]})
    variants: VariantEntity[]

    @ApiProperty({type: [IngredientEntity]})
    ingredients: IngredientEntity[]
}