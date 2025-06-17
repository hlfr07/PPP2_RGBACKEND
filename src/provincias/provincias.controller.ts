import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('provincias')
@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('provincias', 'post')
  create(@Body() createProvinciaDto: CreateProvinciaDto) {
    return this.provinciasService.create(createProvinciaDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('provincias', 'get')
  findAll() {
    return this.provinciasService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('provincias', 'get')
  findOne(@Param('id') id: string) {
    return this.provinciasService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('provincias', 'put')
  update(@Param('id') id: string, @Body() updateProvinciaDto: UpdateProvinciaDto) {
    return this.provinciasService.update(+id, updateProvinciaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('provincias', 'delete')
  remove(@Param('id') id: string) {
    return this.provinciasService.remove(+id);
  }
}
