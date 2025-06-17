import { Module } from '@nestjs/common';
import { SesionesService } from './sesiones.service';
import { SesionesController } from './sesiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesione } from './entities/sesione.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sesione, Usuario])],
  controllers: [SesionesController],
  providers: [SesionesService],
  exports: [SesionesService]
})
export class SesionesModule {}
