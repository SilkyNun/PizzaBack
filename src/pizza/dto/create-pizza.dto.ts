import { ApiExtraModels, ApiProduces, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateIngredientDto } from "src/ingredient/dto/create-ingredient.dto";
import { CreateVariantDto } from "src/variant/dto/create-variant.dto";

export class CreatePizzaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Мясная', description: 'Тип пиццы'})
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Маргарита', description: 'Название пиццы'})
    name: string;

    @ValidateNested({each: true})
    @Type(() => CreateVariantDto)
    @ApiProperty({type: [CreateVariantDto]})
    variants: CreateVariantDto[];

    @ValidateNested({each: true})
    @Type(() => CreateIngredientDto)
    @ApiProperty({type: [CreateIngredientDto]})
    ingredients: CreateIngredientDto[];
}
