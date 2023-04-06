import { IsNotEmpty } from 'class-validator';

export class InputRefreshLoginDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  token: string;
}
