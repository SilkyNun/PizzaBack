import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PizzaEntity } from './entity/pizza.entity';

@Controller('pizza')
@ApiTags('Pizza controller API description')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Post()
  @ApiCreatedResponse({type: PizzaEntity})
  create(@Body() createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    return this.pizzaService.create(createPizzaDto);
  }

  @Get()
  @ApiOkResponse({type: [PizzaEntity]})
  findAll(): Promise<Pizza[]> {
    return this.pizzaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: PizzaEntity})
  findOne(@Param('id') id: string): Promise<Pizza> {
    return this.pizzaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: PizzaEntity})
  update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzaService.update(+id, updatePizzaDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: PizzaEntity})
  remove(@Param('id') id: string) {
    return this.pizzaService.remove(+id);
  }
}
