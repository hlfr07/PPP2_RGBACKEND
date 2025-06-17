import { PartialType } from '@nestjs/swagger';
import { CreateServicioValorCampoDto } from './create-servicio_valor_campo.dto';

export class UpdateServicioValorCampoDto extends PartialType(CreateServicioValorCampoDto) {}
