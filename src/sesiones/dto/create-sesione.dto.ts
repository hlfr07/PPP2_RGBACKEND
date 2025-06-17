import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateSesioneDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
    @IsString({ message: 'La fecha debe ser un texto' })
    @MaxLength(100, { message: 'La fecha debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'La fecha debe tener más de 1 caracteres' })
    fecha: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La hora no puede estar vacía' })
    @IsString({ message: 'La hora debe ser un texto' })
    @MaxLength(100, { message: 'La hora debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'La hora debe tener más de 1 caracteres' })
    hora: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_usuario no puede estar vacío' })
    @IsString({ message: 'El id_usuario debe ser un texto' })
    @MaxLength(100, { message: 'El id_usuario debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_usuario debe tener más de 1 caracteres' })
    id_usuario: string;
}
