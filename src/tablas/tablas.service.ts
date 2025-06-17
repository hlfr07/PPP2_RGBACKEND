import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTablaDto } from './dto/create-tabla.dto';
import { UpdateTablaDto } from './dto/update-tabla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tabla } from './entities/tabla.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TablasService {

  constructor(@InjectRepository(Tabla) private tablaRepository: Repository<Tabla>) { }

  async create(createTablaDto: CreateTablaDto) {
    const tablaEncontrada = await this.tablaRepository.findOneBy({
      tabla: createTablaDto.tabla
    });

    if (tablaEncontrada) {
      throw new HttpException('La tabla ya existe', HttpStatus.CONFLICT);
    }

    const nuevaTabla = this.tablaRepository.create({
      tabla: createTablaDto.tabla,
    });

    await this.tablaRepository.save(nuevaTabla);

    return { message: 'Tabla creada correctamente' };
  }

  findAll() {
    const tablas = this.tablaRepository.find({
      order: { id: 'DESC' }
    });

    return tablas;
  }

  async findOne(id: number) {
    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!tablaEncontrada) {
      throw new HttpException('Tabla no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!tablaEncontrada.estado) {
      throw new HttpException('Tabla no encontrada', HttpStatus.NOT_FOUND);
    }

    return tablaEncontrada;
  }

  async update(id: number, updateTablaDto: UpdateTablaDto) {
    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: id,
    });

    if (!tablaEncontrada) {
      throw new HttpException('Tabla no encontrada', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia de la tabla con el mismo nombre solo si el nombre es diferente
    if (updateTablaDto.tabla !== tablaEncontrada.tabla) {
      const tablaExistente = await this.tablaRepository.findOneBy({
        tabla: updateTablaDto.tabla
      });

      if (tablaExistente) {
        throw new HttpException('La tabla ya existe', HttpStatus.CONFLICT);
      }
    }

    tablaEncontrada.tabla = updateTablaDto.tabla;

    await this.tablaRepository.update(id, tablaEncontrada);

    return { message: 'Tabla actualizada correctamente' };
  }

  async remove(id: number) {
    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!tablaEncontrada) {
      throw new HttpException('Tabla no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!tablaEncontrada.estado) {
      throw new HttpException('Tabla eliminada', HttpStatus.NOT_FOUND);
    }

    tablaEncontrada.estado = false;

    await this.tablaRepository.update(id, tablaEncontrada);

    return { message: 'Tabla eliminada correctamente' };
  }

  async buscarTablas(detalleModulotablas) {
    const tablas = await this.tablaRepository.find({
      where: { estado: true }
    })

    if (!tablas) {
      throw new HttpException('No se encontraron tablas', HttpStatus.NOT_FOUND);
    }

    //ahora con ayuda de un foreach recorremos el detalleModulotablas y dentro de eso recorremos el tablas cuando dentro del detalleModulotablas encontramos el id tabla que coincida con el id detalleModulotablas que estamos recorriendo lo guardamos en un array
    const tablasEncontradas = [];

    detalleModulotablas.forEach(detalleModuloTabla => {
      tablas.forEach(tabla => {
        if (tabla.id === detalleModuloTabla.tabla.id) {
          // Crear un objeto con la tabla y el permiso
          const tablaConPermiso = {
            tabla,
            permiso: detalleModuloTabla.permiso
          };

          // Agregar el objeto al arreglo
          tablasEncontradas.push(tablaConPermiso);
        }
      });
    });

    //antes de retornar verificamos que no se vayan 2 tablasEncontradas con el mismo id, usemos foreach para recorrer el array y verificar que no se repitan los id

    const tablasFiltradas = [];

    tablasEncontradas.forEach(tabla => {
      let existe = false;

      tablasFiltradas.forEach(tablaFiltrada => {
        if (tablaFiltrada.tabla.id === tabla.tabla.id) {
          existe = true;
          //si existe actualizamos los permiso.get o permiso.post o permiso.delete o permiso.put que esten en true
          if (tabla.permiso.get) {
            tablaFiltrada.permiso.get = true;
            console.log(tablaFiltrada.permiso.get);
          }
          if (tabla.permiso.post) {
            tablaFiltrada.permiso.post = true;
            console.log(tablaFiltrada.permiso.post);
          }
          if (tabla.permiso.delete) {
            tablaFiltrada.permiso.delete = true;
            console.log(tablaFiltrada.permiso.delete);
          }
          if (tabla.permiso.put) {
            tablaFiltrada.permiso.put = true;
            console.log(tablaFiltrada.permiso.put);
          }
        }
      });

      if (!existe) {
        tablasFiltradas.push(tabla);
      } 
    });
    //console.log(tablasFiltradas);

    return tablasFiltradas;
  }
}
