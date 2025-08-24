import { SampleData } from './../interfaces/sample-data.interface';
import { MarshallDocument } from '../schemas';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
export declare class VolumetricParameters_Marshall_Service {
    private readonly marshallModel;
    private readonly marshallRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository);
    setVolumetricParameters(body: any): Promise<{
        volumetricParameters: any[];
        pointsOfCurveDosageRBV: any[];
        pointsOfCurveDosageVv: any[];
    }>;
    calculateVolumetricParameters(samplesData: SampleData): Promise<{
        pointsOfCurveDosageVv: any[];
        pointsOfCurveDosageRBV: any[];
        volumetricParameters: any[];
    }>;
    confirmVolumetricParameters(body: any): Promise<{
        valuesOfVolumetricParameters: any;
        asphaltContent: any;
        quantitative: any;
        values: {
            volumeVoids: number;
            apparentBulkSpecificGravity: number;
            voidsFilledAsphalt: number;
            aggregateVolumeVoids: number;
            ratioBitumenVoid: number;
            stability: number;
            fluency: number;
            indirectTensileStrength: number;
        };
    }>;
    temperaturesOfWater(name: string): number | undefined;
    saveVolumetricParametersData(body: any, userId: string): Promise<boolean>;
}
