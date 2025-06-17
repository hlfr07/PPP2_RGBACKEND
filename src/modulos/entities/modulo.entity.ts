import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('modulos')
export class Modulo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    modulo: string;

    @Column({default: true})
    estado: boolean;
}
