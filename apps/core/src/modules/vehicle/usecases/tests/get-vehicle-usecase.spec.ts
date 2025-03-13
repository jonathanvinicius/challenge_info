import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMock } from '@app/infrastructure/config/config.mock';
import { PageOptionsDto } from '@app/domain';
import { GetVehicleUseCase } from '../get-vehicle.usecase';

describe('GetProcedureUseCase', () => {
  let useCase: GetVehicleUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...ConfigMock],
      providers: [GetVehicleUseCase],
    }).compile();

    useCase = module.get<GetVehicleUseCase>(GetVehicleUseCase);
  });

  it('should be defined', async () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should get vehicle', async () => {
      const result = await useCase.execute({
        page: 1,
        limit: 2,
      } as PageOptionsDto);

      expect(result).toBeDefined();
      expect(Array.isArray(result.data)).toEqual(true);
    });
  });
});
