import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from '../base.model';
import { DB_SCHEMAS } from '../schemas.constants';

@Table({
  schema: DB_SCHEMAS.INFO,
  tableName: 'vehicle',
  underscored: true,
})
export class VehicleModel extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  plate: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  chassis: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  renavam: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  vehicle_year: Date;
}
