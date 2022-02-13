import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/user/get-user.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-case';

export type CreateUserArgs = Omit<UserEntity, 'id'>;

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
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
}
