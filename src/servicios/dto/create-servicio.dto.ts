import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateServicioDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El servicio no puede estar vacío' })
    @IsString({ message: 'El servicio debe ser un texto' })
    @MaxLength(50, { message: 'El servicio debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El servicio debe tener más de 3 caracteres' })
    servicio: string;
}
