import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServicioValorCampoDto } from './dto/create-servicio_valor_campo.dto';
import { UpdateServicioValorCampoDto } from './dto/update-servicio_valor_campo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioValorCampo } from './entities/servicio_valor_campo.entity';
import { Repository } from 'typeorm';
import { ServicioCampo } from 'src/servicio_campos/entities/servicio_campo.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Injectable()
export class ServicioValorCamposService {

  constructor(@InjectRepository(ServicioValorCampo) private serviciovalorcampoRepository: Repository<ServicioValorCampo>, @InjectRepository(ServicioCampo) private servicioCampoRepository: Repository<ServicioCampo>, @InjectRepository(Actividade) private actividadRepository: Repository<Actividade>) { }

  async create(createServicioValorCampoDto: CreateServicioValorCampoDto[]) {
    console.log(createServicioValorCampoDto);
console.log("entraste de valores campos");
    //primero nos vamos asegurar que en el arreglo el servicioCampo_id y el actividade_id existan en la base de datos
    for (let i = 0; i < createServicioValorCampoDto.length; i++) {

      //primero nos aseguraremos que el servicioCampo_id y el actividade_id sean numeros
      if (isNaN(parseInt(createServicioValorCampoDto[i].servicioCampo_id))) {
        throw new HttpException('El servicioCampo_id debe ser un número', HttpStatus.BAD_REQUEST);
      }

      if (isNaN(parseInt(createServicioValorCampoDto[i].actividade_id))) {
        throw new HttpException('El actividade_id debe ser un número', HttpStatus.BAD_REQUEST);
      }

      const servicioCampoExists = await this.servicioCampoRepository.findOneBy({
        id: parseInt(createServicioValorCampoDto[i].servicioCampo_id)
      });

      if (!servicioCampoExists) {
        throw new HttpException('El servicio campo no existe', HttpStatus.NOT_FOUND);
      }

      const actividadExists = await this.actividadRepository.findOneBy({
        id: parseInt(createServicioValorCampoDto[i].actividade_id)
      });

      if (!actividadExists) {
        throw new HttpException('La actividad no existe', HttpStatus.NOT_FOUND);
      }
    }

    //si todo esta bien vamos a guardar los valores en la base de datos
    for (let i = 0; i < createServicioValorCampoDto.length; i++) {
      const servicioValorCampo = this.serviciovalorcampoRepository.create({
        servicioCampo: await this.servicioCampoRepository.findOneBy({ id: parseInt(createServicioValorCampoDto[i].servicioCampo_id) }),
        actividade: await this.actividadRepository.findOneBy({ id: parseInt(createServicioValorCampoDto[i].actividade_id) }),
        valor: createServicioValorCampoDto[i].valor
      });

      await this.serviciovalorcampoRepository.save(servicioValorCampo);
    }

    return { message: 'Valores guardados correctamente' };
  }

  findAll() {
    const servicioValorCampos = this.serviciovalorcampoRepository.find({
      order: { id: 'DESC' },
    });

    return servicioValorCampos;
  }

  async findOne(id: number) {
    const servicioValorCampo = await this.serviciovalorcampoRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!servicioValorCampo) {
      throw new HttpException('El servicioValorCampo no existe', HttpStatus.NOT_FOUND);
    }

    if (!servicioValorCampo.estado) {
      throw new HttpException('El servicioValorCampo no existe', HttpStatus.NOT_FOUND);
    }

    return servicioValorCampo;
  }

  async update(id: number, updateServicioValorCampoDto: UpdateServicioValorCampoDto) {
    const servicioValorCampo = await this.serviciovalorcampoRepository.findOneBy({
      id: id
    });

    if (!servicioValorCampo) {
      throw new HttpException('El servicioValorCampo no existe', HttpStatus.NOT_FOUND);
    }

    const servicioCampoExists = await this.servicioCampoRepository.findOneBy({
      id: parseInt(updateServicioValorCampoDto.servicioCampo_id)
    });

    if (!servicioCampoExists) {
      throw new HttpException('El servicio campo no existe', HttpStatus.NOT_FOUND);
    }

    const actividadExists = await this.actividadRepository.findOneBy({
      id: parseInt(updateServicioValorCampoDto.actividade_id)
    });

    if (!actividadExists) {
      throw new HttpException('La actividad no existe', HttpStatus.NOT_FOUND);
    }

    servicioValorCampo.servicioCampo = servicioCampoExists;
    servicioValorCampo.actividade = actividadExists;
    servicioValorCampo.valor = updateServicioValorCampoDto.valor;

    await this.serviciovalorcampoRepository.update(id, servicioValorCampo);

    return { message: 'ServicioValorCampo actualizado correctamente' };
  }

  async remove(id: number) {
    const servicioValorCampo = await this.serviciovalorcampoRepository.findOneBy({
      id: id
    });

    if (!servicioValorCampo) {
      throw new HttpException('El servicioValorCampo no existe', HttpStatus.NOT_FOUND);
    }

    if (!servicioValorCampo.estado) {
      throw new HttpException('El servicioValorCampo no existe', HttpStatus.NOT_FOUND);
    }

    await this.serviciovalorcampoRepository.update(id, { estado: false });

    return { message: 'ServicioValorCampo eliminado correctamente' };
  }
}
