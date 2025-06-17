import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePermisoDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_modulo no puede estar vacío' })
    @IsString({ message: 'El id_modulo debe ser un texto' })
    @MaxLength(100, { message: 'El id_modulo debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_modulo debe tener más de 1 caracteres' })
    id_modulo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_tabla no puede estar vacío' })
    @IsString({ message: 'El id_tabla debe ser un texto' })
    @MaxLength(100, { message: 'El id_tabla debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_tabla debe tener más de 1 caracteres' })
    id_tabla: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_perfil no puede estar vacío' })
    @IsString({ message: 'El id_perfil debe ser un texto' })
    @MaxLength(100, { message: 'El id_perfil debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_perfil debe tener más de 1 caracteres' })
    id_perfil: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El get no puede estar vacío' })
    @IsString({ message: 'El get debe ser un texto' })
    @MaxLength(100, { message: 'El get debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El get debe tener más de 1 caracteres' })
    get: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El post no puede estar vacío' })
    @IsString({ message: 'El post debe ser un texto' })
    @MaxLength(100, { message: 'El post debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El post debe tener más de 1 caracteres' })
    post: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El put no puede estar vacío' })
    @IsString({ message: 'El put debe ser un texto' })
    @MaxLength(100, { message: 'El put debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El put debe tener más de 1 caracteres' })
    put: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El delete no puede estar vacío' })
    @IsString({ message: 'El delete debe ser un texto' })
    @MaxLength(100, { message: 'El delete debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El delete debe tener más de 1 caracteres' })
    delete: string;
}
