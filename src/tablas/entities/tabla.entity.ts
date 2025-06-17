import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tablas"})
export class Tabla {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    tabla: string;
    @Column({default: true})
    estado: boolean;
}
