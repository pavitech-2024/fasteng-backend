import { FilterQuery } from 'mongoose';
import { User } from '../schemas';

export interface IUserRepository {
  create(user: User): Promise<User>;

  findOne(userFilterQuery: FilterQuery<User>): Promise<User>;

  findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User>;

  findOneAndDelete(userFilterQuery: FilterQuery<User>): Promise<User>;

  updateUserLastLogin(user: User): void;
}
