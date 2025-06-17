import { Cliente } from "src/clientes/entities/cliente.entity";
import { Servicio } from "src/servicios/entities/servicio.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "actividades" })
export class Actividade {
    @PrimaryGeneratedColumn()
    id: number;

    //llamamos a usuario
    @ManyToOne(() => Usuario, usuario => usuario.id, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    //llamamos a cliente
    @ManyToOne(() => Cliente, cliente => cliente.cod_contrato, { eager: true })
    @JoinColumn({ name: 'cliente_cod_contrato' })
    cliente: Cliente;

    //llamamos a servicio
    @ManyToOne(() => Servicio, servicio => servicio.id, { eager: true })
    @JoinColumn({ name: 'servicio_id' })
    servicio: Servicio;

    @Column({ nullable: false })
    titulo: string;

    @Column({ nullable: false })
    descripcion: string;

    @Column({ default: false })
    etapa: boolean;

    @Column({ nullable: false })
    fecha: string;

    @Column({ default: true })
    estado: boolean;
}
