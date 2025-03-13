import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class PatchVehicleDto {
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

  @IsDate()
  @ApiProperty()
  vehicle_year: Date;
}
