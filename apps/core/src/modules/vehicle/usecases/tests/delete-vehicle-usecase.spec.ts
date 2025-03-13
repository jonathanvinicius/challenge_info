import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMock } from '@app/infrastructure/config/config.mock';
import { NotFoundException } from '@nestjs/common';
import { createVehicle } from '@app/infrastructure/database/repositories/vehicle/factories/vehicle-repository-factory';
import { DeleteVehicleUseCase } from '../delete-vehicle.usecase';

describe('DeleteProcedureUseCase', () => {
  let useCase: DeleteVehicleUseCase;
  let createdVehicle: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...ConfigMock],
      providers: [DeleteVehicleUseCase],
    }).compile();

    useCase = module.get<DeleteVehicleUseCase>(DeleteVehicleUseCase);

    createdVehicle = await createVehicle();
  });

  it('should be defined', async () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should defined usecase', async () => {
      await useCase.execute(createdVehicle.id);
    });

    it('should not delete vehicle if not exists', async () => {
      try {
        await useCase.execute(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Not Found Exception');
        expect(error.response.statusCode).toBe(404);
      }
    });
  });
});
