import { createEntity } from '@app/infrastructure/database/factories';
import { UserModel } from '@app/infrastructure/database/models';

export const createUser = async (
  overrides: Partial<UserModel> = {},
  bulk: boolean = false,
  quantity: number = 1,
) => {
  const data = { ...overrides };

  return createEntity(UserModel, data, bulk, quantity);
};
