import { UserEntity } from '../../../domain/entities/user.entity';

export type CreateUserArgs = Omit<UserEntity, 'id'>;