import { Injectable } from '@nestjs/common';
import { LlamadoLaboral } from './llamado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLlamadoDto } from './dto/create-llamado.dto';

@Injectable()
export class LlamadosService {
  constructor(
    @InjectRepository(LlamadoLaboral)
    private llamadoRespository: Repository<LlamadoLaboral>,
  ) {}

  addLlamado(createLlamadoDto: CreateLlamadoDto) {
    const newLlamado = this.llamadoRespository.create(createLlamadoDto);
    return this.llamadoRespository.save(newLlamado);
  }

  getAllLlamadoLaboral(): Promise<LlamadoLaboral[]> {
    return this.llamadoRespository.find({});
  }
}
