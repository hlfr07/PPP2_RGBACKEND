import { HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModulosService {

  constructor(@InjectRepository(Modulo) private moduloRepository: Repository<Modulo>) { }

  async create(createModuloDto: CreateModuloDto) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      modulo: createModuloDto.modulo
    });

    if (moduloEncontrado) {
      throw new HttpException('El módulo ya existe', HttpStatus.CONFLICT);
    }

    const nuevoModulo = this.moduloRepository.create({
      modulo: createModuloDto.modulo,
    });

    await this.moduloRepository.save(nuevoModulo);

    return { message: 'Módulo creado correctamente' };
  }

  findAll() {
    const modulos = this.moduloRepository.find({
      order: { id: 'DESC' }
    });

    return modulos;
  }

  async findOne(id: number) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!moduloEncontrado) {
      throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!moduloEncontrado.estado) {
      throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
    }

    return moduloEncontrado;
  }

  async update(id: number, updateModuloDto: UpdateModuloDto) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      id: id,
    });

    if (!moduloEncontrado) {
      throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia del modulo con el mismo nombre solo si el nombre es diferente
    if (updateModuloDto.modulo !== moduloEncontrado.modulo) {
      const moduloEncontrado = await this.moduloRepository.findOneBy({
        modulo: updateModuloDto.modulo
      });

      if (moduloEncontrado) {
        throw new HttpException('El módulo ya existe', HttpStatus.CONFLICT);
      }
    }

    moduloEncontrado.modulo = updateModuloDto.modulo;
    await this.moduloRepository.update(id, updateModuloDto);

    return { message: 'Módulo actualizado correctamente' };
  }

  async remove(id: number) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      id: id,
    });

    if (!moduloEncontrado) {
      throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!moduloEncontrado.estado) {
      throw new HttpException('Módulo eliminado', HttpStatus.NOT_FOUND);
    }

    await this.moduloRepository.update(id, { estado: false });

    return { message: 'Módulo eliminado correctamente' };
  }

  async buscarModulos(detalleModulotablas: any[]) {
    //llamamos todos los moudlos exitentes
    const modulos = await this.moduloRepository.find({ where: { estado: true } });

    if (!modulos) {
      throw new HttpException('No se encontraron módulos', HttpStatus.NOT_FOUND);
    }

    //ahora con ayuda de un foreach recorremos el detalleModulotablas y dentro de eso recorremos el modulos cuando dentro del detalleModulotablas encontramos el id modulo que coincida con el id detalleModulotablas que estamos recorriendo lo guardamos en un array

    const modulosEncontrados = [];

    detalleModulotablas.forEach(detalleModulotabla => {
      modulos.forEach(modulo => {
        if (modulo.id === detalleModulotabla.modulo.id) {
          modulosEncontrados.push(modulo);
        }
      });
    });

    //antes de retornar verificamos que no se vayan 2 modulosEncontrados con el mismo id, usemos foreach para recorrer el array y verificar que no se repitan los id

    const modulosFiltrados = modulosEncontrados.filter((valor, indiceActual, arreglo) => modulos.findIndex((modulo) => modulo.id === valor.id) === indiceActual);

    return modulosFiltrados;
  }
}
