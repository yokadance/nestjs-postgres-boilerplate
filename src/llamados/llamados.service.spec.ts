import { Test, TestingModule } from '@nestjs/testing';
import { LlamadosService } from './llamados.service';

describe('LlamadosService', () => {
  let service: LlamadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlamadosService],
    }).compile();

    service = module.get<LlamadosService>(LlamadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
