import { HydratedDocument } from 'mongoose';
import { Sample } from '../../../samples/schemas';
import { Calc_SUCS_Out } from '../dto/calc.sucs.dto';
export type SucsDocument = HydratedDocument<Sucs>;
export type SucsGeneralData = {
    userId: string;
    name: string;
    sample: Sample;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type sucs_step2Data = {
    cc: number;
    cnu: number;
    liquidity_limit: number;
    plasticity_limit: number;
    sieves: {
        sieve: string;
        passant: number;
    }[];
    organic_matter: boolean;
};
export declare class Sucs {
    _id: string;
    generalData: SucsGeneralData;
    step2Data: sucs_step2Data;
    results: {
        data: Calc_SUCS_Out;
    };
}
export declare const SucsSchema: import("mongoose").Schema<Sucs, import("mongoose").Model<Sucs, any, any, any, import("mongoose").Document<unknown, any, Sucs> & Sucs & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sucs, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Sucs>> & import("mongoose").FlatRecord<Sucs> & Required<{
    _id: string;
}>>;
export {};
