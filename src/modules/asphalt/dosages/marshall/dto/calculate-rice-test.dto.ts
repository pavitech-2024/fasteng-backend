import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RiceTestItemDTO } from './rice-test-item.dto';

export class CalculateRiceTestDTO {
  @ApiProperty({
    description: 'Itens do ensaio Rice',
    type: [RiceTestItemDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RiceTestItemDTO)
  riceTest: RiceTestItemDTO[];
}