import {
  IUsecase,
  PostMessageDto,
  throwUnprocessableEntity,
} from '@app/domain';
import { VehicleRepository } from '@app/infrastructure';
import { Injectable } from '@nestjs/common';
import { PostVehicleDto } from '../dtos';
import { Op } from 'sequelize';

@Injectable()
export class PostVehicleUseCase implements IUsecase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(vehicleData: PostVehicleDto): Promise<PostMessageDto> {
    await this.validateVehicleExists(vehicleData.renavam, vehicleData.chassis);

    const vehicle = await this.vehicleRepository.create({
      ...vehicleData,
    });

    return new PostMessageDto(vehicle.id, 'Vehicle created successfully');
  }

  private async validateVehicleExists(renavam: string, chassis: string) {
    const vehicleExists = await this.vehicleRepository.findOne({
      where: {
        [Op.or]: [{ renavam }, { chassis }],
      },
    });

    if (vehicleExists) {
      throwUnprocessableEntity('Vehicle already exists');
    }
  }
}
