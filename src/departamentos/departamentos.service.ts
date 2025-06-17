import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentosService {

  constructor(@InjectRepository(Departamento) private departamentoRepsitory: Repository<Departamento>) { }

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    const DepartamentoExists = await this.departamentoRepsitory.findOneBy({
      departamento: createDepartamentoDto.departamento
    });

    if (DepartamentoExists) {
      throw new HttpException('El departamento ya existe', HttpStatus.CONFLICT);
    }

    const departamento = this.departamentoRepsitory.create({
      departamento: createDepartamentoDto.departamento
    });

    await this.departamentoRepsitory.save(departamento);

    return { menssage: 'Departamento creado con exito' };
  }

  findAll() {
    const departamentos = this.departamentoRepsitory.find(
      { order: { id: 'DESC' } }
    );

    return departamentos;
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRepsitory.findOneBy({
      id: id,
      estado: true
    });

    if (!departamento) {
      throw new HttpException('Departamento no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!departamento.estado) {
      throw new HttpException('Departamento no encontrado', HttpStatus.NOT_FOUND);
    }

    return departamento;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    const departamento = await this.departamentoRepsitory.findOneBy({
      id: id
    });

    if (!departamento) {
      throw new HttpException('Departamento no encontrado', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia del departamento con el mismo nombre solo si el nombre es diferente
    if (updateDepartamentoDto.departamento !== departamento.departamento) {
      const departamentoExists = await this.departamentoRepsitory.findOneBy({
        departamento: updateDepartamentoDto.departamento
      });

      if (departamentoExists) {
        throw new HttpException('El departamento ya existe', HttpStatus.CONFLICT);
      }
    }

    departamento.departamento = updateDepartamentoDto.departamento;

    await this.departamentoRepsitory.update(id, departamento);

    return { message: 'Departamento actualizado correctamente' };
  }

  async remove(id: number) {
    const departamento = await this.departamentoRepsitory.findOneBy({
      id: id
    });

    if (!departamento) {
      throw new HttpException('Departamento no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!departamento.estado) {
      throw new HttpException('Departamento eliminado', HttpStatus.NOT_FOUND
      );
    }

    await this.departamentoRepsitory.update(id, { estado: false });

    return { message: 'Departamento eliminado correctamente' };
  }
}
