import { MarshallDocument } from '../schemas';
import { MarshallRepository } from '../repository';
import { Model } from 'mongoose';
import { MaterialsRepository } from '../../../materials/repository';
import { SpecifyMassRepository } from '../../../essays/specifyMass/repository';
export declare class MaximumMixtureDensity_Marshall_Service {
    private marshallModel;
    private readonly marshallRepository;
    private readonly materialsRepository;
    private readonly specificMassRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository, materialsRepository: MaterialsRepository, specificMassRepository: SpecifyMassRepository);
    getIndexesOfMissesSpecificGravity(aggregates: any): Promise<{
        missesSpecificGravity: {
            value: any;
            _id: any;
            name: any;
        }[];
    }>;
    calculateDmtData(body: any): Promise<any>;
    calculateGmmData(body: any): Promise<{
        maxSpecificGravity: {
            result: {
                lessOne: any;
                lessHalf: any;
                normal: any;
                plusHalf: any;
                plusOne: any;
            };
            method: string;
        };
        listOfSpecificGravities: any;
    }>;
    calculateRiceTest(body: any): Promise<any>;
    saveMistureMaximumDensityData(body: any, userId: string): Promise<boolean>;
}
