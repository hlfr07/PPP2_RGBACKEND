import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetPermisoDto } from './dto/get-permiso.dto';

@ApiTags('Permisos')
@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @ApiBody({ type: CreatePermisoDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('permisos', 'get')
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @ApiBody({ type: [GetPermisoDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('permisos', 'get')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('permisos', 'get')
  findAll() {
    return this.permisosService.findAll();
  }

  @ApiBody({ type: GetPermisoDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('permisos', 'get')
  findOne(@Param('id') id: string) {
    return this.permisosService.findOne(+id);
  }

  @ApiBody({ type: CreatePermisoDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('permisos', 'get')
  update(@Param('id') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisosService.update(+id, updatePermisoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('permisos', 'get')
  remove(@Param('id') id: string) {
    return this.permisosService.remove(+id);
  }
}
