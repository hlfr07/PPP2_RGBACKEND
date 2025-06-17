import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDetallePerfileDto } from './create-detalle_perfile.dto';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateDetallePerfileDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_perfil no puede estar vacío' })
    @IsString({ message: 'El id_perfil debe ser un texto' })
    @MaxLength(100, { message: 'El id_perfil debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_perfil debe tener más de 1 caracteres' })
    id_perfil: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_usuario no puede estar vacío' })
    @IsString({ message: 'El id_usuario debe ser un texto' })
    @MaxLength(100, { message: 'El id_usuario debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_usuario debe tener más de 1 caracteres' })
    id_usuario: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El estado no puede estar vacío' })
    @IsString({ message: 'El estado debe ser un texto' })
    @MaxLength(100, { message: 'El estado debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El estado debe tener más de 1 caracteres' })
    estado: string;
}
