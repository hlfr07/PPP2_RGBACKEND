import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'provincias' })
export class Provincia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    provincia: string;

    @ManyToOne(() => Departamento, departamento => departamento.id, {eager: true})
    @JoinColumn({ name: 'departamento_id' })
    departamento: Departamento;
    
    @Column({default: true})
    estado: boolean;
    
}
