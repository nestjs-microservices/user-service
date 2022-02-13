import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserArgs } from '../../presentation/controllers/user.controller';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserPort {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: CreateUserArgs) {
    try {
      const { email, password } = user;
      const { id } = await this.prismaService.user.create({
        data: { email, credentials: { create: { password } } },
      });
      return new UserEntity(id, email, password);
    } catch (e) {
      throw new RpcException({
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getUserByEmail(email: string) {
    let user;
    try {
      user = await this.prismaService.user.findUnique({ where: { email } });
      return new UserEntity(user.id, user.email, '');
    } catch (e) {
      throw new RpcException({
        message: `User with email=${email} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }

  async getUserById(id: number) {
    let user;
    try {
      user = await this.prismaService.user.findUnique({ where: { id } });
      return new UserEntity(user.id, user.email, '');
    } catch (e) {
      throw new RpcException({
        message: `User with id=${id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
}
