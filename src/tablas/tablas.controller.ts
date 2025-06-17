import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TablasService } from './tablas.service';
import { CreateTablaDto } from './dto/create-tabla.dto';
import { UpdateTablaDto } from './dto/update-tabla.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetTablaDto } from './dto/get-tabla.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';

@ApiTags('Tablas')
@Controller('tablas')
export class TablasController {
  constructor(private readonly tablasService: TablasService) { }

  @ApiBody({ type: CreateTablaDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('tablas', 'get')
  create(@Body() createTablaDto: CreateTablaDto) {
    return this.tablasService.create(createTablaDto);
  }

  @ApiBody({ type: [GetTablaDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('tablas', 'get')
  findAll() {
    return this.tablasService.findAll();
  }

  @ApiBody({ type: GetTablaDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('tablas', 'get')
  findOne(@Param('id') id: string) {
    return this.tablasService.findOne(+id);
  }

  @ApiBody({ type: CreateTablaDto }) //se usa el create para el body
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('tablas', 'get')
  update(@Param('id') id: string, @Body() updateTablaDto: UpdateTablaDto) {
    return this.tablasService.update(+id, updateTablaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('tablas', 'get')
  remove(@Param('id') id: string) {
    return this.tablasService.remove(+id);
  }
}
