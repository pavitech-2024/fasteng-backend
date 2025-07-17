import { InputCreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersService } from '../service';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    private logger;
    constructor(usersService: UsersService);
    createUser(body: InputCreateUserDto): Promise<User>;
    getUser(id: string): Promise<User>;
    updateUser(id: string, body: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
