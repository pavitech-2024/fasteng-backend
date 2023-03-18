import { IsNotEmpty, IsNumber, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  uuid: string;
  lastLoginList: Date[];
  connections: number;
  photo: string;
}

export class InputCreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  uuid: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3)
  @Type(() => Number)
  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 3,
  })
  connections: number;
}
