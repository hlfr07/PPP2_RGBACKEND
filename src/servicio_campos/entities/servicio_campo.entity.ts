import { Servicio } from "src/servicios/entities/servicio.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "servicio_campo" })
export class ServicioCampo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false })
    nombrecampo: string;

    @Column({nullable: false })
    tipo: string;

    @ManyToOne(() => Servicio, servicio => servicio.id, { eager: true })
    @JoinColumn({ name: 'id_servicio' })
    servicio: Servicio;

    @Column({ default: true })
    estado: boolean;
}
