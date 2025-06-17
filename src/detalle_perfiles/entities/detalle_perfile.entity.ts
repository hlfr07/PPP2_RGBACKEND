import { Perfile } from "src/perfiles/entities/perfile.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'detalle_perfiles'})
export class DetallePerfile {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Perfile, perfil => perfil.id, {eager: true})
    @JoinColumn({name: 'id_perfil'})
    perfil: Perfile;
    
    @ManyToOne(() => Usuario, usuario => usuario.id, {eager: true})
    @JoinColumn({name: 'id_usuario'})
    usuario: Usuario;
    
    @Column({default: true})
    estado: boolean;
}
