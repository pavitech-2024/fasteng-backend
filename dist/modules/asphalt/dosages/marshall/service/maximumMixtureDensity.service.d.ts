import { MarshallDocument } from '../schemas';
import { MarshallRepository } from '../repository';
import { Model } from 'mongoose';
import { MaterialsRepository } from '../../../materials/repository';
import { SpecifyMassRepository } from '../../../essays/specifyMass/repository';
import { GetIndexesOfMissesSpecificGravityDTO } from '../dto/get-indexes-of-misses-specific-gravity.dto';
import { CalculateDmtDataDTO } from '../dto/calculate-dmt-data.dto';
import { CalculateGmmDataDTO } from '../dto/calculate-gmm-data.dto';
import { CalculateRiceTestDTO } from '../dto/calculate-rice-test.dto';
import { SaveMaximumMixtureDensityDataDTO } from '../dto/save-maximum-mixture-density-data.dto';
export declare class MaximumMixtureDensity_Marshall_Service {
    private marshallModel;
    private readonly marshallRepository;
    private readonly materialsRepository;
    private readonly specificMassRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository, materialsRepository: MaterialsRepository, specificMassRepository: SpecifyMassRepository);
    getIndexesOfMissesSpecificGravity(dto: GetIndexesOfMissesSpecificGravityDTO): Promise<{
        missesSpecificGravity: {
            value: number;
            _id: string;
            name: string;
        }[];
    }>;
    calculateDmtData(dto: CalculateDmtDataDTO): Promise<any>;
    calculateGmmData(dto: CalculateGmmDataDTO): Promise<{
        maxSpecificGravity: {
            result: {
                lessOne: number;
                lessHalf: number;
                normal: number;
                plusHalf: number;
                plusOne: number;
            };
            method: string;
        };
        listOfSpecificGravities: any;
    }>;
    calculateRiceTest(dto: CalculateRiceTestDTO): Promise<any>;
    saveMistureMaximumDensityData(dto: SaveMaximumMixtureDensityDataDTO, userId: string): Promise<boolean>;
}
