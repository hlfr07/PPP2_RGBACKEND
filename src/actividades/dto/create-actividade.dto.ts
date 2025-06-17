import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateActividadeDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    @IsString({ message: 'El usuario debe ser un texto' })
    @MaxLength(100, { message: 'El usuario debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El usuario debe tener más de 1 caracteres' })
    usuario_id: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El cliente no puede estar vacío' })
    @IsString({ message: 'El cliente debe ser un texto' })
    @MaxLength(100, { message: 'El cliente debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El cliente debe tener más de 1 caracteres' })
    cliente_cod_contrato: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El servicio no puede estar vacío' })
    @MaxLength(100, { message: 'El servicio debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El servicio debe tener más de 1 caracteres' })
    servicio_id: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El título no puede estar vacío' })
    @IsString({ message: 'El título debe ser un texto' })
    @MaxLength(200, { message: 'El título debe tener menos de 200 caracteres' })
    @MinLength(1, { message: 'El título debe tener más de 1 caracteres' })
    titulo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    @IsString({ message: 'La descripción debe ser un texto' })
    @MaxLength(200, { message: 'La descripción debe tener menos de 200 caracteres' })
    @MinLength(1, { message: 'La descripción debe tener más de 1 caracteres' })
    descripcion: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
    @IsString({ message: 'La fecha debe ser un texto' })
    @MaxLength(100, { message: 'La fecha debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'La fecha debe tener más de 1 caracteres' })
    fecha: string;
}
