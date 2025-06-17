import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRareDto {
    @ApiProperty()
    @IsString()
    nombre: string;
    @ApiProperty()
    @IsString()
    password: string;
}
