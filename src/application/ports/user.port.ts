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

  async getUser(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    const { password } = await this.prismaService.userCredential.findFirst({
      where: { user_id: user.id },
      orderBy: { created_at: 'desc' },
    });
    return new UserEntity(user.id, user.email, password);
  }
}
