import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas';

export class InputLoginUserDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'user@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}

export class OutputLoginUserDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI...' })
  token: string;

  @ApiProperty({
    description: 'Objeto de usuário retornado',
    type: () => User, // importante para Swagger entender o schema
  })
  user: User;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'João da Silva' })
  name: string;

  @ApiProperty({ example: 'Plano Premium' })
  planName: string;
}


/*import { IsEmail, IsNotEmpty } from 'class-validator';
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
*/