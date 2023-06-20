import { Module } from '@nestjs/common';
import { LlamadosService } from './llamados.service';
import { LlamadosController } from './llamados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlamadoLaboral } from './llamado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LlamadoLaboral])],
  providers: [LlamadosService],
  controllers: [LlamadosController],
})
export class LlamadosModule {}
