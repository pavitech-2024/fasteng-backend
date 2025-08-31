import { ApiPropertyOptional } from '@nestjs/swagger';
import { sieveDto } from './sieveDto';

export class DescriptionDto {
  @ApiPropertyOptional({ example: 'Pedreira XYZ' })
  source?: string;

  @ApiPropertyOptional({ example: 'Maria Clara' })
  responsible?: string;

  @ApiPropertyOptional({ type: () => sieveDto })
  maxDiammeter?: sieveDto;

  @ApiPropertyOptional({ example: 'Granito' })
  aggregateNature?: string;

  @ApiPropertyOptional({ example: '2025-08-20' })
  boughtDate?: string;

  @ApiPropertyOptional({ example: '2025-08-21' })
  recieveDate?: string;

  @ApiPropertyOptional({ example: '2025-08-18' })
  extractionDate?: string;

  @ApiPropertyOptional({ example: '2025-08-19' })
  collectionDate?: string;

  @ApiPropertyOptional({ enum: ['CAP 30/45', 'CAP 50/70', 'CAP 85/100', 'CAP 150/200'] })
  classification_CAP?: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200';

  @ApiPropertyOptional({ enum: ['AMP 50/65', 'AMP 55/75', 'AMP 60/85', 'AMP 65/90'] })
  classification_AMP?: 'AMP 50/65' | 'AMP 55/75' | 'AMP 60/85' | 'AMP 65/90';

  @ApiPropertyOptional({ example: 'Material em boas condições' })
  observation?: string;
}
