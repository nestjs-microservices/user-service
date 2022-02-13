import { UseCase } from '../base.use-case';
import { Injectable } from '@nestjs/common';
import { UserPort } from '../../ports/user.port';

@Injectable()
export class GetUserUseCase implements UseCase {
  constructor(private userPort: UserPort) {}

  exec(id: number) {
    return this.userPort.getUserById(id);
  }
}
