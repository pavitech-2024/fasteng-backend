import { Sieve } from '../../../../utils/interfaces';
export declare class CreateConcreteMaterialDto {
    name: string;
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
        classification_CAP?: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200';
        classification_AMP?: 'AMP 50/65' | 'AMP 55/75' | 'AMP 60/85' | 'AMP 65/90';
        cementType?: 'CP I' | 'CP I-S' | 'CP II-E' | 'CP II-Z' | 'CP II-F' | 'CP III' | 'CP IV' | 'CP V-ARI' | 'CP V-ARI RS';
        observation?: string;
    };
}
