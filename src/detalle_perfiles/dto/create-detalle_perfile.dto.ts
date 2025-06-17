import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateDetallePerfileDto {
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
}
