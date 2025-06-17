import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateProvinciaDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La provincia no puede estar vacía' })
    @IsString({ message: 'La provincia debe ser un texto' })
    @MaxLength(50, { message: 'La provincia debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'La provincia debe tener más de 3 caracteres' })
    provincia: string;
    
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El departamento no puede estar vacío' })
    @IsString({ message: 'El departamento debe ser un texto' })
    @MinLength(1, { message: 'El departamento debe tener más de 1 caracteres' })
    @MaxLength(100, { message: 'El departamento debe tener menos de 100 caracteres' })
    departamento_id: string;
}
