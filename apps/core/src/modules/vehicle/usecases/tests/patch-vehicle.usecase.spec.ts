import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMock } from '@app/infrastructure/config/config.mock';
import { NotFoundException } from '@nestjs/common';
import { PatchVehicleUseCase } from '../patch-vehicle.usecase';
import { createVehicle } from '@app/infrastructure/database/repositories/vehicle/factories/vehicle-repository-factory';

describe('PatchVehicleUseCase', () => {
  let useCase: PatchVehicleUseCase;
  let createdVehicle: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...ConfigMock],
      providers: [PatchVehicleUseCase],
    }).compile();

    useCase = module.get<PatchVehicleUseCase>(PatchVehicleUseCase);

    createdVehicle = await createVehicle();
  });

  it('should be defined', async () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should update vehicle', async () => {
      await useCase.execute(createdVehicle.id, {
        brand: 'Fiat',
      });
    });

    it('should not update vehicle if not exists', async () => {
      try {
        await useCase.execute(1, {
          brand: 'Fiat',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Not Found Exception');
        expect(error.response.statusCode).toBe(404);
      }
    });
  });
});
