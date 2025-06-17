import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "departamentos" })  
export class Departamento {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true, nullable: false })
    departamento: string;
    @Column({ default: true })
    estado: boolean;
}
