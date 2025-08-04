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
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_FLASHPOINT_Out } from '../dto/calc.flashPoint.dto';
export type FlashPointDocument = HydratedDocument<FlashPoint>;
export type FlashPointGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type FlashPoint_step2Data = {
    ignition_temperature: number;
};
export declare class FlashPoint {
    _id: string;
    generalData: FlashPointGeneralData;
    step2Data: FlashPoint_step2Data;
    results: {
        data: Calc_FLASHPOINT_Out;
    };
}
export declare const FlashPointSchema: import("mongoose").Schema<FlashPoint, import("mongoose").Model<FlashPoint, any, any, any, import("mongoose").Document<unknown, any, FlashPoint> & FlashPoint & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FlashPoint, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<FlashPoint>> & import("mongoose").FlatRecord<FlashPoint> & Required<{
    _id: string;
}>>;
export {};
