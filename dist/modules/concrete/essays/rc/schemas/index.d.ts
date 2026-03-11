import { Material } from 'modules/concrete/materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';
export type RCDocument = HydratedDocument<RC>;
export type RCGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
export type RC_step2Data = {
    diammeter1: number;
    diammeter2: number;
    height: number;
    age: number;
    tolerance: number;
    maximumStrength: number;
};
type RC_step3Data = {
    rupture: {
        type: string;
        src: string;
    };
    graphImg: {
        name: string;
        src: string;
    };
};
export declare class RC {
    _id: string;
    generalData: RCGeneralData;
    step2Data: RC_step2Data[];
    step3Data: RC_step3Data;
    results: {
        data: Calc_CONCRETERC_Out;
    };
}
export declare const RCSchema: import("mongoose").Schema<RC, import("mongoose").Model<RC, any, any, any, import("mongoose").Document<unknown, any, RC> & RC & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RC, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RC>> & import("mongoose").FlatRecord<RC> & Required<{
    _id: string;
}>>;
export {};
