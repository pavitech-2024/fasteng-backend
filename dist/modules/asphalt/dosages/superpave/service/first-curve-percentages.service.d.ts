import { SuperpaveRepository } from '../repository';
import { Model } from 'mongoose';
import { SuperpaveDocument } from '../schemas';
export declare class FirstCurvePercentages_Service {
    private superpaveModel;
    private readonly superpave_repository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpave_repository: SuperpaveRepository);
    getFirstCompressionParametersData(body: any): Promise<{
        table1: {
            trafficVolume: any;
            nominalSize: any;
            expectedPorcentageGmmInitialN: any;
            expectedPorcentageGmmProjectN: any;
            expectedPorcentageGmmMaxN: any;
            expectedVam: any;
            expectedRBV_Higher: any;
            expectedRBV_Lower: any;
        };
        table2: {
            table2Lower: {
                percentageGmmInitialN: {};
                percentageGmmProjectN: {};
                percentageGmmMaxN: {};
                porcentageVv: {};
                porcentageVam: {};
                specificMass: {};
                percentWaterAbs: {};
                ratioDustAsphalt: {};
            };
            table2Average: {
                percentageGmmInitialN: {};
                percentageGmmProjectN: {};
                percentageGmmMaxN: {};
                porcentageVv: {};
                porcentageVam: {};
                specificMass: {};
                percentWaterAbs: {};
                ratioDustAsphalt: {};
            };
            table2Higher: {
                percentageGmmInitialN: {};
                percentageGmmProjectN: {};
                percentageGmmMaxN: {};
                porcentageVv: {};
                porcentageVam: {};
                specificMass: {};
                percentWaterAbs: {};
                ratioDustAsphalt: {};
            };
        };
        table3: {
            table3Lower: {};
            table3Average: {};
            table3Higher: {};
        };
        table4: {
            table4Lower: {};
            table4Average: {};
            table4Higher: {};
        };
    }>;
    calculateExpectedGmb(data: any): any;
    calculateGmbCP(data: any): any;
    calculateC(data: any, maxNIndex: any): any[];
    calculateExpectedGmb_C(data: any): any[];
    calculatePercentageGmm(curve: any): any;
    calculatePlanilhaVv(data: any): any;
    calculateVcb(curve: any): any;
    calculateVam(data: any): any;
    separateNValues(data: any, nIndex: any): any[];
    calculateAveragePercentageGmm(data: any): number;
    calculateAverageVAM(data: any): number;
    calculateGmb2(data: any): any[];
    calculateRbv(data: any): any;
    percentageWaterAbsorbed(data: any): number;
    calculateMassMedia(data: any): number[];
    calculateVv2(curve: any): number;
    calculateGraphData(data: any): any[];
    savePercentsOfChosenCurveData(body: any, userId: string): Promise<boolean>;
}
