import { ApiProperty } from "@nestjs/swagger";

export class GetPermisoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    modulo: any;
    @ApiProperty()
    tabla: any;
    @ApiProperty()
    perfil: any;
    @ApiProperty()
    get: boolean;
    @ApiProperty()
    post: boolean;
    @ApiProperty()
    put: boolean;
    @ApiProperty()
    delete: boolean;
    @ApiProperty()
    estado: boolean;
}