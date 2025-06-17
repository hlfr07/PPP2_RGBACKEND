import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetModuloDto } from './dto/get-modulo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('Modulos')
@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @ApiBody({ type: CreateModuloDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('modulos', 'get')
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.modulosService.create(createModuloDto);
  }

  @ApiBody({ type: [GetModuloDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('modulos', 'get')
  findAll() {
    return this.modulosService.findAll();
  }

  @ApiBody({ type: GetModuloDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('modulos', 'get')
  findOne(@Param('id') id: string) {
    return this.modulosService.findOne(+id);
  }

  @ApiBody({ type: CreateModuloDto }) //se usa el create para el body
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('modulos', 'get')
  update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    return this.modulosService.update(+id, updateModuloDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('modulos', 'get')
  remove(@Param('id') id: string) {
    return this.modulosService.remove(+id);
  }
}
