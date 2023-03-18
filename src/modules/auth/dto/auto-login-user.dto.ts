import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InputAutoLoginDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  _id: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  token: string;
}
