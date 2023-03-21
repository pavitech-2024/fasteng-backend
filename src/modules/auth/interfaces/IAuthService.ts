import { InputLoginUserDto, OutputLoginUserDto } from '../dto';

export interface IAuthService {
  login(data: InputLoginUserDto): Promise<OutputLoginUserDto>;

  refreshLogin(data: { token: string; _id: string }): Promise<any>;
}
