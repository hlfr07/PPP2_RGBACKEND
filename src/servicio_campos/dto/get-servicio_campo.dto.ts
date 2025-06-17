import { ApiProperty } from "@nestjs/swagger";

export class GetServicioCampoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombrecampo: string;
    @ApiProperty()
    tipo: string;
    @ApiProperty()
    servicio: any;
    @ApiProperty()
    estado: boolean;
}