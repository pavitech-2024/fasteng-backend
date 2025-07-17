import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { MarshallDocument } from '../schemas';
export declare class ConfirmCompression_Marshall_Service {
    private marshallModel;
    private readonly marshallRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository);
    confirmSpecificGravity(body: any): Promise<any>;
    saveStep8Data(body: any, userId: string): Promise<boolean>;
}
