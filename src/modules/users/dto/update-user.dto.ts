// export class UpdateUserDto {
//   name?: string;
//   email?: string;
//   phone?: string;
//   dob?: Date;
//   photo?: string;
// }

import { Type } from "class-transformer";
import { IsOptional, IsString, IsNumber, Min, Max, IsDate, IsNotEmpty, IsArray } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  @Type(() => Number)
  connections?: number; 

  @IsString()
  photo?: string; 

  @IsString()
  name?: string; 

  @IsString()
  email?: string; 

  @IsString()
  phone?: string; 

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;

  @IsNotEmpty()
  @IsArray()
  lastLoginList: String[]

  @IsOptional()
  @IsString()
  planName: string

  @IsNotEmpty()
  preferences: any
}