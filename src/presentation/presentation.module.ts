import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from '../application/services/app.service';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '../application/use-cases/user/create-user.use-case';
import { UserPort } from '../application/ports/user.port';
import { PrismaService } from '../application/services/prisma.service';
import { GetUserUseCase } from '../application/use-cases/user/get-user.use-case';
import { LoggerService } from '../application/services/logger.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransportInterceptor } from '../application/interceptors/transport.interceptor';
import { ExceptionFilter } from '../application/filters/exception.filter';
import { GetUserByIdUseCase } from '../application/use-cases/user/get-user-by-id.use-case';

const USE_CASES = [CreateUserUseCase, GetUserUseCase, GetUserByIdUseCase];
const PORTS = [UserPort];
const SERVICES = [PrismaService, LoggerService];
const TRANSPORTS = [
  { provide: APP_INTERCEPTOR, useClass: TransportInterceptor },
];
const FILTERS = [{ provide: APP_FILTER, useClass: ExceptionFilter }];

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    ...USE_CASES,
    ...PORTS,
    ...SERVICES,
    ...TRANSPORTS,
    ...FILTERS,
  ],
})
export class PresentationModule {}
