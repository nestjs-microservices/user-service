import { UseCase } from '../../../use-case';
import { UserEntity } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserPort } from '../../ports/user.port';
import { CreateUserArgs } from '../../../presentation/controllers/user.controller';

@Injectable()
export class CreateUserUseCase implements UseCase<UserEntity> {
  constructor(
    private userPort: UserPort,
  ) {}
  exec(user: CreateUserArgs) {
    return this.userPort.createUser(user);
  }
}
