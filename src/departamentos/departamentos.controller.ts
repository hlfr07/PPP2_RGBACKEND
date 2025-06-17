import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { GetDepartamentoDto } from './dto/get-departamento.dto';

@ApiTags('Departamentos')
@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) { }

  @ApiBody({ type: CreateDepartamentoDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('departamentos', 'post')
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @ApiBody({ type: [GetDepartamentoDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('departamentos', 'get')
  findAll() {
    return this.departamentosService.findAll();
  }

  @ApiBody({ type: GetDepartamentoDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('departamentos', 'get')
  findOne(@Param('id') id: string) {
    return this.departamentosService.findOne(+id);
  }

  @ApiBody({ type: CreateDepartamentoDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('departamentos', 'put')
  update(@Param('id') id: string, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentosService.update(+id, updateDepartamentoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('departamentos', 'delete')
  remove(@Param('id') id: string) {
    return this.departamentosService.remove(+id);
  }
}
