import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  PostVehicleUseCase,
  DeleteVehicleUseCase,
  GetVehicleByIdUseCase,
  GetVehicleUseCase,
  PatchVehicleUseCase,
} from './usecases';
import { RESOURCE_VEHICLE } from '../../docs/resources';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostVehicleDto, PatchVehicleDto } from './dtos';
import { ResponsePostMessage } from '@app/domain/responses';
import {
  ApiDataResponse,
  ApiPaginatedResponse,
  PageOptionsDto,
} from '@app/domain';
import { VehicleResponse } from './responses';

@ApiBearerAuth()
@ApiTags(RESOURCE_VEHICLE.tag)
@Controller(RESOURCE_VEHICLE.route)
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: PostVehicleUseCase,
    private readonly getVehicleUseCase: GetVehicleUseCase,
    private readonly getVehicleByIdUseCase: GetVehicleByIdUseCase,
    private readonly patchVehicleUseCase: PatchVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @ApiOperation({ summary: 'Post vehicle' })
  @ApiDataResponse({
    type: ResponsePostMessage,
    status: HttpStatus.CREATED,
  })
  @Post()
  @ApiTags(RESOURCE_VEHICLE.tag)
  @ApiTags(RESOURCE_VEHICLE.tag)
  postOrderUser(@Body() body: PostVehicleDto) {
    return this.createVehicleUseCase.execute(body);
  }

  @ApiOperation({ summary: 'Get Vehicles' })
  @ApiPaginatedResponse({
    type: VehicleResponse,
    description: 'Get Vehicle',
    operationDescription: 'Get Vehicle',
  })
  @Get()
  getVehicle(@Query() params: PageOptionsDto) {
    return this.getVehicleUseCase.execute(params);
  }

  @ApiOperation({ summary: 'Get Vehicle by id' })
  @ApiDataResponse({
    type: VehicleResponse,
    description: 'Get Vehicle by id',
    operationDescription: 'Get Vehicle by id',
  })
  @ApiParam({
    name: 'vehicleId',
    description: 'Vehicle id',
  })
  @Get('/:vehicleId')
  getVehicleById(@Param('vehicleId') vehicleId: number) {
    return this.getVehicleByIdUseCase.execute(vehicleId);
  }

  @ApiOperation({ summary: 'Update Vehicle' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No Content',
  })
  @ApiParam({
    name: 'vehicleId',
    description: 'Vehicle id',
  })
  @Patch('/:vehicleId')
  updateVehicle(
    @Param('vehicleId') vehicleId: number,
    @Body() body: PatchVehicleDto,
  ) {
    return this.patchVehicleUseCase.execute(vehicleId, body);
  }

  @ApiOperation({ summary: 'Delete Vehicle' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No Content',
  })
  @ApiParam({
    name: 'vehicleId',
    description: 'Vehicle Id',
  })
  @Delete('/:vehicleId')
  deleteVehicle(@Param('vehicleId') vehicleId: number) {
    return this.deleteVehicleUseCase.execute(vehicleId);
  }
}
