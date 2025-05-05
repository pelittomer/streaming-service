import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/type';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('API documentation for managing movie data.')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App')
  // Sets the global prefix for all API routes to '/api'
  app.setGlobalPrefix('api')
  //middleware
  app.use(cookieParser())
  app.use(helmet())
  app.enableCors()

  setupSwagger(app)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: true,
        value: true
      }
    })
  )

  app.useGlobalFilters(new HttpExceptionFilter())

  const port = app.get(ConfigService<AppConfig, true>).get('api.port', { infer: true })
  await app.listen(port)

  logger.log(`Application started on port:${port}`)
}
bootstrap();
