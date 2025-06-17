import { forwardRef, Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio]),forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [ServiciosController],
  providers: [ServiciosService],
  exports: [ServiciosService]
})
export class ServiciosModule {}
