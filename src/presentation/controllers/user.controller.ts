import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/user/get-user.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-case';
import { CreateUserArgs } from '../../application/types/user/create-user-args.type';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  @MessagePattern({ cmd: 'createUser' })
  createUser(args: CreateUserArgs): Promise<UserEntity> {
    return this.createUserUseCase.exec(args);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(email: string): Promise<UserEntity> {
    return this.getUserUseCase.exec(email);
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(id: number): Promise<UserEntity> {
    return this.getUserByIdUseCase.exec(id);
  }

  @MessagePattern({ cmd: 'updateUser' })
  updateUser(payload: {
    id: number;
    data: CreateUserArgs;
  }): Promise<UserEntity> {
    return this.updateUserUseCase.exec(payload);
  }
}
