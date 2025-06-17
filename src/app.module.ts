import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilesModule } from './perfiles/perfiles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SesionesModule } from './sesiones/sesiones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TablasModule } from './tablas/tablas.module';
import { ModulosModule } from './modulos/modulos.module';
import { DetallePerfilesModule } from './detalle_perfiles/detalle_perfiles.module';
import { MailService } from './mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { RaresModule } from './rares/rares.module';
import { PermisosModule } from './permisos/permisos.module';
import { ServiciosModule } from './servicios/servicios.module';
import { ServicioCamposModule } from './servicio_campos/servicio_campos.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { ProvinciasModule } from './provincias/provincias.module';
import { DistritosModule } from './distritos/distritos.module';
import { ClientesModule } from './clientes/clientes.module';
import { ActividadesModule } from './actividades/actividades.module';
import { ServicioValorCamposModule } from './servicio_valor_campos/servicio_valor_campos.module';
import { EvidenciaActividadModule } from './evidencia_actividad/evidencia_actividad.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,//
      // ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : null, 
    }),
    PerfilesModule,
    SesionesModule,
    UsuariosModule,
    TablasModule,
    ModulosModule,
    DetallePerfilesModule,
    MailModule,
    AuthModule,
    RaresModule,
    PermisosModule,
    ServiciosModule,
    ServicioCamposModule,
    DepartamentosModule,
    ProvinciasModule,
    DistritosModule,
    ClientesModule,
    ActividadesModule,
    ServicioValorCamposModule,
    EvidenciaActividadModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule { }