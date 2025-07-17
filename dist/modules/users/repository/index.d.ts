import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas';
import { IUserRepository } from '../interfaces';
export declare class UsersRepository implements IUserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(user: User): Promise<User>;
    findOne(userFilterQuery: FilterQuery<User>): Promise<User>;
    findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User>;
    findOneAndDelete(userFilterQuery: FilterQuery<User>): Promise<User>;
    updateUserLastLogin(user: User): void;
}
