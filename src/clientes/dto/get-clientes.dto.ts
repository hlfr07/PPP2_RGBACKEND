import { ApiProperty } from "@nestjs/swagger";

export class GetClienteDto {
    @ApiProperty()
    cod_contrato: number;
    @ApiProperty()
    nombres: string;
    @ApiProperty()
    direccion: string;
    @ApiProperty()
    domicilio_legal: string;
    @ApiProperty()
    dni: string;
    @ApiProperty()
    ruc: string;
    @ApiProperty()
    telefono: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    nacimiento: string;
    @ApiProperty()
    ubigeo: string;
    @ApiProperty()
    distrito: any;
    @ApiProperty()
    estado: boolean;
}