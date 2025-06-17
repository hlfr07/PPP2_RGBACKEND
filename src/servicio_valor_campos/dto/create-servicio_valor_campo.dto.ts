import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, maxLength, MinLength } from "class-validator";

export class CreateServicioValorCampoDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El campo servicioCampo_id no puede estar vacío' })
    @IsString({ message: 'El campo servicioCampo_id debe ser un texto' })
    @MaxLength(100, { message: 'El campo servicioCampo_id debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El campo servicioCampo_id debe tener más de 1 caracteres' })
    servicioCampo_id: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El campo actividade_id no puede estar vacío' })
    @IsString({ message: 'El campo actividade_id debe ser un texto' })
    @MaxLength(100, { message: 'El campo actividade_id debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El campo actividade_id debe tener más de 1 caracteres' })
    actividade_id: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El campo valor no puede estar vacío' })
    @IsString({ message: 'El campo valor debe ser un texto' })
    @MaxLength(255, { message: 'El campo valor debe tener menos de 255 caracteres' })
    @MinLength(1, { message: 'El campo valor debe tener más de 1 caracteres' })
    valor: string;
}
