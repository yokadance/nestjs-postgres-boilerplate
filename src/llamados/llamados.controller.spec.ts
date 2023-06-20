import { Test, TestingModule } from '@nestjs/testing';
import { LlamadosController } from './llamados.controller';

describe('LlamadosController', () => {
  let controller: LlamadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlamadosController],
    }).compile();

    controller = module.get<LlamadosController>(LlamadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
