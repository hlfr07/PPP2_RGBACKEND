import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServicioCampoDto } from './create-servicio_campo.dto';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateServicioCampoDto{
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id no puede estar vacío' })
    @IsString({ message: 'El id debe ser un texto' })
    @MaxLength(100, { message: 'El id debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id debe tener más de 1 caracteres' })
    id: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El nombrecampo no puede estar vacío' })
    @IsString({ message: 'El nombrecampo debe ser un texto' })
    @MaxLength(100, { message: 'El nombrecampo debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El nombrecampo debe tener más de 1 caracteres' })
    nombrecampo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El tipo no puede estar vacío' })
    @IsString({ message: 'El tipo debe ser un texto' })
    @MaxLength(100, { message: 'El tipo debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El tipo debe tener más de 1 caracteres' })
    tipo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_servicio no puede estar vacío' })
    @IsString({ message: 'El id_servicio debe ser un texto' })
    @MaxLength(100, { message: 'El id_servicio debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_servicio debe tener más de 1 caracteres' })
    id_servicio: string;
}
