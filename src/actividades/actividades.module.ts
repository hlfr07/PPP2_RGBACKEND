import { forwardRef, Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Actividade } from './entities/actividade.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Actividade, Cliente, Servicio]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [ActividadesController],
  providers: [ActividadesService],
  exports: [ActividadesService]
})
export class ActividadesModule { }
