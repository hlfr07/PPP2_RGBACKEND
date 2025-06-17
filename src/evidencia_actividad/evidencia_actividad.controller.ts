import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { EvidenciaActividadService } from './evidencia_actividad.service';
import { CreateEvidenciaActividadDto } from './dto/create-evidencia_actividad.dto';
import { UpdateEvidenciaActividadDto } from './dto/update-evidencia_actividad.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetEvidenciaActividadDto } from './dto/get-evidencia_actividad.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';
@ApiTags('EvidenciaActividad')
@Controller('evidencia-actividad')
export class EvidenciaActividadController {
  constructor(private readonly evidenciaActividadService: EvidenciaActividadService) { }

  @ApiConsumes('multipart/form-data') // Especifica el tipo de contenido
  @ApiBody({
    description: 'Subir hasta 3 archivos zip o rar junto con los datos de la actividad. <strong>Usar multipart/form-data</strong>',
    type: CreateEvidenciaActividadDto,
  })
  @Post()
  @UseInterceptors(FilesInterceptor('files', 3, { // Permitir hasta 3 archivos
    storage: multer.memoryStorage(), // Almacenar temporalmente en memoria
    fileFilter: (req, file, cb) => {
      console.log(file); // Opcional: Loguea los archivos recibidos
      cb(null, true); // Permitir todos los archivos
    },
  }))
  async create(
    @UploadedFiles() files: Express.Multer.File[], // Recibir los archivos
    @Body() createEvidenciaActividadDto: any
  ) {
    console.log('Archivos recibidos:');
    files.forEach((file, index) => {
      console.log(`Archivo ${index + 1}: ${file.originalname}`);
    });

    // Verificar que se recibieron exactamente 3 archivos
    if (files.length !== 3) {
      throw new HttpException('Se deben enviar exactamente 3 archivos', HttpStatus.BAD_REQUEST);
    }

    // Crear el archivo ZIP en memoria
    // const zipFilePath = path.join('./uploads', `${Date.now()}-evidencia.zip`);
    // await this.createZip(files, zipFilePath);

    const zipFileName = `${Date.now()}-evidencia-actividad.zip`;
    const zipFilePath = path.join('./uploads', zipFileName);
    await this.createZip(files, zipFilePath);

    return this.evidenciaActividadService.create(createEvidenciaActividadDto, zipFileName);
    
  }

  private createZip(files: Express.Multer.File[], zipFilePath: string) {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipFilePath); // Crear el archivo ZIP en el servidor
      const archive = archiver('zip', { zlib: { level: 9 } });

      archive.pipe(output);

      // Agregar cada archivo recibido directamente desde memoria al ZIP
      files.forEach(file => {
        archive.append(file.buffer, { name: file.originalname });
      });

      archive.finalize();

      output.on('close', () => {
        console.log(`El archivo ZIP fue creado con éxito: ${zipFilePath}`);
        resolve(true);
      });

      output.on('error', (err) => {
        console.error('Error al crear el archivo ZIP', err);
        reject(err);
      });
    });
  }


  @ApiBody({ type: [GetEvidenciaActividadDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'get')
  findAll() {
    return this.evidenciaActividadService.findAll();
  }

  @ApiBody({ type: GetEvidenciaActividadDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'get')
  findOne(@Param('id') id: string) {
    return this.evidenciaActividadService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data') // Especifica el tipo de contenido
  @ApiBody({
    description: 'Subir un archivo zip o rar junto con los datos de la actividad. <strong>Usar multipart/form-data</strong>',
    type: CreateEvidenciaActividadDto,
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'put')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: './uploads',  // Carpeta donde se guardarán los archivos
      filename: (req, file, cb) => {
        // Genera un nombre único para el archivo
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

        // Sanitiza el nombre original del archivo para eliminar espacios y caracteres no deseados
        const sanitizedOriginalName = file.originalname.replace(/\s/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');

        // Crea el nombre final del archivo con el sufijo único
        const filename = `${uniqueSuffix}-${sanitizedOriginalName}`;

        // Llama a la función de callback con el nuevo nombre de archivo
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      // Aceptar solo archivos zip o rar
      cb(null, true);  // Acepta cualquier archivo
    },
  }))
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateEvidenciaActividadDto: UpdateEvidenciaActividadDto) {
    return this.evidenciaActividadService.update(+id, updateEvidenciaActividadDto, file.filename);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'delete')
  remove(@Param('id') id: string) {
    return this.evidenciaActividadService.remove(+id);
  }

 

}
