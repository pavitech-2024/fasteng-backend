import { IsNotEmpty } from 'class-validator';
import { Sieve } from '../../../../utils/interfaces';

export class CreateAsphaltMaterialDto {
  @IsNotEmpty()
  name: string;

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
    observation?: string;
  };
}
