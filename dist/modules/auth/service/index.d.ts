import { UsersRepository } from '../../users/repository';
import { InputLoginUserDto, OutputLoginUserDto, InputRefreshLoginDto } from '../dto';
import { IAuthService } from '../interfaces';
export declare class AuthService implements IAuthService {
    private readonly usersRepository;
    private logger;
    private tokenService;
    constructor(usersRepository: UsersRepository);
    private roxConnection;
    login(data: InputLoginUserDto): Promise<OutputLoginUserDto>;
    refreshLogin(data: InputRefreshLoginDto): Promise<OutputLoginUserDto>;
}
