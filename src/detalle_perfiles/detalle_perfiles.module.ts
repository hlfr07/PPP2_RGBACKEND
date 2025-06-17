import { forwardRef, Module } from '@nestjs/common';
import { DetallePerfilesService } from './detalle_perfiles.service';
import { DetallePerfilesController } from './detalle_perfiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePerfile } from './entities/detalle_perfile.entity';
import { Perfile } from 'src/perfiles/entities/perfile.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePerfile, Perfile, Usuario]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [DetallePerfilesController],
  providers: [DetallePerfilesService],
  exports: [DetallePerfilesService]
})
export class DetallePerfilesModule { }
