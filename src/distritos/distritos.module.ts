import { forwardRef, Module } from '@nestjs/common';
import { DistritosService } from './distritos.service';
import { DistritosController } from './distritos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distrito } from './entities/distrito.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import e from 'express';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Distrito, Provincia]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [DistritosController],
  providers: [DistritosService],
  exports: [DistritosService]
})
export class DistritosModule { }
