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
    private llamadoRespository: Repository<LlamadoLaboralEntity>,
  ) {}

  addLlamado(createLlamadoDto: CreateLlamadoDto) {
    const newLlamado = this.llamadoRespository.create(createLlamadoDto);
    return this.llamadoRespository.save(newLlamado);
  }

  getAllLlamadoLaboral(): Promise<LlamadoLaboralEntity[]> {
    return this.llamadoRespository.find({});
  }

  public findAll(
    query: PaginateQuery,
  ): Promise<Paginated<LlamadoLaboralEntity>> {
    return new Promise((resolve, reject) => {
      paginate(query, this.llamadoRespository, {
        maxLimit: 10,
        sortableColumns: [
          'id',
          'name',
          'localidad',
          'Departamento',
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
    const totalCount = await this.llamadoRespository.count(); // Utiliza el método adecuado para obtener el número total de elementos desde tu repositorio o fuente de datos
    return totalCount;
  }

  public async getLlamadoById(id: number): Promise<LlamadoLaboralEntity> {
    const llamado: LlamadoLaboralEntity = await this.llamadoRespository.findOne(
      id,
    );
    return llamado;
  }

  public async updateLlamado(
    id: number,
    updatedLlamado: LlamadoLaboralEntity,
  ): Promise<LlamadoLaboralEntity> {
    const llamadoExistente: LlamadoLaboralEntity =
      await this.llamadoRespository.findOne(id);

    if (!llamadoExistente) {
      throw new NotFoundException('Llamado not found'); // Lanza la excepción NotFoundException
    }

    llamadoExistente.name = updatedLlamado.name;
    llamadoExistente.status = updatedLlamado.status;
    llamadoExistente.Departamento = updatedLlamado.Departamento;
    llamadoExistente.descripcion = updatedLlamado.descripcion;
    llamadoExistente.fechaVencimiento = updatedLlamado.fechaVencimiento;
    llamadoExistente.localidad = updatedLlamado.localidad;
    llamadoExistente.isActive = updatedLlamado.isActive;

    const llamadoActualizado: LlamadoLaboralEntity =
      await this.llamadoRespository.save(llamadoExistente);

    return llamadoActualizado;
  }
}
