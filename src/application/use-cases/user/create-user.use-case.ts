import { UseCase } from '../base.use-case';
import { Injectable } from '@nestjs/common';
import { UserPort } from '../../ports/user.port';
import {CreateUserArgs} from "../../types/user/create-user-args.type";

@Injectable()
export class CreateUserUseCase implements UseCase {
  constructor(private userPort: UserPort) {}

  exec(user: CreateUserArgs) {
    return this.userPort.createUser(user);
  }
}
