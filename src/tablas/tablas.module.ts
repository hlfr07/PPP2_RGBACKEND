import { forwardRef, Module } from '@nestjs/common';
import { TablasService } from './tablas.service';
import { TablasController } from './tablas.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tabla } from './entities/tabla.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PerfilesModule } from 'src/perfiles/perfiles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tabla]), forwardRef(() => UsuariosModule),
  forwardRef(() => PerfilesModule),],
  controllers: [TablasController],
  providers: [TablasService],
  exports: [TablasService]
})
export class TablasModule {}
