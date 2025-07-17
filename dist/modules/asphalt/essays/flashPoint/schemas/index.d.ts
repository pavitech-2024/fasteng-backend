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
