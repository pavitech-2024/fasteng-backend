/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HydratedDocument } from "mongoose";
import { Calc_Concrete_RT_Out } from "../dto/calc.rt.dto";
export type RtDocument = HydratedDocument<RT>;
export type RtGeneralData = {
    userId: string;
    name: string;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type ConcreteRtSteptep2 = {
    age: number;
    tolerance: number;
    appliedCharge: number;
    supportsDistance: number;
};
type ConcreteRtStep3 = {
    graphImg: {
        name: string;
        src: string;
    };
};
type ConcreteRtStep4 = {
    compressionCharge: number;
    graphImg: {
        name: string;
        src: string;
    };
};
export declare class RT {
    _id: string;
    generalData: RtGeneralData;
    step2Data: ConcreteRtSteptep2;
    step3Data: ConcreteRtStep3;
    step4Data: ConcreteRtStep4;
    results: {
        data: Calc_Concrete_RT_Out;
    };
}
export declare const RTSchema: import("mongoose").Schema<RT, import("mongoose").Model<RT, any, any, any, import("mongoose").Document<unknown, any, RT> & RT & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RT, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RT>> & import("mongoose").FlatRecord<RT> & Required<{
    _id: string;
}>>;
export {};
