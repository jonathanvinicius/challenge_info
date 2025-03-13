import { ISequelizeConfig } from './db.config.interface';

/**
 * App Config
 *
 * Encapsulates environment variables
 *
 */
export interface IAppConfig {
  db: ISequelizeConfig;
}
