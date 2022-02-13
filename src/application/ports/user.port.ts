import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../domain/services/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserArgs } from '../../presentation/controllers/user.controller';

@Injectable()
export class UserPort {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: CreateUserArgs) {
    const { email, password } = user;
    const { id } = await this.prismaService.user.create({
      data: { email, credentials: { create: { password } } },
    });
    return new UserEntity(id, email, password);
  }
}
