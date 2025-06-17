import { ApiProperty } from "@nestjs/swagger";

export class GetActividadeDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    usuario: any;
    @ApiProperty()
    cliente: any;
    @ApiProperty()
    servicio: any;
    @ApiProperty()
    titulo: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    etapa: boolean;
    @ApiProperty()
    fecha: string;
    @ApiProperty()
    estado: boolean;
}