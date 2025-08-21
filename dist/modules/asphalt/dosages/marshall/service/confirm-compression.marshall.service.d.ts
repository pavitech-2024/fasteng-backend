import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { MarshallDocument } from '../schemas';
import { ConfirmationCompressionDataDTO } from '../dto/confirmation-compresion-data.dto';
interface ConfirmSpecificGravityBody {
    method: 'DMT' | 'GMM';
    listOfSpecificGravities: number[];
    percentsOfDosage: {
        [key: string]: number;
    }[];
    confirmedPercentsOfDosage: number[];
    optimumContent: number;
    gmm?: number;
    valuesOfSpecificGravity?: {
        massOfDrySample: number;
        massOfContainerWaterSample: number;
        massOfContainerWater: number;
    };
}
export declare class ConfirmCompression_Marshall_Service {
    private readonly marshallRepository;
    private readonly marshallModel;
    private logger;
    constructor(marshallRepository: MarshallRepository, marshallModel: Model<MarshallDocument>);
    confirmSpecificGravity(body: ConfirmSpecificGravityBody): Promise<{
        result: number;
        type: 'DMT' | 'GMM';
    }>;
    saveStep8Data(confirmationCompressionData: ConfirmationCompressionDataDTO, userId: string): Promise<boolean>;
}
export {};
