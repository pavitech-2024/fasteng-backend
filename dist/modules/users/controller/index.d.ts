import { InputCreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersService } from '../service';
export declare class UsersController {
    private readonly usersService;
    private logger;
    constructor(usersService: UsersService);
    createUser(body: InputCreateUserDto): Promise<User>;
    getUser(id: string): Promise<User>;
    updateUser(id: string, body: User): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
