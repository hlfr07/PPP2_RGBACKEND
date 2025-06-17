import { PartialType } from '@nestjs/swagger';
import { CreateEvidenciaActividadDto } from './create-evidencia_actividad.dto';

export class UpdateEvidenciaActividadDto extends PartialType(CreateEvidenciaActividadDto) {}
