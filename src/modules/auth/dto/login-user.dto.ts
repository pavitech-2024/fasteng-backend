import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../users/schemas';

export class InputLoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class OutputLoginUserDto {
  statusCode: number;
  token: string;
  user: User;
  email: string;
  name: string;
  planName: string;
}
