import { ApiProperty } from "@nestjs/swagger";

export class GetTablaDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    tabla: string;
    @ApiProperty()
    estado: boolean;
}