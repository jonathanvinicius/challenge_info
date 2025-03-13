import { handleNotFound, IUsecase } from '@app/domain';
import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '@app/infrastructure';
import { PatchVehicleDto } from '../dtos';

@Injectable()
export class PatchVehicleUseCase implements IUsecase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(id: number, body: Partial<PatchVehicleDto>) {
    await this.validateVehicleExists(id);

    await this.vehicleRepository.update(id, body);
  }

  private async validateVehicleExists(id: number) {
    const vehicleExists = await this.vehicleRepository.findOne({
      where: { id },
    });

    handleNotFound(vehicleExists, 'Vehicle not found');
  }
}
