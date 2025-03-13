import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { db } from '../factories';
import { IAppConfig } from '../interfaces';
import { Configuration } from './configuration';

const logger = new Logger('LoadConfig');

// Load environment variables
dotenv.config();

/**
 * Initialize `Configuration` with environment variables
 */
export async function loadConfig() {
  logger.log('Loading config ' + process.env.NODE_ENV + ' ...');

  const dbCredentials = await db();

  const appData: IAppConfig = {
    db: dbCredentials,
  };
  // Set config
  Configuration.load(appData);
  return appData;
}
