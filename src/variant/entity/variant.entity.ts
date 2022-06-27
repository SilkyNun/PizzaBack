import { ApiProperty } from "@nestjs/swagger";
import { PizzaVariant } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class VariantEntity implements PizzaVariant {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;
    
    @ApiProperty()
    dough: string;
    
    @ApiProperty()
    size: number;
    
    @ApiProperty()
    weight: number;
    
    @ApiProperty()
    price: Decimal;
    
    @ApiProperty()
    pizzaId: number;

}