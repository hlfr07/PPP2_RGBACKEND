import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { GetActividadeDto } from './dto/get-actividade.dto';

@ApiTags('actividades')
@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) { }

  @ApiBody({ type: CreateActividadeDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('actividades', 'post')
  create(@Body() createActividadeDto: CreateActividadeDto) {
    return this.actividadesService.create(createActividadeDto);
  }

  @ApiBody({ type: [GetActividadeDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('actividades', 'get')
  findAll() {
    return this.actividadesService.findAll();
  }

  @ApiBody({ type: GetActividadeDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('actividades', 'get')
  findOne(@Param('id') id: string) {
    return this.actividadesService.findOne(+id);
  }

  @ApiBody({ type: CreateActividadeDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('actividades', 'put')
  update(@Param('id') id: string, @Body() updateActividadeDto: UpdateActividadeDto) {
    return this.actividadesService.update(+id, updateActividadeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('actividades', 'delete')
  remove(@Param('id') id: string) {
    return this.actividadesService.remove(+id);
  }
}
