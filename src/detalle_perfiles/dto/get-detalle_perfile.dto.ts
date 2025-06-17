import { ApiProperty } from "@nestjs/swagger";

export class GetDetallePerfileDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    perfil: any;
    @ApiProperty()
    usuario: any;
    @ApiProperty()
    estado: boolean;
}