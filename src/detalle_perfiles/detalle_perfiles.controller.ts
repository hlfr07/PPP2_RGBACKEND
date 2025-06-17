import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DetallePerfilesService } from './detalle_perfiles.service';
import { CreateDetallePerfileDto } from './dto/create-detalle_perfile.dto';
import { UpdateDetallePerfileDto } from './dto/update-detalle_perfile.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetDetallePerfileDto } from './dto/get-detalle_perfile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
@ApiTags('detalle-perfiles')
@Controller('detalle-perfiles')
export class DetallePerfilesController {
  constructor(private readonly detallePerfilesService: DetallePerfilesService) { }

  @ApiBody({ type: CreateDetallePerfileDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle_perfiles', 'post')
  create(@Body() createDetallePerfileDto: CreateDetallePerfileDto) {
    return this.detallePerfilesService.create(createDetallePerfileDto);
  }

  @ApiBody({ type: [GetDetallePerfileDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle_perfiles', 'get')
  findAll() {
    return this.detallePerfilesService.findAll();
  }

  @ApiBody({ type: [GetDetallePerfileDto] })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle_perfiles', 'get')
  findOne(@Param('id') id: string) {
    return this.detallePerfilesService.findOne(+id);
  }

  @ApiBody({ type: CreateDetallePerfileDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle_perfiles', 'put')
  update(@Param('id') id: string, @Body() updateDetallePerfileDto: UpdateDetallePerfileDto) {
    return this.detallePerfilesService.update(+id, updateDetallePerfileDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle_perfiles', 'delete')
  remove(@Param('id') id: string) {
    return this.detallePerfilesService.remove(+id);
  }
}
