import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Sieve } from '../../../../utils/interfaces';

export class DescriptionDto {
  @ApiPropertyOptional({ example: 'Pedreira XYZ', description: 'Fonte do material' })
  source?: string;

  @ApiPropertyOptional({ example: 'João da Silva', description: 'Responsável pelo material' })
  responsible?: string;

  @ApiPropertyOptional({ description: 'Peneira máxima usada', type: String }) // se Sieve for uma interface complexa, pode precisar virar uma classe também
  maxDiammeter?: Sieve;

  @ApiPropertyOptional({ example: 'Granito', description: 'Natureza do agregado' })
  aggregateNature?: string;

  @ApiPropertyOptional({ example: '2025-08-20', description: 'Data da compra (ISO string)' })
  boughtDate?: string;

  @ApiPropertyOptional({ example: '2025-08-21', description: 'Data do recebimento (ISO string)' })
  recieveDate?: string;

  @ApiPropertyOptional({ example: '2025-08-18', description: 'Data da extração (ISO string)' })
  extractionDate?: string;

  @ApiPropertyOptional({ example: '2025-08-19', description: 'Data da coleta (ISO string)' })
  collectionDate?: string;

  @ApiPropertyOptional({ enum: ['CAP 30/45', 'CAP 50/70', 'CAP 85/100', 'CAP 150/200'], description: 'Classificação CAP' })
  classification_CAP?: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200';

  @ApiPropertyOptional({ enum: ['AMP 50/65', 'AMP 55/75', 'AMP 60/85', 'AMP 65/90'], description: 'Classificação AMP' })
  classification_AMP?: 'AMP 50/65' | 'AMP 55/75' | 'AMP 60/85' | 'AMP 65/90';

  @ApiPropertyOptional({ example: 'Material em boas condições', description: 'Observações gerais' })
  observation?: string;
}

export class CreateAsphaltMaterialDto {
  @ApiProperty({ example: 'Brita 1', description: 'Nome do material' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
    description: 'Tipo do material',
    example: 'coarseAggregate',
  })
  type: 'coarseAggregate' | 'fineAggregate' | 'filler' | 'asphaltBinder' | 'CAP' | 'other';

  @ApiPropertyOptional({ type: () => DescriptionDto, description: 'Informações adicionais do material' })
  description?: DescriptionDto;
}


/*import { IsNotEmpty } from 'class-validator';
import { Sieve } from '../../../../utils/interfaces';

export class CreateAsphaltMaterialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  type: 'coarseAggregate' | 'fineAggregate' | 'filler' | 'asphaltBinder' | 'CAP' | 'other';
  description?: {
    source?: string;
    responsible?: string;
    maxDiameter?: Sieve;
    aggregateNature?: string;
    boughtDate?: string;
    recieveDate?: string;
    extractionDate?: string;
    collectionDate?: string;
    classification_CAP?: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200'; // for CAP
    classification_AMP?: 'AMP 50/65' | 'AMP 55/75' | 'AMP 60/85' | 'AMP 65/90'; // for AMP
    observation?: string;
  };
}*/
