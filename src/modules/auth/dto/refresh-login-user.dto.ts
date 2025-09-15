import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InputRefreshLoginDto {
  @ApiProperty({
    description: 'Identificador único do usuário',
    example: '64f2c1b4e7a1b2c3d4e5f6a7',
  })
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    description: 'Token JWT válido para renovação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsNotEmpty()
  token: string;
}


/*import { IsNotEmpty } from 'class-validator';

export class InputRefreshLoginDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  token: string;
}*/
