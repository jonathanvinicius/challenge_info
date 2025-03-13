import { PageDto, PageOptionsDto } from '@app/domain/dtos';
import { ClassConstructor } from 'class-transformer';
import {
  Attributes,
  FindOptions,
  GroupOption,
  Includeable,
  WhereOptions,
} from 'sequelize';
import { CriteriaOptions } from './criteria-options.interface';
import { BaseModel } from '../../models/base.model';

export interface IBaseRepository<T extends BaseModel> {
  create(data: T, options?: any): any;

  save(data: T): any;

  update(id: any, partialData: Partial<T>): any;

  findById(id: string | number): Promise<T>;

  findOne(
    options: FindOptions<Attributes<T>>,
    cls?: ClassConstructor<any>,
  ): Promise<T>;

  find(
    options: FindOptions<Attributes<T>>,
    cls?: ClassConstructor<any>,
  ): Promise<T[]>;

  findWithPagination(
    pageOptions: PageOptionsDto,
    criteria: WhereOptions<T>,
    order?: string[],
    cls?: ClassConstructor<any>,
    include?: Includeable | Includeable[],
  ): Promise<PageDto<T>>;

  findWithPagination(options: CriteriaOptions<T>): Promise<PageDto<T>>;

  findGroupBy(
    criteria: WhereOptions<T>,
    group: GroupOption,
    order?: string[],
    include?: Includeable | Includeable[],
  ): Promise<BaseModel[]>;
}
