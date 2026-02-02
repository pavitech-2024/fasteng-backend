import { MarshallDocument } from '../schemas';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
export declare class OptimumBinderContent_Marshall_Service {
    private marshallModel;
    private readonly marshallRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository);
    setOptimumBinderContentData(body: any): Promise<{
        rbv: string[][];
        vv: string[][];
        sg: string[][];
        gmb: string[][];
        stability: string[][];
        vam: string[][];
    }>;
    plotDosageGraph(dnitBands: string, volumetricParameters: any, binderTrial: any, percentsOfDosage: number[]): Promise<{
        pointsOfCurveDosage: any[];
        optimumContent: number;
        confirmedPercentsOfDosage: any;
        curveRBV: {
            a: any;
            b: any;
        };
        curveVv: {
            a: any;
            b: any;
        };
    }>;
    confirmPercentsOfDosage(percentageInputs: any[], optimumContent: number): Promise<any>;
    getExpectedParameters(body: any): Promise<{
        Vv: any;
        RBV: any;
        Vam: number;
        Gmb: number;
        newMaxSpecificGravity: any;
    }>;
    calculateContentVv(y: number, curveVv: any): number;
    calculateContentRBV(y: number, curveRBV: any): number;
    calculateVv(x: number, curveVv: any): any;
    calculateRBV(x: number, curveRBV: any): any;
    calculateEquationVv(data: any[]): {
        a: any;
        b: any;
    };
    calculateEquationRBV(data: any[]): {
        a: any;
        b: any;
    };
    calculateEquation(data: any[]): {
        a: number;
        b: number;
    };
    calculateVv4(x1: number, y1: number, x2: number, y2: number): number;
    private sumXY;
    private sumX;
    private sumY;
    private sumPow2X;
    private Pow2SumX;
    private yBar;
    private xBar;
    saveStep7Data(body: any, userId: string): Promise<boolean>;
}
