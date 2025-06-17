import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServicioCampoDto } from './dto/create-servicio_campo.dto';
import { UpdateServicioCampoDto } from './dto/update-servicio_campo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioCampo } from './entities/servicio_campo.entity';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { DeleteServicioCampoDto } from './dto/delete-servicio_campo.dto';

@Injectable()
export class ServicioCamposService {

  constructor(@InjectRepository(ServicioCampo) private servicioCampoRepository: Repository<ServicioCampo>, @InjectRepository(Servicio) private servicioRepository: Repository<Servicio>) { }

  async create(createServicioCampoDto: CreateServicioCampoDto[]) {

    //primero nos vamos asegurar que en el arreglo el id_servicio exista en la base de datos
    for (let i = 0; i < createServicioCampoDto.length; i++) {
      const servicioExist = await this.servicioRepository.findOneBy({
        id: parseInt(createServicioCampoDto[i].id_servicio)
      });

      if (!servicioExist) {
        throw new HttpException('Servicio no existe', HttpStatus.BAD_REQUEST);
      }

      const campoExist = await this.servicioCampoRepository
        .createQueryBuilder("servicioCampo")
        .where("servicioCampo.nombrecampo = :nombrecampo", { nombrecampo: createServicioCampoDto[i].nombrecampo })
        .andWhere("servicioCampo.servicio.id = :id_servicio", { id_servicio: servicioExist.id })
        .getOne();

      if (campoExist) {
        throw new HttpException('Campo ya existe para este servicio', HttpStatus.BAD_REQUEST);
      }

    }

    //si todo esta bien vamos a guardar los valores en la base de datos
    for (let i = 0; i < createServicioCampoDto.length; i++) {
      const servicioCampo = this.servicioCampoRepository.create({
        nombrecampo: createServicioCampoDto[i].nombrecampo,
        tipo: createServicioCampoDto[i].tipo,
        servicio: await this.servicioRepository.findOneBy({ id: parseInt(createServicioCampoDto[i].id_servicio) })
      });

      await this.servicioCampoRepository.save(servicioCampo);
    }
    return { message: 'Campos guardados correctamente' };
  }


  findAll() {
    const servicioCampos = this.servicioCampoRepository.find({
      order: { id: 'DESC' }
    });

    return servicioCampos;
  }

  async findOne(id: number) {
    const servicioCampo = await this.servicioCampoRepository.findOneBy({
      id: id
    });

    if (!servicioCampo) {
      throw new HttpException('Campo no existe', HttpStatus.BAD_REQUEST);
    }

    if (!servicioCampo.estado) {
      throw new HttpException('Campo inactivo', HttpStatus.BAD_REQUEST);
    }

    return servicioCampo;
  }

  async update(updateServicioCampoDto: UpdateServicioCampoDto[]) {
    //primero nos vamos asegurar que en el arreglo el id y id_servicio exista en la base de datos
    for (let i = 0; i < updateServicioCampoDto.length; i++) {
      const servicioCampo = await this.servicioCampoRepository.findOneBy({
        id: parseInt(updateServicioCampoDto[i].id)
      });

      if (!servicioCampo) {
        throw new HttpException('Campo no existe', HttpStatus.BAD_REQUEST);
      }

      if (!servicioCampo.estado) {
        throw new HttpException('Campo eliminado', HttpStatus.BAD_REQUEST);
      }

      const servicioExist = await this.servicioRepository.findOneBy({
        id: parseInt(updateServicioCampoDto[i].id_servicio)
      });

      if (!servicioExist) {
        throw new HttpException('Servicio no existe', HttpStatus.BAD_REQUEST);
      }

      //comprobar la existencia del campo con el mismo nombre solo si el nombre es diferente segun el servicio seleccionado
      if (updateServicioCampoDto[i].nombrecampo !== servicioCampo.nombrecampo) {
        const campoExist = await this.servicioCampoRepository
          .createQueryBuilder("servicioCampo")
          .where("servicioCampo.nombrecampo = :nombrecampo", { nombrecampo: updateServicioCampoDto[i].nombrecampo })
          .andWhere("servicioCampo.servicio.id = :id_servicio", { id_servicio: servicioExist.id })
          .getOne();

        if (campoExist) {
          throw new HttpException('Campo ya existe para este servicio', HttpStatus.BAD_REQUEST);
        }
      }
    }

    //si todo esta bien vamos a guardar los valores en la base de datos
    for (let i = 0; i < updateServicioCampoDto.length; i++) {
      await this.servicioCampoRepository.update(parseInt(updateServicioCampoDto[i].id), {
        nombrecampo: updateServicioCampoDto[i].nombrecampo,
        tipo: updateServicioCampoDto[i].tipo,
        servicio: await this.servicioRepository.findOneBy({ id: parseInt(updateServicioCampoDto[i].id_servicio) })
      });
    }

    return { message: 'Campo actualizado correctamente' };

  }

  async remove(DeleteServicioCampoDto: DeleteServicioCampoDto[]) {
    console.log(DeleteServicioCampoDto);
    //primero nos vamos asegurar que en el arreglo el id exista en la base de datos
    for (let i = 0; i < DeleteServicioCampoDto.length; i++) {
      const servicioCampo = await this.servicioCampoRepository.findOneBy({
        id: parseInt(DeleteServicioCampoDto[i].id)
      });

      if (!servicioCampo) {
        throw new HttpException('Campo no existe', HttpStatus.BAD_REQUEST);
      }

      if (!servicioCampo.estado) {
        throw new HttpException('Campo eliminado', HttpStatus.BAD_REQUEST);
      }
    }

    //si todo esta bien vamos a guardar los valores en la base de datos
    for (let i = 0; i < DeleteServicioCampoDto.length; i++) {
      await this.servicioCampoRepository.update(parseInt(DeleteServicioCampoDto[i].id), {
        estado: false
      });
    }

    return { message: 'Campo eliminado correctamente' };
  }
}
