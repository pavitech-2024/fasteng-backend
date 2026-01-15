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
            value: number;
            _id: string;
            name: string;
            materialType: "coarseAggregate" | "fineAggregate" | "filler" | "asphaltBinder" | "CAP" | "other";
            hasRealData: boolean;
            status: string;
        }[];
        summary: {
            totalAggregates: number;
            foundInDb: number;
            hasRealData: number;
        };
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
        listOfSpecificGravities: number[];
    }>;
    private getSpecificGravitiesFromDatabase;
    calculateRiceTest(body: any): Promise<any>;
    saveMistureMaximumDensityData(body: any, userId: string): Promise<boolean>;
}
