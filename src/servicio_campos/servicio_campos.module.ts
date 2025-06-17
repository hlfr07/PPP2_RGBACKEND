import { forwardRef, Module } from '@nestjs/common';
import { ServicioCamposService } from './servicio_campos.service';
import { ServicioCamposController } from './servicio_campos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioCampo } from './entities/servicio_campo.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioCampo, Servicio]),forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [ServicioCamposController],
  providers: [ServicioCamposService],
  exports: [ServicioCamposService]
})
export class ServicioCamposModule {}
