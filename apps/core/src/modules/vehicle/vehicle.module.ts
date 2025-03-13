import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import {
  PostVehicleUseCase,
  DeleteVehicleUseCase,
  GetVehicleByIdUseCase,
  GetVehicleUseCase,
  PatchVehicleUseCase,
} from './usecases';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [
    PostVehicleUseCase,
    GetVehicleUseCase,
    GetVehicleByIdUseCase,
    PatchVehicleUseCase,
    DeleteVehicleUseCase,
  ],
})
export class VehicleModule {}
