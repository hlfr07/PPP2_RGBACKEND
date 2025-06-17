import { ApiProperty } from "@nestjs/swagger";

export class GetModuloDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    modulo: string;
    @ApiProperty()
    estado: boolean;
}