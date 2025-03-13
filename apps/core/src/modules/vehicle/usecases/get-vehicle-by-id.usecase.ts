import { handleNotFound, IUsecase } from '@app/domain';
import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '@app/infrastructure';
import { VehicleResponse } from '../responses';

@Injectable()
export class GetVehicleByIdUseCase implements IUsecase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(id: number): Promise<VehicleResponse> {
    await this.validateVehicleExists(id);

    return this.vehicleRepository.findOne({ where: { id } });
  }

  private async validateVehicleExists(id: number) {
    const vehicleExists = await this.vehicleRepository.findOne({
      where: { id },
    });

    handleNotFound(vehicleExists, 'Vehicle not found');
  }
}
