import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/login-auth.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs'
import { DetallePerfilesService } from '../detalle_perfiles/detalle_perfiles.service';
import { PermisosService } from '../permisos/permisos.service';
@Injectable()
export class AuthService {
  //creamos el constructor para usar el servicio de usuario
  constructor(private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService, private readonly detallePerfiles: DetallePerfilesService, private readonly Permisos: PermisosService) { }
  async create(createAuthDto: CreateAuthDto) {
    //buscamos el usuario por el nombre
    const usuario = await this.usuarioService.buscarParaLogin(createAuthDto.usuario);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordValido = await bcryptjs.compare(createAuthDto.password, usuario.password);

    if (!passwordValido) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    //buscamos los perfiles que le corresponde a cada usuario
    const detallePerfiles = await this.detallePerfiles.buscarperfilesporidusuario(usuario.id);

    //ahora haremos un foreach para recorrer el detallePerfiles y extraer el perfil
    const perfilesEncontrados = [];

    detallePerfiles.forEach(detallePerfiles => {
      perfilesEncontrados.push(detallePerfiles.perfil);
    });


    //console.log(detallePerfiles);

    //recorremos con un foreach al detallePerfiles para extraer el permisos usando el servicio de permisos
    const permisos = await this.Permisos.buscarPermisosperfil(detallePerfiles);

    //console.log(permisos);

    const payload = {
      sub: usuario.id,
      usuario: {
        id: usuario.id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      }
    };
    console.log("PERMISOS DE MI USUARIO", payload);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN,
      expiresIn: 60 * 60, // 1 hora
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN,
      expiresIn: 60 * 60 * 24 * 30, // 30 días
    });

    return {
      token: accessToken,
      refreshToken: refreshToken,
    };
  }
}
