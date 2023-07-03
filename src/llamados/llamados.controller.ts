import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Param,
  Put,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { LlamadosService } from './llamados.service';
import { LlamadoLaboralEntity } from './llamado.entity';
import { CreateLlamadoDto } from './dto/create-llamado.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('llamados')
export class LlamadosController {
  constructor(private llamadoLaboralService: LlamadosService) {}

  @ApiOperation({ summary: 'Create llamado' })
  @Post()
  addLlamado(@Body() createLlamadoDto: CreateLlamadoDto) {
    return this.llamadoLaboralService.addLlamado(createLlamadoDto);
  }

  @ApiOperation({ summary: 'Get Todos llamados' })
  @Get()
  public async getAll(@Res() res: Response): Promise<void> {
    const data: LlamadoLaboralEntity[] =
      await this.llamadoLaboralService.getAllLlamadoLaboral();
    const totalCount: number = await this.llamadoLaboralService.getTotalCount();
    res.setHeader('X-Total-Count', totalCount);
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getLlamado(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    const llamado: LlamadoLaboralEntity =
      await this.llamadoLaboralService.getLlamadoById(id);

    if (!llamado) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Llamado not found' });
      return;
    }

    res.status(HttpStatus.OK).json(llamado);
  }

  @Put(':id')
  public async updateLlamado(
    @Param('id') id: number,
    @Body() updatedData: LlamadoLaboralEntity, // Renombrar a updatedData
    @Res() res: Response,
  ): Promise<void> {
    const updatedLlamado: LlamadoLaboralEntity =
      await this.llamadoLaboralService.updateLlamado(id, updatedData);

    if (!updatedLlamado) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Llamado not found' });
      return;
    }

    res.status(HttpStatus.OK).json(updatedLlamado);
  }
}
