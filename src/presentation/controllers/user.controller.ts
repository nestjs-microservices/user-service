import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/user/get-user.use-case';

export type CreateUserArgs = Omit<UserEntity, 'id'>;

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}

  @MessagePattern({ cmd: 'createUser' })
  createUser(args: CreateUserArgs): Promise<UserEntity> {
    return this.createUserUseCase.exec(args);
  }

  @MessagePattern({ cmd: 'getUser' })
  getUser(email: string): Promise<UserEntity> {
    return this.getUserUseCase.exec(email);
  }
}
