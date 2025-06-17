import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "servicios" })
export class Servicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    servicio: string;

    @Column({ default: true })
    estado: boolean;
}
