import { ApiProperty } from "@nestjs/swagger";

export class GetEvidenciaActividadDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    actividad: any;
    @ApiProperty()
    imgzip: string;
    @ApiProperty()
    fecha: Date;
    @ApiProperty()
    estado: boolean;
}