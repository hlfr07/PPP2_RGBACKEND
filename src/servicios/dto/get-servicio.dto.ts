import { ApiProperty } from "@nestjs/swagger";

export class GetServicioDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    servicio: string;
    @ApiProperty()
    estado: boolean;
}