import { HydratedDocument } from 'mongoose';
import { Sieve } from '../../../../utils/interfaces';
export type MaterialDocument = HydratedDocument<Material>;
export declare class Material {
    _id: string;
    name: string;
    type: 'coarseAggregate' | 'fineAggregate' | 'filler' | 'asphaltBinder' | 'CAP' | 'other';
    userId: string;
    createdAt: Date;
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
        observation?: string;
    };
}
export declare const MaterialSchema: import("mongoose").Schema<Material, import("mongoose").Model<Material, any, any, any, import("mongoose").Document<unknown, any, Material> & Material & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Material, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Material>> & import("mongoose").FlatRecord<Material> & Required<{
    _id: string;
}>>;
