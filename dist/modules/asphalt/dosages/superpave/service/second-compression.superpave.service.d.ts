import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { SuperpaveDocument } from '../schemas';
export declare class SecondCompression_Superpave_Service {
    private superpaveModel;
    private readonly superpaveRepository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpaveRepository: SuperpaveRepository);
    calculateStep7RiceTest(sampleAirDryMass: number, containerMassWaterSample: number, containerWaterMass: number, waterTemperatureCorrection: number): any;
    calculateStep7Gmm(gmm: any): any[];
    calculateSecondCompressionData(body: any): Promise<{
        composition: {
            halfLess: {
                projectN: {
                    samplesData: any;
                    gmb: any;
                    percentWaterAbs: any;
                    percentageGmm: any;
                };
                specifiesMass: any;
                gmm: any;
                Vv: any;
                Vam: any;
                expectedPli: any;
                RBV: any;
                ratioDustAsphalt: any;
                indirectTensileStrength: any;
            };
            normal: {
                projectN: {
                    samplesData: any;
                    gmb: any;
                    percentWaterAbs: any;
                    percentageGmm: any;
                };
                specifiesMass: any;
                gmm: any;
                Vv: any;
                Vam: any;
                RBV: any;
                ratioDustAsphalt: any;
                indirectTensileStrength: any;
            };
            halfPlus: {
                projectN: {
                    samplesData: any;
                    gmb: any;
                    percentWaterAbs: any;
                    percentageGmm: any;
                };
                specifiesMass: any;
                gmm: any;
                Vv: any;
                Vam: any;
                RBV: any;
                ratioDustAsphalt: any;
                indirectTensileStrength: any;
            };
            onePlus: {
                projectN: {
                    samplesData: any;
                    gmb: any;
                    percentWaterAbs: any;
                    percentageGmm: any;
                };
                specifiesMass: any;
                gmm: any;
                Vv: any;
                Vam: any;
                RBV: any;
                ratioDustAsphalt: any;
                indirectTensileStrength: any;
            };
        };
        expectedPli: any;
        combinedGsb: any;
        percentsOfDosage: any;
        Gse: any;
        ponderatedPercentsOfDosage: any;
    }>;
    calculateGmb3(data: any): number;
    calculateGmbCP(data: any): any;
    calculateGmb2(data: any): number;
    calculateSpecifiesMass(curve: any): any;
    percentageWaterAbsorbed(data: any): number;
    calculateMassMedia(data: any): number[];
    calculateVv(curve: any): number;
    saveStep9Data(body: any, userId: string): Promise<boolean>;
}
