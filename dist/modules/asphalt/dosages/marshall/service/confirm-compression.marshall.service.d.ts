import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { MarshallDocument } from '../schemas';
export declare class ConfirmCompression_Marshall_Service {
    private readonly marshallModel;
    private readonly marshallRepository;
    private readonly logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository);
    confirmSpecificGravity(body: any): Promise<{
        result: any;
        type: string;
    }>;
    saveStep8Data(body: any, userId: string): Promise<boolean>;
}
