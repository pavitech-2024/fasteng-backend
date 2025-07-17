import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { MarshallDocument } from '../schemas';
import { ViscosityRotationalRepository } from '../../../essays/viscosityRotational/repository';
export declare class SetBinderTrial_Marshall_Service {
    private marshallModel;
    private readonly viscosityRepository;
    private readonly marshallRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, viscosityRepository: ViscosityRotationalRepository, marshallRepository: MarshallRepository);
    calculateInitlaBinderTrial(body: any): Promise<{
        result: {
            bandsOfTemperatures: any;
            percentsOfDosage: any[];
            newPercentOfDosage: any[];
        };
    }>;
    getBandsOfTemperatures(binder: any): Promise<any>;
    saveStep4Data(body: any, userId: string): Promise<boolean>;
}
