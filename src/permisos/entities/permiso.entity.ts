import { Modulo } from "src/modulos/entities/modulo.entity";
import { Perfile } from "src/perfiles/entities/perfile.entity";
import { Tabla } from "src/tablas/entities/tabla.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'permisos'})
export class Permiso {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Modulo, modulo => modulo.id, { eager: true })
    @JoinColumn({ name: 'id_modulo' })
    modulo: Modulo;

    @ManyToOne(() => Tabla, tabla => tabla.id, { eager: true })
    @JoinColumn({ name: 'id_tabla' })
    tabla: Tabla;

    //hacemos un manytoone con la tabla de perfiles
    @ManyToOne(() => Perfile, perfil => perfil.id, { eager: true })
    @JoinColumn({ name: 'id_perfil' })
    perfil: Perfile;

    //creamos get, post, put, delete en boolean
    @Column({ default: false })
    get: boolean;

    @Column({ default: false })
    post: boolean;

    @Column({ default: false })
    put: boolean;

    @Column({ default: false })
    delete: boolean;

    @Column({ default: true })
    estado: boolean;
}
