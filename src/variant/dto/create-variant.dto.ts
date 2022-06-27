import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateVariantDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Вид теста для основы', example: 'тонкое'})
    dough: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: 'Размер пиццы в см', example: 26})
    size: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: 'Вес пиццы в граммах', example: '500'})
    weight: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: 'Стоимость пиццы в бел.рублях', example: 20.50})
    price: number;
}
