import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Tabla } from 'src/tablas/entities/tabla.entity';
import { Perfile } from 'src/perfiles/entities/perfile.entity';

@Injectable()
export class PermisosService {
  constructor(@InjectRepository(Permiso) private permisoRepository: Repository<Permiso>, @InjectRepository(Modulo) private moduloRepository: Repository<Modulo>, @InjectRepository(Tabla) private tablaRepository: Repository<Tabla>, @InjectRepository(Perfile) private perfileRepository: Repository<Perfile>) { }

  async create(createPermisoDto: CreatePermisoDto) {
    //verificamos si el id_modulo existe
    const moduloExistente = await this.moduloRepository.findOneBy({
      id: parseInt(createPermisoDto.id_modulo)
    });

    //verificamos si el id_tabla existe
    const tablaExistente = await this.tablaRepository.findOneBy({
      id: parseInt(createPermisoDto.id_tabla)
    });

    //verificamos si el id_perfil existe
    const perfileExistente = await this.perfileRepository.findOneBy({
      id: parseInt(createPermisoDto.id_perfil)
    });

    if (!moduloExistente) {
      throw new HttpException('Modulo no existe', HttpStatus.NOT_FOUND);
    }

    if (!tablaExistente) {
      throw new HttpException('Tabla no existe', HttpStatus.NOT_FOUND);
    }

    if (!perfileExistente) {
      throw new HttpException('Perfil no existe', HttpStatus.NOT_FOUND);
    }

    const detallePermisoExistente = await this.permisoRepository.findOneBy({
      modulo: moduloExistente,
      tabla: tablaExistente,
      perfil: perfileExistente
    });

    if (detallePermisoExistente) {
      throw new HttpException('El detallePermiso ya existe', HttpStatus.CONFLICT);
    }

    //verificamos que los campos get, post, put, delete tengan valores false o true
    if (createPermisoDto.get !== 'true' && createPermisoDto.get !== 'false') {
      throw new HttpException('El campo get debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (createPermisoDto.post !== 'true' && createPermisoDto.post !== 'false') {
      throw new HttpException('El campo post debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (createPermisoDto.put !== 'true' && createPermisoDto.put !== 'false') {
      throw new HttpException('El campo put debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (createPermisoDto.delete !== 'true' && createPermisoDto.delete !== 'false') {
      throw new HttpException('El campo delete debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    //creamos el detallePermiso
    const nuevoDetallePermiso = this.permisoRepository.create({
      modulo: moduloExistente,
      tabla: tablaExistente,
      perfil: perfileExistente,
      get: createPermisoDto.get === 'true' ? true : false,
      post: createPermisoDto.post === 'true' ? true : false,
      put: createPermisoDto.put === 'true' ? true : false,
      delete: createPermisoDto.delete === 'true' ? true : false
    });

    //guardamos el detallePermiso
    await this.permisoRepository.save(nuevoDetallePermiso);

    return nuevoDetallePermiso;
  }

  findAll() {
    const detallePermisos = this.permisoRepository.find({
      order: { id: 'DESC' },
    });

    return detallePermisos;
  }

  async findOne(id: number) {
    const detallePermiso = await this.permisoRepository.findOneBy({
      id: id
    });

    if (!detallePermiso) {
      throw new HttpException('DetallePermiso no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detallePermiso.estado) {
      throw new HttpException('DetallePermiso no encontrado', HttpStatus.NOT_FOUND);
    }

    return detallePermiso;
  }

  async update(id: number, updatePermisoDto: UpdatePermisoDto) {
    //verificamos si el detallePermiso existe
    const detallePermisoExistente = await this.permisoRepository.findOneBy({
      id: id
    });

    if (!detallePermisoExistente) {
      throw new HttpException('DetallePermiso no encontrado', HttpStatus.NOT_FOUND);
    }

    //verificamos si el id_modulo existe
    const moduloExistente = await this.moduloRepository.findOneBy({
      id: parseInt(updatePermisoDto.id_modulo)
    });

    //verificamos si el id_tabla existe
    const tablaExistente = await this.tablaRepository.findOneBy({
      id: parseInt(updatePermisoDto.id_tabla)
    });

    //verificamos si el id_perfil existe
    const perfileExistente = await this.perfileRepository.findOneBy({
      id: parseInt(updatePermisoDto.id_perfil)
    });

    if (!moduloExistente) {
      throw new HttpException('Modulo no existe', HttpStatus.NOT_FOUND);
    }

    if (!tablaExistente) {
      throw new HttpException('Tabla no existe', HttpStatus.NOT_FOUND);
    }

    if (!perfileExistente) {
      throw new HttpException('Perfil no existe', HttpStatus.NOT_FOUND);
    }

    //comprobamos que si al actualizar hay un permiso con los mismos datos, no se actualice
    const detallePermisoExistenteNuevo = await this.permisoRepository.findOneBy({
      modulo: moduloExistente,
      tabla: tablaExistente,
      perfil: perfileExistente
    });

    if (detallePermisoExistenteNuevo && detallePermisoExistenteNuevo.id !== id) {
      throw new HttpException('El detallePermiso ya existe', HttpStatus.CONFLICT);
    }

    //verificamos que los campos get, post, put, delete tengan valores false o true
    if (updatePermisoDto.get !== 'true' && updatePermisoDto.get !== 'false') {
      throw new HttpException('El campo get debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (updatePermisoDto.post !== 'true' && updatePermisoDto.post !== 'false') {
      throw new HttpException('El campo post debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (updatePermisoDto.put !== 'true' && updatePermisoDto.put !== 'false') {
      throw new HttpException('El campo put debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (updatePermisoDto.delete !== 'true' && updatePermisoDto.delete !== 'false') {
      throw new HttpException('El campo delete debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    //actualizamos el detallePermiso
    await this.permisoRepository.update(id, {
      modulo: moduloExistente,
      tabla: tablaExistente,
      perfil: perfileExistente,
      get: updatePermisoDto.get === 'true' ? true : false,
      post: updatePermisoDto.post === 'true' ? true : false,
      put: updatePermisoDto.put === 'true' ? true : false,
      delete: updatePermisoDto.delete === 'true' ? true : false
    });

    return { message: 'DetallePermiso actualizado correctamente' };
  }

  async remove(id: number) {
    //verificamos si el detallePermiso existe
    const detallePermisoExistente = await this.permisoRepository.findOneBy({
      id: id
    });

    if (!detallePermisoExistente) {
      throw new HttpException('DetallePermiso no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detallePermisoExistente.estado) {
      throw new HttpException('DetallePermiso eliminado', HttpStatus.NOT_FOUND);
    }

    //eliminamos el detallePermiso
    await this.permisoRepository.update(id, {
      estado: false
    });

    return { message: 'DetallePermiso eliminado correctamente' };
  }

  async buscarPermisosperfil(detalleperfil: any) {
    //primero estraemos todos los permisos
    const permisos = await this.permisoRepository.find({
      where: {
        estado: true
      }
    });

    //ahora recorremos un foreach el detalleperfil para extraer el perfil
    const perfilesEncontrados = [];
    const moduloEncontrados = [];
    const tablaEncontrados = [];

    detalleperfil.forEach(detalleperfil => {
      //aca recorremos permisos para extraer los permisos
      permisos.forEach(permiso => {
        if (permiso.perfil.id === detalleperfil.perfil.id) {
          perfilesEncontrados.push(permiso.perfil);
          moduloEncontrados.push(permiso.modulo);
          const tablaConPermiso = {
            tabla: permiso.tabla,
            permiso: {
              get: permiso.get,
              post: permiso.post,
              put: permiso.put,
              delete: permiso.delete
            }
          };
          tablaEncontrados.push(tablaConPermiso);
        }
      });
    });

    // console.log(perfilesEncontrados);
    // console.log(moduloEncontrados);
    // console.log(tablaEncontrados);

    //antes de retornar nos aeguraremos que modulos y perfiles no tengan datos repetidos, comprueba usando el id
    const modulos = moduloEncontrados.filter((valor, indiceActual, arreglo) => arreglo.findIndex(modulo => modulo.id === valor.id) === indiceActual);
    const perfiles = perfilesEncontrados.filter((valor, indiceActual, arreglo) => arreglo.findIndex(perfil => perfil.id === valor.id) === indiceActual);
    //si existe tabla repetida actualizamos los permiso.get o permiso.post o permiso.delete o permiso.put que esten en true, osea si una tabla repetida tiene un permiso en true, se actualiza a true
    const tablasFiltradas = [];

    tablaEncontrados.forEach(tabla => {
      let existe = false;

      tablasFiltradas.forEach(tablaFiltrada => {
        //console.log(tablaFiltrada.tabla.id, tabla.tabla.id);
        if (tablaFiltrada.tabla.id === tabla.tabla.id) {
          existe = true;
          //si existe actualizamos los permiso.get o permiso.post o permiso.delete o permiso.put que esten en true
          if (tabla.permiso.get) {
            tablaFiltrada.permiso.get = true;
            //console.log(tablaFiltrada.permiso.get);
          }
          if (tabla.permiso.post) {
            tablaFiltrada.permiso.post = true;
            //console.log(tablaFiltrada.permiso.post);
          }
          if (tabla.permiso.delete) {
            tablaFiltrada.permiso.delete = true;
            //console.log(tablaFiltrada.permiso.delete);
          }
          if (tabla.permiso.put) {
            tablaFiltrada.permiso.put = true;
            //console.log(tablaFiltrada.permiso.put);
          }
        }
      });

      if (!existe) {
        tablasFiltradas.push(tabla);
      } 
    });

    // console.log(modulos);
    // console.log(perfiles);
    // console.log(tablasFiltradas);

    return {
      modulos: modulos,
      perfiles: perfiles,
      tablas: tablasFiltradas
    };

  }
}
