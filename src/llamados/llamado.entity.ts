import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LlamadoLaboral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  localidad: string;

  @Column()
  Departamento: string;

  @Column()
  Descripcion: string;

  @Column()
  creadoPor: string;

  @Column()
  status: string;

  @Column()
  fechaVencimiento: Date;

  @Column({ default: true })
  isActive: boolean;
}
