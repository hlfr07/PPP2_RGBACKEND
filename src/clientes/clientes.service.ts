import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { Distrito } from 'src/distritos/entities/distrito.entity';

@Injectable()
export class ClientesService {

  constructor(@InjectRepository(Cliente) private clienteRepository: Repository<Cliente>, @InjectRepository(Distrito) private distritoRepository: Repository<Distrito>) { }

  async create(createClienteDto: CreateClienteDto) {
    const distritoExists = await this.distritoRepository.findOneBy({
      id: parseInt(createClienteDto.distrito_id)
    });

    if (!distritoExists) {
      throw new HttpException('El distrito no existe', HttpStatus.NOT_FOUND);
    }

    const clienteExists = await this.clienteRepository.findOneBy({
      cod_contrato: parseInt(createClienteDto.cod_contrato)
    });

    if (clienteExists) {
      throw new HttpException('El cliente ya existe', HttpStatus.CONFLICT);
    }

    const cliente = this.clienteRepository.create({
      cod_contrato: parseInt(createClienteDto.cod_contrato),
      nombres: createClienteDto.nombres,
      direccion: createClienteDto.direccion,
      domicilio_legal: createClienteDto.domicilio_legal,
      dni: createClienteDto.dni,
      ruc: createClienteDto.ruc,
      telefono: createClienteDto.telefono,
      email: createClienteDto.email,
      nacimiento: createClienteDto.nacimiento,
      ubigeo: createClienteDto.ubigeo,
      distrito: distritoExists
    });

    await this.clienteRepository.save(cliente);

    return cliente;
  }

  async findAll(page: number, pageSize: number) {
    console.log('findAll - Page:', page, 'Size:', pageSize);
    const skip = (page - 1) * pageSize;
    const clientes = await this.clienteRepository.find({
      order: { cod_contrato: 'ASC' },
      where: { estado: true }, // Assuming you want to filter by active clients 
      skip: skip,
      take: pageSize, // 'take' might be the equivalent of 'limit' in your ORM
    });
    const totalCount = await this.clienteRepository.count(); // Get the total number of clients
    return {
      data: clientes,
      total: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }


  async findOne(cod_contrato: number) {
    const cliente = await this.clienteRepository.findOneBy({
      cod_contrato: cod_contrato,
      estado: true
    });

    if (!cliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!cliente.estado) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    return cliente;
  }

async update(cod_contrato: number, updateClienteDto: any) {
  console.log('update - cod_contrato:', cod_contrato);
  console.log('update - updateClienteDto:', updateClienteDto);

  const cliente = await this.clienteRepository.findOne({
    where: { cod_contrato },
    relations: ['distrito'], // importante si tienes relaciones
  });

  if (!cliente) {
    throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
  }

  // Validar distrito solo si se envía
  if (updateClienteDto.distrito_id !== undefined) {
    const distritoExists = await this.distritoRepository.findOneBy({
      id: parseInt(updateClienteDto.distrito_id),
    });

    if (!distritoExists) {
      throw new HttpException('El distrito no existe', HttpStatus.NOT_FOUND);
    }

    cliente.distrito = distritoExists;
  }

  // Solo actualizar los campos que vienen en el DTO
  const camposActualizables = [
    'nombres',
    'direccion',
    'domicilio_legal',
    'dni',
    'ruc',
    'telefono',
    'email',
    'nacimiento',
    'ubigeo'
  ];

  for (const campo of camposActualizables) {
    if (updateClienteDto[campo] !== undefined) {
      cliente[campo] = updateClienteDto[campo];
    }
  }

  await this.clienteRepository.save(cliente); // usar save para mantener relaciones

  return { message: 'Cliente actualizado correctamente' };
}


  async remove(cod_contrato: number) {
    console.log('remove - cod_contrato:', cod_contrato);
    const cliente = await this.clienteRepository.findOneBy({
      cod_contrato: cod_contrato
    });

    if (!cliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!cliente.estado) {
      throw new HttpException('Cliente eliminado', HttpStatus.NOT_FOUND);
    }

    console.log('Cliente encontrado:', cliente);

    await this.clienteRepository.update(cod_contrato, { estado: false });

    return { menssage: 'Cliente eliminado' };
  }

  //ahora vamos a crear un metodo para resivir un arreglo de datos de clientes incluido todos los campos para recorrelos y guardarlos en la base de datos, si el codigo del contrato ya existe se debe de actualizar los datos del cliente y si no existe se debe de crear un nuevo cliente. Empecemos.

  async createMany(clientes: CreateClienteDto[]) {

    // Definir los campos obligatorios
    const requiredFields = [
      'cod_contrato', 'nombres', 'direccion', 'domicilio_legal',
      'dni', 'ruc', 'telefono', 'email', 'nacimiento', 'ubigeo'
    ];

    for (let i = 0; i < clientes.length; i++) {

      // Validar que las columnas requeridas existan sin importar si son null o undefined, "" o 0
      for (let j = 0; j < requiredFields.length; j++) {
        if (!clientes[i].hasOwnProperty(requiredFields[j])) {
          console.log('No existe la columna', requiredFields[j]);
          throw new HttpException(`La columna ${requiredFields[j]} es requerida`, HttpStatus.BAD_REQUEST);
        }
      }



      // Validar distrito
      // const distritoExists = await this.distritoRepository.findOneBy({
      //   id: parseInt(clientes[i].distrito_id)
      // });

      // Si el distrito no existe, puedes lanzar una excepción o manejarlo de otra manera
      // if (!distritoExists) {
      //   throw new HttpException('El distrito no existe', HttpStatus.NOT_FOUND);
      // }

      // Validar si el cliente ya existe
      const clienteExists = await this.clienteRepository.findOneBy({
        cod_contrato: parseInt(clientes[i].cod_contrato)
      });

      // Normalizar los valores a "" si son null o undefined
      const nombres = clientes[i].nombres ?? "No cuenta con nombres";
      const direccion = clientes[i].direccion ?? "No cuenta con dirección";
      const domicilio_legal = clientes[i].domicilio_legal ?? "No cuenta con domicilio legal";
      const dni = clientes[i].dni ?? "No cuenta con DNI";
      const ruc = clientes[i].ruc ?? "No cuenta con RUC";
      const telefono = clientes[i].telefono ?? "No cuenta con teléfono";
      const email = clientes[i].email ?? "No cuenta con email";
      const nacimiento = clientes[i].nacimiento ?? "No cuenta con fecha de nacimiento";
      const ubigeo = clientes[i].ubigeo ?? "No cuenta con ubigeo";

      if (clienteExists) {
        // Si el cliente ya existe, actualizar sus campos
        clienteExists.nombres = nombres;
        clienteExists.direccion = direccion;
        clienteExists.domicilio_legal = domicilio_legal;
        clienteExists.dni = dni;
        clienteExists.ruc = ruc;
        clienteExists.telefono = telefono;
        clienteExists.email = email;
        clienteExists.nacimiento = nacimiento;
        clienteExists.ubigeo = ubigeo;

        await this.clienteRepository.update(clienteExists.cod_contrato, clienteExists);
      } else {
        // Si el cliente no existe, crear uno nuevo
        const cliente = this.clienteRepository.create({
          cod_contrato: parseInt(clientes[i].cod_contrato),
          nombres: nombres,
          direccion: direccion,
          domicilio_legal: domicilio_legal,
          dni: dni,
          ruc: ruc,
          telefono: telefono,
          email: email,
          nacimiento: nacimiento,
          ubigeo: ubigeo,
        });

        await this.clienteRepository.save(cliente);
      }
    }

    return { message: 'Clientes guardados correctamente' };
  }



  /* pruebas para comentar todo esto */

  findAllPrueba() {
    return this.clienteRepository.find({
      order: { cod_contrato: 'DESC' },
    });
  }  

}
