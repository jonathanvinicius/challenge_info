import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class PatchVehicleDto {
  @IsString()
  @Transform(({ value }) => value.replace(/-/g, ''))
  @Length(7, 7, { message: 'Plate must have 7 characters' })
  @ApiProperty()
  plate: string;

  @IsString()
  @Transform(({ value }) => value.replace(/-/g, ''))
  @Length(17, 17, { message: 'Chassis must have 17 characters' })
  @ApiProperty()
  chassis: string;

  @IsString()
  @Transform(({ value }) => value.replace(/-/g, ''))
  @Length(11, 11, { message: 'Renavam must have 11 characters' })
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
