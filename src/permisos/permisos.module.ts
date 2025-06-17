import { forwardRef, Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Tabla } from 'src/tablas/entities/tabla.entity';
import { Perfile } from 'src/perfiles/entities/perfile.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso, Modulo, Tabla, Perfile]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [PermisosController],
  providers: [PermisosService],
  exports: [PermisosService]
})
export class PermisosModule {}
