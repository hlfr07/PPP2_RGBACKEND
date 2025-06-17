import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetClienteDto } from './dto/get-clientes.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @ApiBody({ type: CreateClienteDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('clientes', 'post')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @ApiBody({ type: [GetClienteDto] })
  @Get('page/:page/size/:size')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('clientes', 'get')
  findAll(@Param('page') page: number, @Param('size') size: number) {
    return this.clientesService.findAll(+page, +size);
  }

  @ApiBody({ type: GetClienteDto })
  @Get(':cod_contrato')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('clientes', 'get')
  findOne(@Param('cod_contrato') cod_contrato: string) {
    return this.clientesService.findOne(+cod_contrato);
  }

  @ApiBody({ type: CreateClienteDto })
  @Patch(':cod_contrato')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('clientes', 'put')
  update(@Param('cod_contrato') cod_contrato: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+cod_contrato, updateClienteDto);
  }

  @Delete(':cod_contrato')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('clientes', 'delete')
  remove(@Param('cod_contrato') cod_contrato: string) {
    return this.clientesService.remove(+cod_contrato);
  }

  //creamos el controlador para createMany en clientes
  @ApiBody({ type: [CreateClienteDto] })
  @Post('subirexcel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('clientes', 'post')
  createMany(@Body() createClienteDto: CreateClienteDto[]) {
    return this.clientesService.createMany(createClienteDto);
  }
}
