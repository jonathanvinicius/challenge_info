import { SwaggerResource } from '@app/domain/common';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Resources from './resources/index';

/**
 * Swagger doc builder
 */
export class SwaggerDoc {
  /**
   * Configure summary for API Tags
   */
  setupDocs(app: INestApplication) {
    const title = 'INFO API';
    const description = 'INFO API';
    const version = '1.0.0';

    //tags must be order manually
    //order by A-Z
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(
        `${description}  
        \n\n🔗 **Ambientes Disponíveis:**  
        - 🚀 Local: [http://localhost:4000](https://localhost:4000)`,
      )
      .setVersion(version)
      .addServer('http://localhost:4000')
      .addBearerAuth();

    const dr: SwaggerResource[] = Object.values(Resources);
    // swagger auto load
    dr.forEach((r: SwaggerResource) => {
      //inject data in docBuilder
      config.addTag(r.tag, r.description);
    });
    const swagger = config.build();
    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('docs', app, document);
  }
}
