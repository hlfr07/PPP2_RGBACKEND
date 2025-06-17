import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Injectable()
export class ActividadesService {

  constructor(@InjectRepository(Actividade) private actividadRepository: Repository<Actividade>, @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>, @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>, @InjectRepository(Servicio) private servicioRepository: Repository<Servicio>) { }

  async create(createActividadeDto: CreateActividadeDto) {
    const usuarioExists = await this.usuarioRepository.findOneBy({
      id: parseInt(createActividadeDto.usuario_id)
    });

    if (!usuarioExists) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }

    const clienteExists = await this.clienteRepository.findOneBy({
      cod_contrato: parseInt(createActividadeDto.cliente_cod_contrato)
    });

    if (!clienteExists) {
      throw new HttpException('El cliente no existe', HttpStatus.NOT_FOUND);
    }

    const servicioExists = await this.servicioRepository.findOneBy({
      id: parseInt(createActividadeDto.servicio_id)
    });

    if (!servicioExists) {
      throw new HttpException('El servicio no existe', HttpStatus.NOT_FOUND);
    }

    const actividad = this.actividadRepository.create({
      usuario: usuarioExists,
      cliente: clienteExists,
      servicio: servicioExists,
      titulo: createActividadeDto.titulo,
      descripcion: createActividadeDto.descripcion,
      fecha: createActividadeDto.fecha
    });

    await this.actividadRepository.save(actividad);

    return actividad;
  }

  findAll() {
    const actividades = this.actividadRepository.find({
      where: { etapa: false },
      order: { id: 'DESC' },
    });

    return actividades;
  }

  async findOne(id: number) {
    const actividad = await this.actividadRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!actividad) {
      throw new HttpException('Actividad no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!actividad.estado) {
      throw new HttpException('Actividad no encontrada', HttpStatus.NOT_FOUND);
    }

    return actividad;
  }

  async update(id: number, updateActividadeDto: UpdateActividadeDto) {
    const actividad = await this.actividadRepository.findOneBy({
      id: id
    });

    if (!actividad) {
      throw new HttpException('Actividad no encontrada', HttpStatus.NOT_FOUND);
    }

    const usuarioExists = await this.usuarioRepository.findOneBy({
      id: parseInt(updateActividadeDto.usuario_id)
    });

    if (!usuarioExists) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }

    const clienteExists = await this.clienteRepository.findOneBy({
      cod_contrato: parseInt(updateActividadeDto.cliente_cod_contrato)
    });

    if (!clienteExists) {
      throw new HttpException('El cliente no existe', HttpStatus.NOT_FOUND);
    }

    const servicioExists = await this.servicioRepository.findOneBy({
      id: parseInt(updateActividadeDto.servicio_id)
    });

    if (!servicioExists) {
      throw new HttpException('El servicio no existe', HttpStatus.NOT_FOUND);
    }

    actividad.usuario = usuarioExists;
    actividad.cliente = clienteExists;
    actividad.servicio = servicioExists;
    actividad.titulo = updateActividadeDto.titulo;
    actividad.descripcion = updateActividadeDto.descripcion;
    actividad.fecha = updateActividadeDto.fecha;

    await this.actividadRepository.save(actividad);

    return { messaje: 'Actividad actualizada' };
  }

  async remove(id: number) {
    const actividad = await this.actividadRepository.findOneBy({
      id: id
    });

    if (!actividad) {
      throw new HttpException('Actividad no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!actividad.estado) {
      throw new HttpException('Actividad eliminada', HttpStatus.NOT_FOUND);
    }

    await this.actividadRepository.update(id, { estado: false });

    return { messaje: 'Actividad eliminada' };
  }
}
