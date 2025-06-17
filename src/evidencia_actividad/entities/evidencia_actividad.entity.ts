import { Actividade } from "src/actividades/entities/actividade.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'evidencia_actividad' })
export class EvidenciaActividad {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Actividade, actividad => actividad.id, { eager: true })
    @JoinColumn({ name: 'actividadId' })
    actividad: Actividade;

    @Column({ nullable: false })
    imgzip: string;

    @Column({ nullable: false })
    fecha: Date;

    @Column({ nullable: false })
    comentario: string;

    @Column({ default: true })
    estado: boolean;
}
