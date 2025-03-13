import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostVehicleDto {
  @IsString()
  @ApiProperty()
  plate: string;

  @IsString()
  @ApiProperty()
  chassis: string;

  @IsString()
  @ApiProperty()
  renavam: string;

  @IsString()
  @ApiProperty()
  model: string;

  @IsString()
  @ApiProperty()
  brand: string;

  @IsString()
  @ApiProperty()
  vehicle_year: Date;
}
