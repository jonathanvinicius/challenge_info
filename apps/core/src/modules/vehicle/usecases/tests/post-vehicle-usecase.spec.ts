import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMock } from '@app/infrastructure/config/config.mock';
import { PostVehicleUseCase } from '../post-vehicle.usecase';
import { UnprocessableEntityException } from '@nestjs/common';
import { createVehicle } from '@app/infrastructure/database/repositories/vehicle/factories/vehicle-repository-factory';

describe('PostVehicleUseCase', () => {
  let useCase: PostVehicleUseCase;
  let createdVehicle: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...ConfigMock],
      providers: [PostVehicleUseCase],
    }).compile();

    useCase = module.get<PostVehicleUseCase>(PostVehicleUseCase);
    createdVehicle = createVehicle();
  });

  it('should be defined', async () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should save vehicle', async () => {
      const result = await useCase.execute({
        brand: 'Fiat',
        model: 'Uno',
        chassis: '0932',
        plate: 'ONH-1234',
        renavam: '320932',
        vehicle_year: new Date('2003-09-09'),
      });

      expect(result).toBeDefined();
    });

    it('should not save vehicle if exists', async () => {
      try {
        jest
          .spyOn(useCase['vehicleRepository'], 'findOne')
          .mockResolvedValue(createdVehicle);

        await useCase.execute({
          brand: createdVehicle.brand,
          model: createdVehicle.model,
          chassis: createdVehicle.chassis,
          plate: createdVehicle.plate,
          renavam: createdVehicle.renavam,
          vehicle_year: new Date('2003-09-09'),
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
        expect(error.message).toBe('Unprocessable Entity Exception');
        expect(error.response.statusCode).toBe(422);
      }
    });
  });
});
