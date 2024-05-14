import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');

async function bootstrap() {
  // logger
  const logger = new Logger('Main-Products-Microservice');

  console.log(envs.natsServers);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
  );

  // Global Pipes Configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();

  logger.log(
    `${colors.white('Products-Microservice')} ${colors.green('running on port:')} ${colors.black.bgWhite(envs.port.toString())}`,
  );
}
bootstrap();
