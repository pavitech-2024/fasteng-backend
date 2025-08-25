import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Sieve } from '../../../../utils/interfaces';

export class CreateConcreteMaterialDto {
  @ApiProperty({
    example: 'Brita 1',
    description: 'Nome do material',
  })
  @IsNotEmpty()
  name: string;
  userId: string;

  @ApiProperty({
    example: 'coarseAggregate',
    description: 'Tipo do material',
    enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
  })
  type:
    | 'coarseAggregate'
    | 'fineAggregate'
    | 'filler'
    | 'asphaltBinder'
    | 'CAP'
    | 'other';

  @ApiPropertyOptional({
    description: 'Descrição detalhada do material',
    example: {
      source: 'Fornecedor XYZ',
      responsible: 'Eng. João Silva',
      maxDiammeter: '4.8mm',
      aggregateNature: 'Granito',
      boughtDate: '2023-05-10',
      recieveDate: '2023-05-12',
      extractionDate: '2023-05-01',
      collectionDate: '2023-04-28',
      classification_CAP: 'CAP 50/70',
      classification_AMP: 'AMP 55/75',
      cementType: 'CP II-F',
      observation: 'Material recebido em boas condições',
    },
  })
  description?: {
    source?: string;
    responsible?: string;
    maxDiammeter?: Sieve;
    aggregateNature?: string;
    boughtDate?: string;
    recieveDate?: string;
    extractionDate?: string;
    collectionDate?: string;
    classification_CAP?: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200';
    classification_AMP?: 'AMP 50/65' | 'AMP 55/75' | 'AMP 60/85' | 'AMP 65/90';
    cementType?:
      | 'CP I'
      | 'CP I-S'
      | 'CP II-E'
      | 'CP II-Z'
      | 'CP II-F'
      | 'CP III'
      | 'CP IV'
      | 'CP V-ARI'
      | 'CP V-ARI RS';
    observation?: string;
  };
}


/*import { IsNotEmpty } from 'class-validator';
import { Sieve } from '../../../../utils/interfaces';

export class CreateConcreteMaterialDto {
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
    maxDiammeter?: Sieve;
    aggregateNature?: string;
    boughtDate?: string;
    recieveDate?: string;
    extractionDate?: string;
    collectionDate?: string;
    classification_CAP?: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200'; // for CAP
    classification_AMP?: 'AMP 50/65' | 'AMP 55/75' | 'AMP 60/85' | 'AMP 65/90'; // for AMP
    cementType?:
    | 'CP I'
    | 'CP I-S'
    | 'CP II-E'
    | 'CP II-Z'
    | 'CP II-F'
    | 'CP III'
    | 'CP IV'
    | 'CP V-ARI'
    | 'CP V-ARI RS'; // for cement
    observation?: string;
  };
}*/
