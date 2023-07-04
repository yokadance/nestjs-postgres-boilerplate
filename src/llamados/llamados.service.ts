import { Injectable, NotFoundException } from '@nestjs/common';
import { LlamadoLaboralEntity } from './llamado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLlamadoDto } from './dto/create-llamado.dto';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
@Injectable()
export class LlamadosService {
  private llamados: LlamadoLaboralEntity[] = [];
  constructor(
    @InjectRepository(LlamadoLaboralEntity)
    private llamadoRepository: Repository<LlamadoLaboralEntity>,
  ) {}

  addLlamado(createLlamadoDto: CreateLlamadoDto) {
    const newLlamado = this.llamadoRepository.create(createLlamadoDto);
    return this.llamadoRepository.save(newLlamado);
  }

  /*   getAllLlamadoLaboral(): Promise<LlamadoLaboralEntity[]> {
    return this.llamadoRespository.find({});
  } */

  async getAllLlamadoLaboral(
    limit: number,
    offset: number,
  ): Promise<LlamadoLaboralEntity[]> {
    return this.llamadoRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public findAll(
    query: PaginateQuery,
  ): Promise<Paginated<LlamadoLaboralEntity>> {
    return new Promise((resolve, reject) => {
      paginate(query, this.llamadoRepository, {
        maxLimit: 10,
        sortableColumns: [
          'id',
          'name',
          'localidad',
          'departamento',
          'descripcion',
          'creadoPor',
          'status',
          'fechaVencimiento',
          'isActive',
        ],
        nullSort: 'last',
        defaultSortBy: [['id', 'DESC']],
        searchableColumns: ['id', 'name', 'status'],
        select: ['id', 'name', 'status'],
        filterableColumns: {
          name: [FilterOperator.EQ, FilterSuffix.NOT],
          age: true,
        },
      })
        .then((result) => {
          resolve(result); // Devuelve el resultado paginado
        })
        .catch((error) => {
          reject(error); // Devuelve el error, si ocurre
        });
    });
  }

  public async getTotalCount(): Promise<number> {
    const totalCount = await this.llamadoRepository.count(); // Utiliza el método adecuado para obtener el número total de elementos desde tu repositorio o fuente de datos
    return totalCount;
  }

  public async getLlamadoById(id: number): Promise<LlamadoLaboralEntity> {
    const llamado: LlamadoLaboralEntity = await this.llamadoRepository.findOne(
      id,
    );
    return llamado;
  }

  public async updateLlamado(
    id: number,
    updatedLlamado: LlamadoLaboralEntity,
  ): Promise<LlamadoLaboralEntity> {
    const llamadoExistente: LlamadoLaboralEntity =
      await this.llamadoRepository.findOne(id);

    if (!llamadoExistente) {
      throw new NotFoundException('Llamado not found'); // Lanza la excepción NotFoundException
    }

    llamadoExistente.name = updatedLlamado.name;
    llamadoExistente.status = updatedLlamado.status;
    llamadoExistente.departamento = updatedLlamado.departamento;
    llamadoExistente.descripcion = updatedLlamado.descripcion;
    llamadoExistente.fechaVencimiento = updatedLlamado.fechaVencimiento;
    llamadoExistente.localidad = updatedLlamado.localidad;
    llamadoExistente.isActive = updatedLlamado.isActive;

    const llamadoActualizado: LlamadoLaboralEntity =
      await this.llamadoRepository.save(llamadoExistente);

    return llamadoActualizado;
  }
}
