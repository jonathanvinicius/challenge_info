import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerDoc } from './docs/swagger.doc';
import { initializeMiddlewares } from './middlewares';

//logger
const logger = new Logger('CoreMain');

async function bootstrap() {
  // create app
  const app = await NestFactory.create(AppModule);

  initializeMiddlewares(app);

  //swagger docs
  new SwaggerDoc().setupDocs(app);

  // app port
  const port = process.env.API_PORT || 3000;
  //start app
  await app.listen(port, () => {
    logger.log(
      `APP Core running port ${port} environment: ${process.env.NODE_ENV}`,
    );
    if (process.env.APP_SERVER_URL) {
      logger.log(`Application server: ${process.env.APP_SERVER_URL}`);
    }
  });
}
bootstrap();
