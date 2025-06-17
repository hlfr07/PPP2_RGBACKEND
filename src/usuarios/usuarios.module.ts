import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { TablasModule } from 'src/tablas/tablas.module';
import { ModulosModule } from 'src/modulos/modulos.module';
import { DetallePerfilesModule } from 'src/detalle_perfiles/detalle_perfiles.module';
import { PermisosModule } from 'src/permisos/permisos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), MailModule,
    TablasModule, ModulosModule, DetallePerfilesModule, PermisosModule
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule { }
