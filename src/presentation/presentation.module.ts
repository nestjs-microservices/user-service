import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from '../domain/services/app.service';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '../application/use-cases/user/create-user.use-case';
import { UserPort } from '../application/ports/user.port';
import { PrismaService } from '../domain/services/prisma.service';
import { GetUserUseCase } from '../application/use-cases/user/get-user.use-case';
import { LoggerService } from '../domain/services/logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransportInterceptor } from '../application/interceptors/transport.interceptor';

const USE_CASES = [CreateUserUseCase, GetUserUseCase];
const PORTS = [UserPort];
const SERVICES = [PrismaService, LoggerService];
const TRANSPORTS = [
  { provide: APP_INTERCEPTOR, useClass: TransportInterceptor },
];

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, ...USE_CASES, ...PORTS, ...SERVICES, ...TRANSPORTS],
})
export class PresentationModule {}
