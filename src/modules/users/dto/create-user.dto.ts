import { IsNotEmpty, IsNumber, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  uuid: string;
  lastLoginList: Date[];
  connections: number;
  photo: string;
}

export class InputCreateUserDto {
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3)
  @Type(() => Number)
  connections: number;
}
