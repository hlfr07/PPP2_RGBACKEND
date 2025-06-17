import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServicioValorCamposService } from './servicio_valor_campos.service';
import { CreateServicioValorCampoDto } from './dto/create-servicio_valor_campo.dto';
import { UpdateServicioValorCampoDto } from './dto/update-servicio_valor_campo.dto';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { GetServicioValorCampoDto } from './dto/get-servicio_valor_campo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTO para representar el arreglo
class CreateServicioValorCampoArrayDto {
  @ApiProperty({ type: [CreateServicioValorCampoDto] })
  @IsArray({ message: 'El cuerpo debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => CreateServicioValorCampoDto)
  items: CreateServicioValorCampoDto[];
}

@ApiTags('servicio-valor-campos')
@Controller('servicio-valor-campos')
export class ServicioValorCamposController {
  constructor(private readonly servicioValorCamposService: ServicioValorCamposService) { }

  @ApiBody({ type: CreateServicioValorCampoArrayDto })
  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('servicio-valor-campos', 'post')
  create(@Body() CreateServicioValorCampoArrayDto: CreateServicioValorCampoArrayDto) {
    console.log("ESTAS HACIENDO UNA PETICION A SERVICIO VALOR CAMPOS");
    return this.servicioValorCamposService.create(CreateServicioValorCampoArrayDto.items);
  }

  @ApiBody({ type: [GetServicioValorCampoDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-valor-campos', 'get')
  findAll() {
    return this.servicioValorCamposService.findAll();
  }

  @ApiBody({ type: GetServicioValorCampoDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-valor-campos', 'get')
  findOne(@Param('id') id: string) {
    return this.servicioValorCamposService.findOne(+id);
  }

  @ApiBody({ type: CreateServicioValorCampoDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-valor-campos', 'put')
  update(@Param('id') id: string, @Body() updateServicioValorCampoDto: UpdateServicioValorCampoDto) {
    return this.servicioValorCamposService.update(+id, updateServicioValorCampoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-valor-campos', 'delete')
  remove(@Param('id') id: string) {
    return this.servicioValorCamposService.remove(+id);
  }
}
