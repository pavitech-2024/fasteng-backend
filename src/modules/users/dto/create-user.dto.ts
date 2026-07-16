import { IsNotEmpty, IsNumber, Min, Max, IsString, IsOptional, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  uuid: string;
  lastLoginList: Date[];
  connections: number;
  photo: string;
  email?: string;
  name?: string;
  phone?: string;
  dob?: Date;
  password?: string;
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

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;

  @IsOptional()
  @IsString()
  password?: string;
}


// export class UpdateUserDto {
//   @IsOptional()
//   @IsString()
//   uuid?: string;

//   @IsNumber()
//   @Min(1)
//   @Max(3)
//   @Type(() => Number)
//   connections?: number; 

//   @IsString()
//   photo?: string; 

//   @IsString()
//   name?: string; 

//   @IsString()
//   email?: string; 

//   @IsString()
//   phone?: string; 

//   @IsDate()
//   dob?: string;
// }