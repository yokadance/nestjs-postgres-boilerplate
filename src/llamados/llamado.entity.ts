import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LlamadoLaboralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  localidad: string;

  @Column()
  Departamento: string;

  @Column()
  descripcion: string;

  @Column()
  creadoPor: string;

  @Column()
  status: string;

  @Column()
  fechaVencimiento: Date;

  @Column({ default: true })
  isActive: boolean;
}
