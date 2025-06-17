import { Distrito } from "src/distritos/entities/distrito.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "clientes" })
export class Cliente {
    @PrimaryColumn({nullable: false, unique: true})
    cod_contrato: number;

    @Column({ nullable: true })
    nombres: string;

    @Column({ nullable: true })
    direccion: string;

    @Column({ nullable: true })
    domicilio_legal: string;

    @Column({ nullable: true })
    dni: string;

    @Column({ nullable: true })
    ruc: string;

    @Column({ nullable: true })
    telefono: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    nacimiento: string;

    @Column({ nullable: true })
    ubigeo: string;

    @ManyToOne(() => Distrito, distrito => distrito.id, { eager: true })
    @JoinColumn({ name: 'distrito_id' })
    distrito: Distrito;

    @Column({ default: true })
    estado: boolean;
}
