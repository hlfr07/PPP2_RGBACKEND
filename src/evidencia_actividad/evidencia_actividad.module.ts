import { forwardRef, Module } from '@nestjs/common';
import { EvidenciaActividadService } from './evidencia_actividad.service';
import { EvidenciaActividadController } from './evidencia_actividad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividade } from 'src/actividades/entities/actividade.entity';
import { EvidenciaActividad } from './entities/evidencia_actividad.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([EvidenciaActividad,Actividade]),forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [EvidenciaActividadController],
  providers: [EvidenciaActividadService],
  exports: [EvidenciaActividadService],
})
export class EvidenciaActividadModule {}
