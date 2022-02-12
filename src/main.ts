import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PresentationModule } from './presentation/presentation.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PresentationModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: '8888',
    },
  });
  app.listen();
}

bootstrap();
