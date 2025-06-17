import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiciosService {
  constructor(@InjectRepository(Servicio) private servicioRepository: Repository<Servicio>) { }
  async create(createServicioDto: CreateServicioDto) {
    const servicioEncontrado = await this.servicioRepository.findOneBy({
      servicio: createServicioDto.servicio
    });

    if (servicioEncontrado) {
      throw new HttpException('El servicio ya existe', HttpStatus.CONFLICT);
    }

    const nuevoServicio = this.servicioRepository.create({
      servicio: createServicioDto.servicio,
    });

    await this.servicioRepository.save(nuevoServicio);

    return { message: 'Servicio creado correctamente' };
  }

  findAll() {
    const servicios = this.servicioRepository.find({
      order: { id: 'DESC' }
    });

    return servicios;
  }

  async findOne(id: number) {
    const servicioEncontrado = await this.servicioRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!servicioEncontrado) {
      throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!servicioEncontrado.estado) {
      throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
    }

    return servicioEncontrado;
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    const servicioEncontrado = await this.servicioRepository.findOneBy({
      id: id,
    });

    if (!servicioEncontrado) {
      throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia de un servicio con el mismo nombre ya sea solo si el nombre es diferente

    if (updateServicioDto.servicio !== servicioEncontrado.servicio) {
      const servicioExist = await this.servicioRepository.findOneBy({
        servicio: updateServicioDto.servicio
      });

      if (servicioExist) {
        throw new HttpException('El servicio ya existe', HttpStatus.CONFLICT);
      }
    }

    servicioEncontrado.servicio = updateServicioDto.servicio;

    await this.servicioRepository.update(id, servicioEncontrado);

    return { message: 'Servicio actualizado correctamente' };
  }

 async remove(id: number) {
    const servicioEncontrado = await this.servicioRepository.findOneBy({
      id: id,
    });

    if (!servicioEncontrado) {
      throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
    }
    
    if (!servicioEncontrado.estado) {
      throw new HttpException('Servicio eliminado', HttpStatus.NOT_FOUND);
    }

    await this.servicioRepository.update(id, { estado: false });

    return { message: 'Servicio eliminado correctamente' };
  }
}
