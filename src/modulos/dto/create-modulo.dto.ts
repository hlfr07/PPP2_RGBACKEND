import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateModuloDto {
  @ApiProperty()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsNotEmpty({ message: 'El módulo no puede estar vacío' })
  @IsString({ message: 'El módulo debe ser un texto' })
  @MaxLength(50, { message: 'El módulo debe tener menos de 50 caracteres' })
  @MinLength(3, { message: 'El módulo debe tener más de 3 caracteres' })
  modulo: string;
}
