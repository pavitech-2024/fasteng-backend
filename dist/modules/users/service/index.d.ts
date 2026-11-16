import { CreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersRepository } from '../repository';
import { IUsersService } from '../interfaces';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersService implements IUsersService {
    private readonly usersRepository;
    private logger;
    constructor(usersRepository: UsersRepository);
    createUser({ uuid, connections, lastLoginList, photo, name, email, phone, dob, password }: CreateUserDto): Promise<User>;
    getUser(id: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
    resetPassword(id: string, newPassword: string): Promise<User>;
    completeUserData(id: string, data: {
        email: string;
        name: string;
        password: string;
    }): Promise<User>;
}
