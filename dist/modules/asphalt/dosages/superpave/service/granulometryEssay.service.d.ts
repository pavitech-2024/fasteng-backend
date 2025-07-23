import { SuperpaveDocument } from '../schemas';
import { Model } from 'mongoose';
import { Calc_Superpave_GranulometyEssay_Dto } from '../dto/granulometry-essay.dto';
import { SuperpaveRepository } from '../repository';
type limit = {
    value: number;
    index: number;
};
export declare class GranulometryEssay_Superpave_Service {
    private superpaveModel;
    private readonly superpave_repository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpave_repository: SuperpaveRepository);
    calculateGranulometryEssay(body: Calc_Superpave_GranulometyEssay_Dto): Promise<{
        success: boolean;
        result: {
            accumulated_retained: [string, number][];
            graph_data: [number, number][];
            passant: [string, number][];
            retained_porcentage: [string, number][];
            total_retained: number;
            nominal_diameter: number;
            nominal_size: number;
            fineness_module: number;
            cc: number;
            cnu: number;
            error: number;
        };
    }>;
    getDiameter: (table_data: {
        sieve_label: string;
        passant: number;
        retained: number;
    }[], percentage: number, limits: {
        upperLimit: limit;
        inferiorLimit: limit;
    }) => number;
    getPercentage: (percentage: number, table_data: {
        sieve_label: string;
        passant: number;
        retained: number;
    }[]) => {
        upperLimit: {
            value: number;
            index: number;
        };
        inferiorLimit: {
            value: number;
            index: number;
        };
    };
    saveGranulometryEssay(body: any, userId: string): Promise<boolean>;
}
export {};
