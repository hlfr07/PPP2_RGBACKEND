import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDistritoDto } from './dto/create-distrito.dto';
import { UpdateDistritoDto } from './dto/update-distrito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Distrito } from './entities/distrito.entity';
import { Repository } from 'typeorm';
import { Provincia } from 'src/provincias/entities/provincia.entity';

@Injectable()
export class DistritosService {
  constructor(@InjectRepository(Distrito) private distritoRepository: Repository<Distrito>, @InjectRepository(Provincia) private provinciaRepository: Repository<Provincia>) { }

  async create(createDistritoDto: CreateDistritoDto) {
    const provinciaExists = await this.provinciaRepository.findOneBy({
      id: parseInt(createDistritoDto.provincia_id)
    });

    if (!provinciaExists) {
      throw new HttpException('La provincia no existe', HttpStatus.NOT_FOUND);
    }

    const distritoExists = await this.distritoRepository.findOneBy({
      distrito: createDistritoDto.distrito
    });

    if (distritoExists) {
      throw new HttpException('El distrito ya existe', HttpStatus.CONFLICT);
    }

    const distrito = this.distritoRepository.create({
      distrito: createDistritoDto.distrito,
      provincia: provinciaExists
    });

    await this.distritoRepository.save(distrito);

    return distrito;
  }

  findAll() {
    const distritos = this.distritoRepository.find({
      order: { id: 'DESC' },
    });

    return distritos;
  }

  async findOne(id: number) {
    const distrito = await this.distritoRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!distrito) {
      throw new HttpException('Distrito no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!distrito.estado) {
      throw new HttpException('Distrito no encontrado', HttpStatus.NOT_FOUND);
    }

    return distrito;
  }

  async update(id: number, updateDistritoDto: UpdateDistritoDto) {
    const distrito = await this.distritoRepository.findOneBy({
      id: id
    });

    if (!distrito) {
      throw new HttpException('Distrito no encontrado', HttpStatus.NOT_FOUND);
    }

    const provinciaExists = await this.provinciaRepository.findOneBy({
      id: parseInt(updateDistritoDto.provincia_id)
    });

    if (!provinciaExists) {
      throw new HttpException('La provincia no existe', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia del distrito con el mismo nombre solo si el nombre es diferente
    if (updateDistritoDto.distrito !== distrito.distrito) {
      const distritoExists = await this.distritoRepository.findOneBy({
        distrito: updateDistritoDto.distrito
      });

      if (distritoExists) {
        throw new HttpException('El distrito ya existe', HttpStatus.CONFLICT);
      }
    }

    distrito.distrito = updateDistritoDto.distrito;
    distrito.provincia = provinciaExists;

    await this.distritoRepository.update(id, distrito);

    return { message: 'Distrito actualizado correctamente' };
  }

  async remove(id: number) {
    const distrito = await this.distritoRepository.findOneBy({
      id: id
    });

    if (!distrito) {
      throw new HttpException('Distrito no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!distrito.estado) {
      throw new HttpException('Distrito eliminado', HttpStatus.NOT_FOUND);
    }

    await this.distritoRepository.update(id, { estado: false });

    return { message: 'Distrito eliminado correctamente' };
  }
}
