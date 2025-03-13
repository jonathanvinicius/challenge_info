import { Injectable } from '@nestjs/common';
import { VehicleModel } from '../../models';
import { BaseRepository } from '../base.repository';

@Injectable()
export class VehicleRepository extends BaseRepository<VehicleModel> {
  constructor() {
    super(VehicleModel);
  }
}
