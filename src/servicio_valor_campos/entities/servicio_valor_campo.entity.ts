import { Actividade } from "src/actividades/entities/actividade.entity";
import { ServicioCampo } from "src/servicio_campos/entities/servicio_campo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'servicio_valor_campos' })
export class ServicioValorCampo {
    @PrimaryGeneratedColumn()
    id: number;

    //llamamos a servicio_campos
    @ManyToOne(() => ServicioCampo, servicioCampo => servicioCampo.id, { eager: true })
    @JoinColumn({ name: 'servicio_campo_id' })
    servicioCampo: ServicioCampo;

    //llamamos a actividade
    @ManyToOne(() => Actividade, actividade => actividade.id, { eager: true })
    @JoinColumn({ name: 'actividade_id' })
    actividade: Actividade;

    @Column({ nullable: false })
    valor: string;

    @Column({ default: true })
    estado: boolean;
}
