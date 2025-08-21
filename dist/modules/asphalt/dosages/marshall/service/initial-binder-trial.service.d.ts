import { BandsOfTemperaturesDTO } from './../dto/binder-trial-data.dto';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { MarshallDocument } from '../schemas';
import { ViscosityRotationalRepository } from '../../../essays/viscosityRotational/repository';
import { CalculateBinderTrialInput, SaveStep4Body, TrialItem } from '../types/marshall.types';
export declare class SetBinderTrial_Marshall_Service {
    private readonly marshallModel;
    private readonly viscosityRepository;
    private readonly marshallRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, viscosityRepository: ViscosityRotationalRepository, marshallRepository: MarshallRepository);
    calculateInitialBinderTrial(body: CalculateBinderTrialInput): Promise<{
        result: {
            bandsOfTemperatures: BandsOfTemperaturesDTO;
            percentsOfDosage: TrialItem[][];
            newPercentOfDosage: number[][];
        };
    }>;
    getBandsOfTemperatures(binderId: string): Promise<BandsOfTemperaturesDTO>;
    saveStep4Data(body: SaveStep4Body, userId: string): Promise<boolean>;
}
