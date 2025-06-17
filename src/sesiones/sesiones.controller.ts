import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SesionesService } from './sesiones.service';
import { CreateSesioneDto } from './dto/create-sesione.dto';
import { UpdateSesioneDto } from './dto/update-sesione.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetSesioneDto } from './dto/get.sesione.dto';

@ApiTags('sesiones')
@Controller('sesiones')
export class SesionesController {
  constructor(private readonly sesionesService: SesionesService) {}

  @ApiBody({ type: CreateSesioneDto })
  @Post()
  create(@Body() createSesioneDto: CreateSesioneDto) {
    return this.sesionesService.create(createSesioneDto);
  }

  @ApiBody({ type: [GetSesioneDto] })
  @Get()
  findAll() {
    return this.sesionesService.findAll();
  }

  @ApiBody({ type: [GetSesioneDto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionesService.findOne(+id);
  }

  @ApiBody({ type: CreateSesioneDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSesioneDto: UpdateSesioneDto) {
    return this.sesionesService.update(+id, updateSesioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesionesService.remove(+id);
  }
}
