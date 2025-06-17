import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetUsuarioDto } from './dto/get-usuario.dto';
import { UpdatePasswordUsuarioDto } from './dto/updatepassword-usuario.dto';
import { UpdatePasswordCodeUsuarioDto } from './dto/updatepasswordcode-usuarios.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @ApiBody({ type: CreateUsuarioDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('usuarios', 'get')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @ApiBody({ type: [GetUsuarioDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('usuarios', 'get')
  findAll() {
    return this.usuariosService.findAll();
  }

  @ApiBody({ type: [GetUsuarioDto] })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('usuarios', 'get')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @ApiBody({ type: UpdateUsuarioDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('usuarios', 'get')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @ApiBody({ type: UpdatePasswordUsuarioDto })
  @Post('/solicitarresetpassword')
  updatePassword(@Body() updatePasswordUsuarioDto: UpdatePasswordUsuarioDto) {
    return this.usuariosService.updatePassword(updatePasswordUsuarioDto);
  }

  @ApiBody({ type: UpdatePasswordCodeUsuarioDto })
  @Patch('/actualizarpassword/:dni')
  updatePasswordCode(@Param('dni') dni: string, @Body() updatePasswordCodeUsuarioDto: UpdatePasswordCodeUsuarioDto) {
    return this.usuariosService.updatePasswordCode(dni, updatePasswordCodeUsuarioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('usuarios', 'get')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  //creamos un get para buscar permisos por usuario
  @Get('buscarpermisos/:id')
  @UseGuards(JwtAuthGuard)
  buscarpermisosporidusuario(@Param('id') id: string) {
    return this.usuariosService.buscarpermisosporidusuario(+id);
  }

  //creamos un get /info que resivira un token el el body
    @Get('/info/:token')
    @UseGuards(JwtAuthGuard)
    info(@Param('token') token: string) {
      return this.usuariosService.buscarporToken(token);
    }
  
}
