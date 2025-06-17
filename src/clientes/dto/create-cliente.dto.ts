import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateClienteDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El contrato no puede estar vacío' })
    @IsString({ message: 'El contrato debe ser un texto' })
    @MaxLength(100, { message: 'El contrato debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El contrato debe tener más de 1 caracteres' })
    cod_contrato: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MaxLength(200, { message: 'El nombre debe tener menos de 200 caracteres' })
    @MinLength(1, { message: 'El nombre debe tener más de 1 caracteres' })
    nombres: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
    @IsString({ message: 'La dirección debe ser un texto' })
    @MaxLength(200, { message: 'La dirección debe tener menos de 200 caracteres' })
    @MinLength(1, { message: 'La dirección debe tener más de 1 caracteres' })
    direccion: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El domicilio legal no puede estar vacío' })
    @IsString({ message: 'El domicilio legal debe ser un texto' })
    @MaxLength(200, { message: 'El domicilio legal debe tener menos de 200 caracteres' })
    @MinLength(1, { message: 'El domicilio legal debe tener más de 1 caracteres' })
    domicilio_legal: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
    @IsString({ message: 'El DNI debe ser un texto' })
    @MaxLength(8, { message: 'El DNI debe tener 8 caracteres' })
    @MinLength(8, { message: 'El DNI debe tener 8 caracteres' })
    dni: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El RUC no puede estar vacío' })
    @IsString({ message: 'El RUC debe ser un texto' })
    @MaxLength(11, { message: 'El RUC debe tener 11 caracteres' })
    @MinLength(11, { message: 'El RUC debe tener 11 caracteres' })
    ruc: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    @IsString({ message: 'El teléfono debe ser un texto' })
    @MaxLength(9, { message: 'El teléfono debe tener 9 caracteres' })
    @MinLength(9, { message: 'El teléfono debe tener 9 caracteres' })
    telefono: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    @IsString({ message: 'El email debe ser un texto' })
    @MaxLength(100, { message: 'El email debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El email debe tener más de 1 caracteres' })
    @IsEmail({}, { message: 'El email no es válido' })
    email: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    @IsString({ message: 'La fecha de nacimiento debe ser un texto' })
    @MaxLength(10, { message: 'La fecha de nacimiento debe tener 10 caracteres' })
    @MinLength(10, { message: 'La fecha de nacimiento debe tener 10 caracteres' })
    nacimiento: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El ubigeo no puede estar vacío' })
    @IsString({ message: 'El ubigeo debe ser un texto' })
    @MaxLength(6, { message: 'El ubigeo debe tener 6 caracteres' })
    @MinLength(6, { message: 'El ubigeo debe tener 6 caracteres' })
    ubigeo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El distrito no puede estar vacío' })
    @IsString({ message: 'El distrito debe ser un texto' })
    @MaxLength(100, { message: 'El distrito debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El distrito debe tener más de 1 caracteres' })
    distrito_id: string;
}
