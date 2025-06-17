import { forwardRef, Module } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { ProvinciasController } from './provincias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia, Departamento]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [ProvinciasController],
  providers: [ProvinciasService],
  exports: [ProvinciasService]
})
export class ProvinciasModule { }
