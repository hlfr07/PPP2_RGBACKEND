import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { DetallePerfilesModule } from 'src/detalle_perfiles/detalle_perfiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePerfile } from 'src/detalle_perfiles/entities/detalle_perfile.entity';
import { ModulosModule } from 'src/modulos/modulos.module';
import { TablasModule } from 'src/tablas/tablas.module';
import { PermisosModule } from 'src/permisos/permisos.module';

@Module({
  imports: [PermisosModule,TablasModule ,ModulosModule,UsuariosModule, DetallePerfilesModule, JwtModule.register({
    global: true,
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
