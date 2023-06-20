import { ApiProperty } from '@nestjs/swagger';

export class CreateLlamadoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  localidad: string;
  @ApiProperty()
  Departamento: string;
  @ApiProperty()
  Descripcion: string;
  @ApiProperty()
  creadoPor: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  fechaVencimiento: Date;
  @ApiProperty()
  isActive: boolean;
}
