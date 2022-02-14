import { UseCase } from '../base.use-case';
import { Injectable } from '@nestjs/common';
import { UserPort } from '../../ports/user.port';
import { CreateUserArgs } from '../../types/user/create-user-args.type';

@Injectable()
export class UpdateUserUseCase implements UseCase {
  constructor(private userPort: UserPort) {}

  exec(payload: { id: number; data: CreateUserArgs }) {
    return this.userPort.updateUser(payload.id, payload.data);
  }
}
