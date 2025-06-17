import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServicioCamposService } from './servicio_campos.service';
import { CreateServicioCampoDto } from './dto/create-servicio_campo.dto';
import { UpdateServicioCampoDto } from './dto/update-servicio_campo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { GetServicioCampoDto } from './dto/get-servicio_campo.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DeleteServicioCampoDto } from './dto/delete-servicio_campo.dto';

// DTO para representar el arreglo
class CreateServicioCampoArrayDto {
  @ApiProperty({ type: [CreateServicioCampoDto] })
  @IsArray({ message: 'El cuerpo debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => CreateServicioCampoDto)
  items: CreateServicioCampoDto[];
}

class UpdateServicioCampoArrayDto {
  @ApiProperty({ type: [UpdateServicioCampoDto] })
  @IsArray({ message: 'El cuerpo debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => UpdateServicioCampoDto)
  items: UpdateServicioCampoDto[];
}

class DeleteServicioCampoArrayDto {
  @ApiProperty({ type: [DeleteServicioCampoDto] })
  @IsArray({ message: 'El cuerpo debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => DeleteServicioCampoDto)
  items: DeleteServicioCampoDto[];
}


@ApiTags('servicio-campos')
@Controller('servicio-campos')
export class ServicioCamposController {
  constructor(private readonly servicioCamposService: ServicioCamposService) { }

  @ApiBody({ type: CreateServicioCampoArrayDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'post')
  create(@Body() CreateServicioCampoArrayDto: CreateServicioCampoArrayDto) {
    return this.servicioCamposService.create(CreateServicioCampoArrayDto.items);
  }

  @ApiBody({ type: [GetServicioCampoDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'get')
  findAll() {
    return this.servicioCamposService.findAll();
  }

  @ApiBody({ type: GetServicioCampoDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'get')
  findOne(@Param('id') id: string) {
    return this.servicioCamposService.findOne(+id);
  }

  @ApiBody({ type: UpdateServicioCampoArrayDto })
  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'put')
  update(@Body() UpdateServicioCampoArrayDto: UpdateServicioCampoArrayDto) {
    return this.servicioCamposService.update(UpdateServicioCampoArrayDto.items);
  }

  @ApiBody({ type: DeleteServicioCampoArrayDto })
  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'delete')
  remove(@Body() DeleteServicioCampoArrayDto: DeleteServicioCampoArrayDto) {
    console.log(DeleteServicioCampoArrayDto);
    return this.servicioCamposService.remove(DeleteServicioCampoArrayDto.items);
  }
}
