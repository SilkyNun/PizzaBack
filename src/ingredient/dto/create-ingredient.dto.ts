import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Название ингредиента', example: 'Лук'})
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({description: 'Можно ли исключить ингредиент из пиццы', example: false})
    required: boolean
}
