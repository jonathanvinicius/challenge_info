import { faker } from '@faker-js/faker';
import {
  Model,
  ModelStatic,
  DataTypes,
  ArrayDataType,
  EnumDataType,
} from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

export const createEntity = async <T extends Model>(
  model: ModelStatic<T>,
  overrides: MakeNullishOptional<T['_attributes']> = {} as MakeNullishOptional<
    T['_attributes']
  >,
  bulk: boolean = false,
  quantity: number = 1,
) => {
  if (bulk) {
    return createEntities(model, overrides, quantity);
  }

  const attributes = model.getAttributes();

  const data: MakeNullishOptional<T['_attributes']> = Object.keys(
    attributes,
  ).reduce(
    (result, key) => {
      const attribute = attributes[key];
      const columnType = attribute.type;

      result[key as keyof T['_attributes']] =
        overrides[key as keyof T['_attributes']] !== undefined
          ? overrides[key as keyof T['_attributes']]
          : generateFakeData(columnType);
      return result;
    },
    {} as MakeNullishOptional<T['_attributes']>,
  );

  return model.create(data);
};

const createEntities = async <T extends Model>(
  model: ModelStatic<T>,
  overrides: MakeNullishOptional<T['_attributes']> = {} as MakeNullishOptional<
    T['_attributes']
  >,
  quantity: number,
) => {
  const entitiesData = [];

  for (let i = 0; i < quantity; i++) {
    entitiesData.push(await createEntity(model, overrides));
  }

  return entitiesData;
};

const generateFakeData = (type: any) => {
  if (type instanceof DataTypes.STRING) {
    return faker.lorem.word();
  }
  if (type instanceof DataTypes.TEXT) {
    return faker.lorem.words(10);
  }
  if (type instanceof DataTypes.INTEGER || type instanceof DataTypes.BIGINT) {
    return faker.number.int();
  }
  if (type instanceof DataTypes.FLOAT || type instanceof DataTypes.DECIMAL) {
    return faker.number.float({ min: 0, max: 1000 });
  }
  if (type instanceof DataTypes.BOOLEAN) {
    return faker.datatype.boolean();
  }
  if (type instanceof DataTypes.DATE) {
    return faker.date.recent();
  }
  if (type instanceof DataTypes.DATEONLY) {
    return faker.date.recent().toISOString().split('T')[0];
  }
  if (type instanceof DataTypes.UUID) {
    return faker.string.uuid();
  }
  if (type instanceof DataTypes.ENUM) {
    const enumValues = (type as EnumDataType<string>).values;
    return faker.helpers.arrayElement(enumValues);
  }
  if (type instanceof DataTypes.ARRAY) {
    const arrayType = (type as ArrayDataType<any>).options.type;
    return [generateFakeData(arrayType)];
  }

  return faker.lorem.word();
};
