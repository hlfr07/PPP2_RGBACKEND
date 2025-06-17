import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'sesiones'})
export class Sesione {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    fecha: Date;
    @Column({nullable: false, type: "time"})
    hora: string;
    @ManyToOne(() => Usuario, usuario => usuario.id, {eager: true})
    @JoinColumn({name: 'id_usuario'})
    usuario: Usuario;
    @Column({default: true})
    estado: boolean;
}
