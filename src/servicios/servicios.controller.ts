import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetServicioDto } from './dto/get-servicio.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('servicios')
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) { }

  @ApiBody({ type: CreateServicioDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicios', 'post')
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @ApiBody({ type: [GetServicioDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicios', 'get')
  findAll() {
    return this.serviciosService.findAll();
  }

  @ApiBody({ type: GetServicioDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicios', 'get')
  findOne(@Param('id') id: string) {
    return this.serviciosService.findOne(+id);
  }

  @ApiBody({ type: CreateServicioDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicios', 'put')
  update(@Param('id') id: string, @Body() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(+id, updateServicioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicios', 'delete')
  remove(@Param('id') id: string) {
    return this.serviciosService.remove(+id);
  }
}
