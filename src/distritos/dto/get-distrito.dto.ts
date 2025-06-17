import { ApiProperty } from "@nestjs/swagger";

export class GetDistritoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    distrito: string;
    @ApiProperty()
    provincia: any;
    @ApiProperty()
    estado: boolean;
}