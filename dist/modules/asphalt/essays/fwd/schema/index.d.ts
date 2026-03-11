import { HydratedDocument } from 'mongoose';
import { Calc_Fwd_Out } from '../dto/calc-fwd.dto';
export type FwdDocument = HydratedDocument<Fwd>;
export type FwdGeneralData = {
    userId: string;
    name: string;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
export type Fwd_step2 = {
    work: string;
    section: number;
    initialStake: number;
    initialSide: string;
    finalStake: number;
    finalSide: string;
};
export type Fwd_step3 = {
    spreadsheetData: {
        hodometro: number;
        force: number;
        d1: number;
        d2: number;
        d3: number;
        d4: number;
        d5: number;
        d6: number;
        d7: number;
        d8: number;
        d9: number;
        d10: number;
        d11: number;
        d12: number;
        d13: number;
    }[];
};
export type Results = {
    results: {
        data: Calc_Fwd_Out;
    };
};
export declare class Fwd {
    _id: string;
    generalData: FwdGeneralData;
    fwdStep2: Fwd_step2;
    fwdStep3: Fwd_step3;
    results: {
        data: Calc_Fwd_Out;
    };
}
export declare const FwdSchema: import("mongoose").Schema<Fwd, import("mongoose").Model<Fwd, any, any, any, import("mongoose").Document<unknown, any, Fwd> & Fwd & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Fwd, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Fwd>> & import("mongoose").FlatRecord<Fwd> & Required<{
    _id: string;
}>>;
