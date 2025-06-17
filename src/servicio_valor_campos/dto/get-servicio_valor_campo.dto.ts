import { ApiProperty } from "@nestjs/swagger";

export class GetServicioValorCampoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    servicioCampo: any;
    @ApiProperty()
    actividade: any;
    @ApiProperty()
    valor: string;
    @ApiProperty()
    estado: boolean;
}