import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas';
import { IUserRepository } from '../interfaces';
import { DATABASE_CONNECTION } from '../../../infra/mongoose/database.config';

export class UsersRepository implements IUserRepository {
  constructor(@InjectModel(User.name, DATABASE_CONNECTION.COMMON) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel({
      ...user,
      createdAt: new Date(),
    });
    return createdUser.save();
  }

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    });
  }

  async findOneAndDelete(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findByIdAndDelete(userFilterQuery);
  }

  updateUserLastLogin(user: User): void {
    user.lastLoginList.length >= user.connections && user.lastLoginList.shift();
    user.lastLoginList.push(new Date());
  }
}
