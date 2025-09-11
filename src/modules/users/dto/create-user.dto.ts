import { IsNotEmpty, IsNumber, Min, Max, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Identificador único do usuário', example: '123e4567-e89b-12d3-a456-426614174000' })
  uuid: string;

  @ApiProperty({ description: 'Lista de datas de último login', type: [Date], example: ['2025-08-17T00:00:00Z'] })
  lastLoginList: Date[];

  @ApiProperty({ description: 'Número de conexões', example: 2 })
  connections: number;

  @ApiProperty({ description: 'URL da foto do usuário', example: 'https://example.com/photo.jpg' })
  photo: string;
}

export class InputCreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Identificador único do usuário', example: '123e4567-e89b-12d3-a456-426614174000' })
  uuid: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3)
  @Type(() => Number)
  @ApiProperty({ description: 'Número de conexões do usuário', minimum: 1, maximum: 3, example: 2 })
  connections: number;
}


/*import { IsNotEmpty, IsNumber, Min, Max, IsString, IsOptional, IsDate } from 'class-validator';
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
}*/


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