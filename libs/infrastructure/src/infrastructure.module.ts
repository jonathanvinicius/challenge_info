import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as ImportModels from './database/models/index';
import * as ImportRepositories from './database/repositories/index';
//import all repositories
const repositories = Object.values(ImportRepositories);
//import all models
const sequelizeModels = SequelizeModule.forFeature(Object.values(ImportModels));
@Global()
@Module({
  imports: [sequelizeModels],
  exports: [sequelizeModels, ...repositories],
  controllers: [],
  providers: [...repositories],
})
/**
 * Infrastructure module
 * > Global Module
 */
export class InfrastructureModule {}
