import { Body, Controller, Get, Post } from '@nestjs/common';
import { LlamadosService } from './llamados.service';
import { LlamadoLaboral } from './llamado.entity';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { CreateLlamadoDto } from './dto/create-llamado.dto';

@Controller('llamados')
export class LlamadosController {
  constructor(private llamadoLaboralService: LlamadosService) {}

  @ApiOperation({ summary: 'Get all llamados' })
  @Get()
  getAllLlamados(): Promise<Array<LlamadoLaboral>> {
    return this.llamadoLaboralService.getAllLlamadoLaboral();
  }

  @ApiOperation({ summary: 'Create llamado' })
  @Post()
  addLlamado(@Body() createLlamadoDto: CreateLlamadoDto) {
    return this.llamadoLaboralService.addLlamado(createLlamadoDto);
  }
}
