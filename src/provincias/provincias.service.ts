import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { Repository } from 'typeorm';
import { Departamento } from 'src/departamentos/entities/departamento.entity';

@Injectable()
export class ProvinciasService {
  constructor(@InjectRepository(Provincia) private provinciaRepository: Repository<Provincia>, @InjectRepository(Departamento) private departamentoRepository: Repository<Departamento>) { }

  async create(createProvinciaDto: CreateProvinciaDto) {

    const departamentoExist = await this.departamentoRepository.findOneBy({
      id: parseInt(createProvinciaDto.departamento_id)
    });

    if (!departamentoExist) {
      throw new HttpException('El departamento no existe', HttpStatus.NOT_FOUND);
    }

    const provinciaExist = await this.provinciaRepository.findOneBy({
      provincia: createProvinciaDto.provincia
    });

    if (provinciaExist) {
      throw new HttpException('La provincia ya existe', HttpStatus.CONFLICT);
    }

    const provincia = this.provinciaRepository.create({
      provincia: createProvinciaDto.provincia,
      departamento: departamentoExist,
    });

    await this.provinciaRepository.save(provincia);

    return provincia;
  }

  findAll() {
    const provincias = this.provinciaRepository.find({
      order: { id: 'DESC' },
    });

    return provincias;
  }

  async findOne(id: number) {
    const provincia = await this.provinciaRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!provincia) {
      throw new HttpException('La provincia no existe', HttpStatus.NOT_FOUND);
    }

    if (!provincia.estado) {
      throw new HttpException('La provincia no está disponible', HttpStatus.BAD_REQUEST);
    }

    return provincia;
  }

  async update(id: number, updateProvinciaDto: UpdateProvinciaDto) {

    const provincia = await this.provinciaRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!provincia) {
      throw new HttpException('La provincia no existe', HttpStatus.NOT_FOUND);
    }

    const departamentoExist = await this.departamentoRepository.findOneBy({
      id: parseInt(updateProvinciaDto.departamento_id)
    });

    if (!departamentoExist) {
      throw new HttpException('El departamento no existe', HttpStatus.NOT_FOUND);
    }

    //comprobamos la existencia de la provincia con el mismo nombre solo si el nombre es diferente
    if (updateProvinciaDto.provincia !== provincia.provincia) {
      const provinciaExist = await this.provinciaRepository.findOneBy({
        provincia: updateProvinciaDto.provincia
      });

      if (provinciaExist) {
        throw new HttpException('La provincia ya existe', HttpStatus.CONFLICT);
      }
    }

    provincia.provincia = updateProvinciaDto.provincia;
    provincia.departamento = departamentoExist;

    await this.provinciaRepository.update(id, provincia);

    return { message: 'Provincia actualizada correctamente' };

  }

  async remove(id: number) {
    const provincia = await this.provinciaRepository.findOneBy({
      id: id
    });

    if (!provincia) {
      throw new HttpException('La provincia no existe', HttpStatus.NOT_FOUND);
    }

    if (!provincia.estado) {
      throw new HttpException('La provincia esta eliminada', HttpStatus.BAD_REQUEST);
    }

    await this.provinciaRepository.update(id, { estado: false });

    return { message: 'Provincia eliminada correctamente' };
  }
}
