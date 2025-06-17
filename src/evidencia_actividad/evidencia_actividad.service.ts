import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEvidenciaActividadDto } from './dto/create-evidencia_actividad.dto';
import { UpdateEvidenciaActividadDto } from './dto/update-evidencia_actividad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EvidenciaActividad } from './entities/evidencia_actividad.entity';
import { Repository } from 'typeorm';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Injectable()
export class EvidenciaActividadService {
  constructor(@InjectRepository(EvidenciaActividad) private evidenciaActividad: Repository<EvidenciaActividad>, @InjectRepository(Actividade) private actividadRepository: Repository<Actividade>) { }

  async create(createEvidenciaActividadDto: CreateEvidenciaActividadDto, imgzip: string) {
    console.log(createEvidenciaActividadDto, imgzip);
    console.log('ENTRASTE A CREAR EVIDENCIA DE ACTIVIDAD');
    const actividadExists = await this.actividadRepository.findOneBy({
      id: parseInt(createEvidenciaActividadDto.actividad_id),
    });

    if (!actividadExists) {
      throw new HttpException('La actividad no existe', HttpStatus.NOT_FOUND);
    }

    //traemos la fecha actual para peru en formato yyyy-mm-dd
    const date = new Date();

    const newEvidenciaActividad = this.evidenciaActividad.create({
      actividad: actividadExists,
      imgzip: imgzip,
      fecha: date,
      comentario: createEvidenciaActividadDto.comentario,
    });

    await this.evidenciaActividad.save(newEvidenciaActividad);

    //si todo esta bien vamos a actualizar el valor de eatapa en la tabla actividades
    await this.actividadRepository.update(actividadExists.id, { etapa: true });

    return newEvidenciaActividad;

  }

  findAll() {
    const evidenciaActividades = this.evidenciaActividad.find({
      order: { id: 'DESC' },
    });

    return evidenciaActividades;
  }

  async findOne(id: number) {
    const evidenciaActividad = await this.evidenciaActividad.findOneBy({
      id: id,
      estado: true
    });

    if (!evidenciaActividad) {
      throw new HttpException('La evidencia de la actividad no existe', HttpStatus.NOT_FOUND);
    }

    if (!evidenciaActividad.estado) {
      throw new HttpException('La evidencia de la actividad fue eliminada', HttpStatus.BAD_REQUEST);
    }

    return evidenciaActividad;
  }

  async update(id: number, updateEvidenciaActividadDto: UpdateEvidenciaActividadDto, imgzip: string) {
    const evidenciaActividad = await this.evidenciaActividad.findOneBy({
      id: id
    });

    if (!evidenciaActividad) {
      throw new HttpException('La evidencia de la actividad no existe', HttpStatus.NOT_FOUND);
    }

    const actividadExists = await this.actividadRepository.findOneBy({
      id: parseInt(updateEvidenciaActividadDto.actividad_id),
    });

    if (!actividadExists) {
      throw new HttpException('La actividad no existe', HttpStatus.NOT_FOUND);
    }

    evidenciaActividad.actividad = actividadExists;
    evidenciaActividad.imgzip = imgzip;
    evidenciaActividad.comentario = updateEvidenciaActividadDto.comentario;

    await this.evidenciaActividad.save(evidenciaActividad);

    return { message: 'Evidencia de la actividad actualizada correctamente' };
  }

  async remove(id: number) {
    const evidenciaActividad = await this.evidenciaActividad.findOneBy({
      id: id
    });

    if (!evidenciaActividad) {
      throw new HttpException('La evidencia de la actividad no existe', HttpStatus.NOT_FOUND);
    }

    if (!evidenciaActividad.estado) {
      throw new HttpException('La evidencia de la actividad fue eliminada', HttpStatus.BAD_REQUEST);
    }

    await this.evidenciaActividad.update(id, { estado: false });

    return { message: 'Evidencia de la actividad eliminada correctamente' };
  }
}
