import { createEntity } from '@app/infrastructure/database/factories';
import { VehicleModel } from '@app/infrastructure/database/models';

export const createVehicle = async (
  overrides: Partial<VehicleModel> = {},
  bulk: boolean = false,
  quantity: number = 1,
) => {
  const data = { ...overrides };

  return createEntity(VehicleModel, data, bulk, quantity);
};
