import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ValuesOfSpecificGravityDTO {
  @ApiProperty({ example: 100 })
  massOfDrySample: number;

  @ApiProperty({ example: 120 })
  massOfContainerWaterSample: number;

  @ApiProperty({ example: 50 })
  massOfContainerWater: number;
}

export class ConfirmSpecificGravityDTO {
  @ApiProperty({ enum: ['DMT', 'GMM'], example: 'DMT' })
  method: 'DMT' | 'GMM';

  @ApiProperty({ type: [Number], example: [2.45, 2.5, 2.52] })
  listOfSpecificGravities: number[];

  @ApiProperty({
    type: 'object',
    example: [{ input_1: 10, input_2: 20 }],
    description: 'Objeto com os percentuais informados. A chave contém o id da entrada (e.g. input_1)',
  })
  percentsOfDosage: { [key: string]: number }[];

  @ApiProperty({ type: [Number], example: [10, 20, 30] })
  confirmedPercentsOfDosage: number[];

  @ApiProperty({ example: 5.5 })
  optimumContent: number;

  @ApiPropertyOptional({ example: 2.43 })
  gmm?: number;

  @ApiPropertyOptional({ type: ValuesOfSpecificGravityDTO })
  valuesOfSpecificGravity?: ValuesOfSpecificGravityDTO;
}
