import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, isNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateDistritoDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El distrito no puede estar vacío' })
    @IsString({ message: 'El distrito debe ser un texto' })
    @MaxLength(50, { message: 'El distrito debe tener menos de 50 caracteres' })    
    @MinLength(3, { message: 'El distrito debe tener más de 3 caracteres' })
    distrito: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La provincia no puede estar vacía' })
    @IsString({ message: 'La provincia debe ser un texto' })
    @MinLength(1, { message: 'La provincia debe tener más de 1 caracteres' })
    @MaxLength(100, { message: 'La provincia debe tener menos de 100 caracteres' })
    provincia_id: string;
}
