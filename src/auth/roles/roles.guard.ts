import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuariosService } from '../../usuarios/usuarios.service';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector, private PermisosService: UsuariosService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {  // Declaramos la función como async
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Si la ruta no tiene roles definidos, permite el acceso
    }

    const { user } = context.switchToHttp().getRequest();

    //llamamos al serivicio de permisosidusuario
    const permisosdelservicio = await this.PermisosService.buscarpermisosporidusuario(user?.sub);
    // console.log("PERMISOSOS DE MI SERVICIO USUARIOS",permisosdelservicio.tablas);
    const tablas = permisosdelservicio?.tablas;
    // console.log(tablas);

    if (!tablas) {
      throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
    }

    // Desestructurar tabla y permiso requeridos desde el decorador @Roles
    const [requiredTable, requiredPermission] = requiredRoles;
    //console.log(requiredTable, requiredPermission);
    // Verificar si el usuario tiene el permiso requerido, para eso recorremos con un foreach a permisos
    let tienePermiso = false;
    tablas.forEach((elementpermiso) => {
      //console.log(elementpermiso.tabla.estado);
      if (elementpermiso.tabla.estado) {
        //console.log(elementpermiso.tabla.tabla, elementpermiso.permiso[requiredPermission]);
        if (elementpermiso.tabla.tabla === requiredTable && elementpermiso.permiso[requiredPermission] === true) {
          tienePermiso = true;
        }
      }
    });

    // const userRole = user?.rol.perfil; // El rol está en el payload del token

    if (!tienePermiso) {
      throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
    }

    return true;
  }
}
