import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateUserArgs } from '../types/user/create-user-args.type';

@Injectable()
export class UserPort {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: CreateUserArgs): Promise<UserEntity> {
    try {
      const { email, password } = user;
      const { id } = await this.prismaService.user.create({
        data: { email, credentials: { create: { password } } },
      });
      return new UserEntity(id, email, password);
    } catch (e) {
      throw new RpcException({
        message: `[UserPort][createUser] ${e.message}`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    let user;
    try {
      user = await this.prismaService.user.findUnique({ where: { email } });
      return new UserEntity(user.id, user.email, '');
    } catch (e) {
      throw new RpcException({
        message: `[UserPort][getUserByEmail] User with email=${email} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    let user;
    try {
      user = await this.prismaService.user.findUnique({ where: { id } });
      return new UserEntity(user.id, user.email, '');
    } catch (e) {
      throw new RpcException({
        message: `[UserPort][getUserById] User with id=${id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }

  async updateUser(id: number, data: CreateUserArgs): Promise<UserEntity> {
    try {
      await this.prismaService.user.update({
        where: { id },
        data: {
          email: data.email,
          credentials: { create: { password: data.password } },
        },
      });
    } catch (e) {
      throw new RpcException({
        message: `[UserPort][updateUser] User with id=${id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.getUserById(id);
  }
}
