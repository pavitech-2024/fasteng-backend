import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { Model } from 'mongoose';
import { MarshallDocument } from '../schemas';
import { MarshallRepository } from '../repository';
export declare class GranulometryComposition_Marshall_Service {
    private marshallModel;
    private readonly granulometry_repository;
    private readonly marshallRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, granulometry_repository: AsphaltGranulometryRepository, marshallRepository: MarshallRepository);
    getGranulometryData(aggregates: {
        _id: string;
        name: string;
    }[]): Promise<{
        table_column_headers: string[];
        table_rows: any[];
    }>;
    calculateGranulometry(body: any): Promise<{
        percentsOfMaterials: any[];
        sumOfPercents: any[];
        pointsOfCurve: any[];
        table_data: any;
        projections: any[];
        bands: {
            lowerBand: any[];
            higherBand: any[];
        };
        dnitBands: {
            higher: any[];
            lower: any[];
        };
        tableWithBands: {
            sieve_label: any;
            projection: any;
            inferior: any;
            superior: any;
        }[];
    }>;
    saveStep3Data(body: any, userId: string): Promise<boolean>;
    insertBlankPointsOnCurve(curve: number[], axisX: number[]): number[];
    findEquationOfCurve(curve: number[], axisX: number[], y2: number, y1: number, x2: number, x1: number, i: number): number[];
}
