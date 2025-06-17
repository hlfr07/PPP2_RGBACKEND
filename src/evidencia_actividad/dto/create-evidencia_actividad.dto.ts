import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateEvidenciaActividadDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El campo actividadId no debe estar vacío' })
    @IsString({ message: 'El campo actividadId debe ser de tipo string' })
    @MaxLength(100, { message: 'El campo actividadId debe ser de longitud máxima 100' })
    @MinLength(1, { message: 'El campo actividadId debe ser de longitud mínima 1' })
    actividad_id: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El campo comentario no debe estar vacío' })
    @IsString({ message: 'El campo comentario debe ser de tipo string' })
    @MaxLength(255, { message: 'El campo comentario debe ser de longitud máxima 255' })
    @MinLength(1, { message: 'El campo comentario debe ser de longitud mínima 1' })
    comentario: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Archivo comprimido (zip/rar) que se subirá como evidencia'
    })
    file?: any; // No se valida aquí porque lo maneja `multer`
}
