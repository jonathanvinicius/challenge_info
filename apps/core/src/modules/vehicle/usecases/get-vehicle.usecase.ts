import { IUsecase, PageDto, PageMetaDto, PageOptionsDto } from '@app/domain';
import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '@app/infrastructure';
import { VehicleResponse } from '../responses';

@Injectable()
export class GetVehicleUseCase implements IUsecase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(params: PageOptionsDto): Promise<PageDto<VehicleResponse>> {
    const vehiclePages = await this.vehicleRepository.findWithPagination({
      pageOptions: params,
    });

    const meta = new PageMetaDto({
      pageOptions: params,
      count: vehiclePages.data.length,
    });

    return new PageDto<VehicleResponse>(vehiclePages.data, meta);
  }
}
