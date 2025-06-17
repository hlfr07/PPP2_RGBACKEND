import { ApiProperty } from "@nestjs/swagger";

export class GetDepartamentoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    departamento: string;
    @ApiProperty()
    estado: boolean;
}