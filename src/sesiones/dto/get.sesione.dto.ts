import { ApiProperty } from "@nestjs/swagger";

export class GetSesioneDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    fecha: Date;
    @ApiProperty()
    hora: string;
    @ApiProperty()
    id_usuario: any;
    @ApiProperty()
    estado: boolean;
}