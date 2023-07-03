import { Module } from '@nestjs/common';
import { LlamadosService } from './llamados.service';
import { LlamadosController } from './llamados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlamadoLaboralEntity } from './llamado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LlamadoLaboralEntity])],
  providers: [LlamadosService],
  controllers: [LlamadosController],
})
export class LlamadosModule {}
