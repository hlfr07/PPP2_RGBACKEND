import { ApiProperty } from "@nestjs/swagger";

export class GetProvinciaDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    provincia: string;
    @ApiProperty()
    departamento: any;
    @ApiProperty()
    estado: boolean;
}