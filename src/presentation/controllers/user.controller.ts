import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';

export type CreateUserArgs = Omit<UserEntity, 'id'>;

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @MessagePattern({ cmd: 'createUser' })
  createUser(args: CreateUserArgs): Promise<UserEntity> {
    return this.createUserUseCase.exec(args);
  }
}
