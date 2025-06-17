import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { CreatePerfileDto } from './dto/create-perfile.dto';
import { UpdatePerfileDto } from './dto/update-perfile.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetPerfileDto } from './dto/get-perfile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('Perfiles')
@Controller('perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @ApiBody({ type: CreatePerfileDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('perfiles', 'get')
  create(@Body() createPerfileDto: CreatePerfileDto) {
    return this.perfilesService.create(createPerfileDto);
  }

  @ApiBody({ type: [GetPerfileDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('perfiles', 'get') // Usuarios con rol 'admin' o 'user' pueden ver todos 
  findAll() {
    return this.perfilesService.findAll();
  }

  @ApiBody({ type: GetPerfileDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('perfiles', 'get')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilesService.findOne(+id);
  }

  @ApiBody({ type: CreatePerfileDto }) //se usa el create para el body
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('perfiles', 'get')
  update(@Param('id') id: string, @Body() updatePerfileDto: UpdatePerfileDto) {
    return this.perfilesService.update(+id, updatePerfileDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('perfiles', 'get')
  remove(@Param('id') id: string) {
    return this.perfilesService.remove(+id);
  }
}
