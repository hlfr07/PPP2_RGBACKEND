import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class DeleteServicioCampoDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id no puede estar vacío' })
    @IsString({ message: 'El id debe ser un texto' })
    @MaxLength(100, { message: 'El id debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id debe tener más de 1 caracteres' })
    id: string;
}