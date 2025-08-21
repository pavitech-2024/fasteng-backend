import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RiceTestItemDTO {
  @ApiProperty({
    description: 'ID do item do ensaio Rice',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Teor de ligante',
    example: '4.5%',
  })
  @IsString()
  teor: string;

  @ApiProperty({
    description: 'Massa da amostra seca',
    example: 1200.5,
  })
  @IsNumber()
  massOfDrySample: number;

  @ApiProperty({
    description: 'Massa do recipiente + água + amostra',
    example: 2500.3,
  })
  @IsNumber()
  massOfContainerWaterSample: number;

  @ApiProperty({
    description: 'Massa do recipiente + água',
    example: 2000.1,
  })
  @IsNumber()
  massOfContainerWater: number;
}