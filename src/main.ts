import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  // logger
  const logger = new Logger('Main-Products-Microservice');

  const app = await NestFactory.create(AppModule);

  // Configuration Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(envs.port);
  logger.log(`Products Microservice running on port: ${envs.port}`);
}
bootstrap();
