import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from '../base.model';
import { DB_SCHEMAS } from '../schemas.constants';

@Table({
  schema: DB_SCHEMAS.INFO,
  tableName: 'users',
  underscored: true,
})
export class UserModel extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cognitoId: string;
}
