import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { RaresService } from './rares.service';
import { CreateRareDto } from './dto/create-rare.dto';
import { UpdateRareDto } from './dto/update-rare.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Response } from 'express';  // Asegúrate de importar Response desde express
import { cwd } from 'process';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Rares')
@Controller('rares')
export class RaresController {
  constructor(private readonly raresService: RaresService) { }

  @ApiBody({ type: CreateRareDto })
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
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
  create(@UploadedFile() file: Express.Multer.File, @Body() createRareDto: CreateRareDto) {
    return this.raresService.create(createRareDto, file.filename);
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(cwd(), './uploads', filename); // Usa cwd para obtener el directorio de trabajo
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(404).send('File not found');
      }
    });
  }

  @Get()
  findAll() {
    return this.raresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRareDto: UpdateRareDto) {
    return this.raresService.update(+id, updateRareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raresService.remove(+id);
  }
}
