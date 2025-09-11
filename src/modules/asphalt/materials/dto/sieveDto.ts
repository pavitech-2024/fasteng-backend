import { ApiProperty } from '@nestjs/swagger';

export class sieveDto {
  @ApiProperty({ example: 4.75, description: 'Abertura da peneira em mm' })
  size: number;

  @ApiProperty({ example: '% que passa', description: 'Percentual do material que passa pela peneira' })
  percentage: number;
}
