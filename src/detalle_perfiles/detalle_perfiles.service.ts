import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetallePerfileDto } from './dto/create-detalle_perfile.dto';
import { UpdateDetallePerfileDto } from './dto/update-detalle_perfile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfile } from 'src/perfiles/entities/perfile.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { DetallePerfile } from './entities/detalle_perfile.entity';

@Injectable()
export class DetallePerfilesService {

  constructor(@InjectRepository(Perfile) private perfileRepository: Repository<Perfile>, @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(DetallePerfile) private detalleperfileRepository: Repository<DetallePerfile>) { }

  async create(createDetallePerfileDto: CreateDetallePerfileDto) {
    const perfileEncontrado = await this.perfileRepository.findOneBy({
      id: parseInt(createDetallePerfileDto.id_perfil)
    });

    if (!perfileEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(createDetallePerfileDto.id_usuario)
    });

    if (!usuarioEncontrado) {
      throw new HttpException('El usuario no existe', HttpStatus.CONFLICT);
    }

    //verificamos que el perfil no este asignado al usuario
    const detallePerfileExistente = await this.detalleperfileRepository.findOneBy({
      perfil: perfileEncontrado,
      usuario: usuarioEncontrado
    });

    if (detallePerfileExistente) {
      throw new HttpException('El detallePerfile ya existe', HttpStatus.CONFLICT);
    }

    const nuevoDetallePerfile = this.detalleperfileRepository.create({
      perfil: perfileEncontrado,
      usuario: usuarioEncontrado,
    });

    await this.detalleperfileRepository.save(nuevoDetallePerfile);

    return { message: 'Detalle Perfile creado correctamente' };
  }

  findAll() {
    const detallePerfiles = this.detalleperfileRepository.find({
      order: { id: 'DESC' }
    });

    return detallePerfiles;

  }

  async findOne(id: number) {
    const detallePerfileEncontrado = await this.detalleperfileRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detallePerfileEncontrado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detallePerfileEncontrado.estado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    return detallePerfileEncontrado;
  }


  async update(id: number, updateDetallePerfileDto: UpdateDetallePerfileDto) {
    const detallePerfileEncontrado = await this.detalleperfileRepository.findOneBy({
      id: id,
    });

    if (!detallePerfileEncontrado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    const perfileEncontrado = await this.perfileRepository.findOneBy({
      id: parseInt(updateDetallePerfileDto.id_perfil)
    });

    if (!perfileEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(updateDetallePerfileDto.id_usuario)
    });

    if (!usuarioEncontrado) {
      throw new HttpException('El usuario no existe', HttpStatus.CONFLICT);
    }

    //verificamos que el campo estado sea true o false
    if (updateDetallePerfileDto.estado !== 'true' && updateDetallePerfileDto.estado !== 'false') {
      throw new HttpException('El estado debe ser true o false', HttpStatus.CONFLICT);
    }

    //comprobamos la existencia del detalle perfile con el mismo perfil y usuario solo si el perfil o usuario es diferente
    if (parseInt(updateDetallePerfileDto.id_perfil) !== detallePerfileEncontrado.perfil.id || parseInt(updateDetallePerfileDto.id_usuario) !== detallePerfileEncontrado.usuario.id) {
      const detallePerfileExistente = await this.detalleperfileRepository.findOneBy({
        perfil: perfileEncontrado,
        usuario: usuarioEncontrado
      });

      if (detallePerfileExistente) {
        throw new HttpException('El detallePerfile ya existe', HttpStatus.CONFLICT);
      }
    }

    detallePerfileEncontrado.perfil = perfileEncontrado;
    detallePerfileEncontrado.usuario = usuarioEncontrado;
    detallePerfileEncontrado.estado = updateDetallePerfileDto.estado === 'true' ? true : false;

    await this.detalleperfileRepository.update(id, detallePerfileEncontrado);

    return { message: 'Detalle Perfile actualizado correctamente' };
  }

  async remove(id: number) {
    const detallePerfileEncontrado = await this.detalleperfileRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detallePerfileEncontrado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detallePerfileEncontrado.estado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.detalleperfileRepository.update(id, { estado: false });

    return { message: 'Detalle Perfile eliminado correctamente  ' };
  }

  //crear el metodo para devolver todos los perfiles segun el id del usuario
  async buscarperfilesporidusuario(id: number) {
    // Buscar todos los registros donde el estado sea true
    const detallePerfiles = await this.detalleperfileRepository.find({
      where: { estado: true } // Cargar relaciones si es necesario
    });

    if (!detallePerfiles) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    //aca haremos un foreach para almacenar los detalle perfiles egun el id del usuario
    const detalleperfilesuser = [];

    detallePerfiles.forEach(detalle => {
      if (detalle.usuario.id === id) {
        detalleperfilesuser.push(detalle);
      }
    });

    return detalleperfilesuser;

  }
}
