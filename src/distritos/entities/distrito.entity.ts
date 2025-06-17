import { Provincia } from "src/provincias/entities/provincia.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'distritos' })
export class Distrito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    distrito: string;

    @ManyToOne(() => Provincia, provincia => provincia.id, { eager: true })
    @JoinColumn({ name: 'provincia_id' })
    provincia: Provincia;

    @Column({ default: true })
    estado: boolean;
}
