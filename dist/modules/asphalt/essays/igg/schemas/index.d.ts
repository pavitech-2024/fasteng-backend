import { HydratedDocument } from 'mongoose';
import { Calc_Igg_Out } from '../dto/calc-igg.dto';
export type IggDocument = HydratedDocument<Igg>;
export type IggGeneralData = {
    userId: string;
    name: string;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
export type igg_step2 = {
    work: string;
    section: number;
    initialStake: number;
    initialSide: string;
    finalStake: number;
    finalSide: string;
};
export type igg_step3 = {
    stakes: [];
};
export type igg_step4 = {
    sections: {
        id: number;
        initial: number;
        final: number;
    }[];
};
export type Results = {
    results: {
        data: Calc_Igg_Out;
    };
};
export declare class Igg {
    _id: string;
    generalData: IggGeneralData;
    iggStep2: igg_step2;
    iggStep3: igg_step3;
    iggStep4: igg_step4;
    results: {
        data: Calc_Igg_Out;
    };
}
export declare const IggSchema: import("mongoose").Schema<Igg, import("mongoose").Model<Igg, any, any, any, import("mongoose").Document<unknown, any, Igg> & Igg & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Igg, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Igg>> & import("mongoose").FlatRecord<Igg> & Required<{
    _id: string;
}>>;
