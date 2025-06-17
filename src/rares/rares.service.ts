import { Injectable } from '@nestjs/common';
import { CreateRareDto } from './dto/create-rare.dto';
import { UpdateRareDto } from './dto/update-rare.dto';

@Injectable()
export class RaresService {
  create(createRareDto: CreateRareDto, rarname: string) {
    const { nombre, password } = createRareDto;
    return `Este es tu nombre: ${nombre} y tu password: ${password} y el rarname: ${rarname}`;
  }

  findAll() {
    return `This action returns all rares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rare`;
  }

  update(id: number, updateRareDto: UpdateRareDto) {
    return `This action updates a #${id} rare`;
  }

  remove(id: number) {
    return `This action removes a #${id} rare`;
  }
}
