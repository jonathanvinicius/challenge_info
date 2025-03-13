import { AppInterceptor } from '@app/domain/interceptors/app.interceptor';
import {
  InfrastructureModule,
  loadConfig,
  SequelizePostgresFactory,
} from '@app/infrastructure';
import { LoggingInterceptor } from '@app/infrastructure/interceptors';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule, VehicleModule } from './modules';
import { CognitoAuthGuard } from '@app/infrastructure/guards';

@Module({
  imports: [
    //Config module
    ConfigModule.forRoot({
      load: [async () => loadConfig()],
      isGlobal: true,
    }),
    // Orm
    SequelizeModule.forRootAsync({
      // inject: [ConfigService], ConfigService already global
      useClass: SequelizePostgresFactory,
    }),

    //Infra
    InfrastructureModule,
    UsersModule,
    VehicleModule,
  ],
  controllers: [],
  providers: [
    {
      /**
       * Use an interceptor to set default response { data }
       */
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
    /**
     * Global interceptors used across the whole application
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: CognitoAuthGuard,
    },
  ],
})
export class AppModule {}
