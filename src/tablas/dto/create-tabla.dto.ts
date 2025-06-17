import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateTablaDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El nombre de la tabla no puede estar vacío' })
    @IsString({ message: 'El nombre de la tabla debe ser un texto' })
    @MaxLength(50, { message: 'El nombre de la tabla debe tener menos de 50 caracteres' }) 
    @MinLength(3, { message: 'El nombre de la tabla debe tener más de 3 caracteres' })
    tabla: string;
}
