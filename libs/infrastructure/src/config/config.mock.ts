import {
  InfrastructureModule,
  loadConfig,
  LoggerModule,
  SequelizeTestFactory,
} from '@app/infrastructure';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
loadConfig();
//or over your env
process.env.NODE_ENV = 'test';
//set port for test
process.env.PORT = '4447';
//config middlwares
//Default config for test
export const ConfigMock = [
  //Config module
  ConfigModule.forRoot({
    load: [async () => loadConfig()],
    isGlobal: true,
  }),
  SequelizeModule.forRootAsync({
    useClass: SequelizeTestFactory,
  }),
  //Infra (only local)
  InfrastructureModule,
  // Logger
  LoggerModule,
  //Http request
  HttpModule.register({ timeout: 60000 }),
];
