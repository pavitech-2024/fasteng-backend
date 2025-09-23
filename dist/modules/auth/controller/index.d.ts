import { InputLoginUserDto, OutputLoginUserDto } from '../dto';
import { InputRefreshLoginDto } from '../dto/refresh-login-user.dto';
import { AuthService } from '../service';
export declare class AuthController {
    private readonly authService;
    private logger;
    constructor(authService: AuthService);
    login(body: InputLoginUserDto): Promise<OutputLoginUserDto>;
    refreshLogin(body: InputRefreshLoginDto): Promise<OutputLoginUserDto>;
}
