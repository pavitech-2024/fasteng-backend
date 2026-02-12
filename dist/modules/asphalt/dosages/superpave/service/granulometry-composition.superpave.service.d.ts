import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { SuperpaveDocument } from '../schemas';
import { SuperpaveRepository } from '../repository';
import { Model } from 'mongoose';
export declare class GranulometryComposition_Superpave_Service {
    private superpaveModel;
    private readonly superpaveRepository;
    private readonly granulometry_repository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpaveRepository: SuperpaveRepository, granulometry_repository: AsphaltGranulometryRepository);
    getGranulometryData(aggregates: {
        _id: string;
        name: string;
    }[]): Promise<{
        table_column_headers: string[];
        table_rows: any[];
    }>;
    calculateGranulometry(body: any): Promise<{
        data: {
            lowerComposition: {
                sumOfPercents: any[];
                percentsOfMaterials: any;
            };
            averageComposition: {
                sumOfPercents: any[];
                percentsOfMaterials: any;
            };
            higherComposition: {
                sumOfPercents: any[];
                percentsOfMaterials: any;
            };
            pointsOfCurve: any[];
            nominalSize: any;
            chosenCurves: any;
        };
        success: boolean;
    }>;
    insertBlankPointsOnCurve(curve: any, axisX: any): any;
    findEquationOfCurve(curve: any, axisX: any, y2: any, y1: any, x2: any, x1: any, i: any): any;
    calculatePercentOfMaterials(materials: any, percentsOfDosage: any, percentsToList: any): {
        sumOfPercents: number[];
        percentsOfMaterials: any[];
    };
    saveGranulometryCompositionData(body: any, userId: string): Promise<boolean>;
    saveStep5Data(body: any, userId: string): Promise<boolean>;
}
