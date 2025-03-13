import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMock } from '@app/infrastructure/config/config.mock';
import { createVehicle } from '@app/infrastructure/database/repositories/vehicle/factories/vehicle-repository-factory';
import { GetVehicleByIdUseCase } from '../get-vehicle-by-id.usecase';
import { NotFoundException } from '@nestjs/common';

describe('GetProcedureByIdUseCase', () => {
  let useCase: GetVehicleByIdUseCase;

  let createdVehicle: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...ConfigMock],
      providers: [GetVehicleByIdUseCase],
    }).compile();

    useCase = module.get<GetVehicleByIdUseCase>(GetVehicleByIdUseCase);

    createdVehicle = await createVehicle();
  });

  it('should be defined', async () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should get vehicle by id', async () => {
      const result = await useCase.execute(createdVehicle.id);

      expect(result).toBeDefined();

      expect(result).toEqual(
        expect.objectContaining({
          id: createdVehicle.id,
          createdAt: createdVehicle.createdAt,
          updatedAt: createdVehicle.updatedAt,
          uuid: createdVehicle.uuid,
          plate: createdVehicle.plate,
          chassis: createdVehicle.chassis,
          renavam: createdVehicle.renavam,
          model: createdVehicle.model,
          brand: createdVehicle.brand,
          vehicle_year: createdVehicle.vehicle_year,
        }),
      );
    });

    it('should not get vehicle if not exists', async () => {
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
