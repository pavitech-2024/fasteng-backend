import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { SuperpaveDocument } from '../schemas';
export declare class ResumeDosage_Superpave_Service {
    private superpaveModel;
    private readonly superpave_repository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpave_repository: SuperpaveRepository);
    riceTest(massOfDrySample: any, containerSampleWaterMass: any, containerWaterMass: any, temperatureOfWater?: number): number;
    calculateStep9RiceTest(body: any): any;
    calculateVolumetricParametersOfConfirmGranulometryComposition(body: any): {
        ponderatedPercentsOfDosage: any;
        samplesData: any;
        Gmb: any;
        Vv: any;
        Gmm: number;
        percentWaterAbs: any;
        specifiesMass: any;
        Vam: any;
        RBV: any;
        quantitative: any;
        diametralTractionResistance: any;
        ratioDustAsphalt: any;
    };
    calculateGmb3(data: any): number;
    calculateGmbCP(data: any): any;
    calculateGmb2(data: any): number;
    percentageWaterAbsorbed(data: any): number;
    calculateMassMedia(data: any): number[];
    saveStep11Data(body: any, userId: string): Promise<boolean>;
    saveSuperpaveDosage(body: any, userId: string): Promise<boolean>;
}
