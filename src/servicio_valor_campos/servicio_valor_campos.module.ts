import { forwardRef, Module } from '@nestjs/common';
import { ServicioValorCamposService } from './servicio_valor_campos.service';
import { ServicioValorCamposController } from './servicio_valor_campos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioValorCampo } from './entities/servicio_valor_campo.entity';
import { ServicioCampo } from 'src/servicio_campos/entities/servicio_campo.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioValorCampo, ServicioCampo, Actividade]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [ServicioValorCamposController],
  providers: [ServicioValorCamposService],
  exports: [ServicioValorCamposService]
})
export class ServicioValorCamposModule { }
