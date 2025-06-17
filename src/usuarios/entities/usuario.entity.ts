import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "usuarios" })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true, nullable: false })
    dni: string;
    @Column({ nullable: false })
    nombre: string;
    @Column({ nullable: false })
    apellido: string;
    @Column({ unique: true, nullable: false })
    email: string;
    @Column({ unique: true, nullable: false })
    usuario: string;
    @Column({ nullable: false })
    password: string;
    @Column({ default: true })
    estado: boolean;
    @Column({ nullable: true })
    resetCode: string;
    @Column({ type: 'timestamp', nullable: true })
    resetCodeExpiration: Date;
}
