import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateDepartamentoDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El departamento no puede estar vacío' })
    @IsString({ message: 'El departamento debe ser un texto' })
    @MaxLength(50, { message: 'El departamento debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El departamento debe tener más de 3 caracteres' })
    departamento: string;
}
