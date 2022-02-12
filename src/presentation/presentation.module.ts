import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from '../domain/services/app.service';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '../application/use-cases/user/create-user.use-case';
import { UserPort } from '../application/ports/user.port';
import {PrismaService} from "../domain/services/prisma/prisma.service";

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, CreateUserUseCase, UserPort, PrismaService],
})
export class PresentationModule {}
