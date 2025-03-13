import { FilterExceptionInterceptor } from '@app/infrastructure/interceptors';
import { INestApplication, ValidationPipe } from '@nestjs/common';

/**
 * Initialize app middlewares
 * @param app Application
 */
export function initializeMiddlewares(app: INestApplication) {
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalFilters(new FilterExceptionInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
