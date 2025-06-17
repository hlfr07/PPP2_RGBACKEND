import { forwardRef, Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { Type } from 'class-transformer';
import { Modulo } from './entities/modulo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Modulo]),forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [ModulosController],
  providers: [ModulosService],
  exports: [ModulosService]
})
export class ModulosModule {}
