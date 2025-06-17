import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DistritosService } from './distritos.service';
import { CreateDistritoDto } from './dto/create-distrito.dto';
import { UpdateDistritoDto } from './dto/update-distrito.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetDistritoDto } from './dto/get-distrito.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('distritos')
@Controller('distritos')
export class DistritosController {
  constructor(private readonly distritosService: DistritosService) { }

  @ApiBody({ type: CreateDistritoDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('distritos', 'post')
  create(@Body() createDistritoDto: CreateDistritoDto) {
    return this.distritosService.create(createDistritoDto);
  }

  @ApiBody({ type: [GetDistritoDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('distritos', 'get')
  findAll() {
    return this.distritosService.findAll();
  }

  @ApiBody({ type: GetDistritoDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('distritos', 'get')
  findOne(@Param('id') id: string) {
    return this.distritosService.findOne(+id);
  }

  @ApiBody({ type: CreateDistritoDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('distritos', 'put')
  update(@Param('id') id: string, @Body() updateDistritoDto: UpdateDistritoDto) {
    return this.distritosService.update(+id, updateDistritoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('distritos', 'delete')
  remove(@Param('id') id: string) {
    return this.distritosService.remove(+id);
  }
}
