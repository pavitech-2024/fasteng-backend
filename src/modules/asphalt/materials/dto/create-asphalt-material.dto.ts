import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Sieve } from '../../../../utils/interfaces';

export class CreateAsphaltMaterialDto {
  @ApiProperty({
    description: 'Nome do material',
    example: 'Brita 1',
  })
  @IsNotEmpty()
  name: string;
  //userId: any;

  @ApiProperty({
    description: 'Tipo do material',
    enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
    example: 'coarseAggregate',
  })
  type: 'coarseAggregate' | 'fineAggregate' | 'filler' | 'asphaltBinder' | 'CAP' | 'other';

  @ApiPropertyOptional({
    description: 'Informações adicionais sobre o material',
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
    observation?: string;
  };
  _id: unknown;
  userId: any;
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
