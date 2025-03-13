import { handleNotFound, IUsecase } from '@app/domain';
import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '@app/infrastructure';

@Injectable()
export class DeleteVehicleUseCase implements IUsecase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(id: number): Promise<void> {
    await this.validateVehicleExists(id);

    await this.vehicleRepository.delete({ id });
  }

  private async validateVehicleExists(id: number) {
    const vehicleExists = await this.vehicleRepository.findOne({
      where: { id },
    });

    handleNotFound(vehicleExists, 'Vehicle not found');
  }
}
