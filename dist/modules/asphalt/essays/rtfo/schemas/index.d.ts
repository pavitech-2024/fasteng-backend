import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";
export type RtfoDocument = HydratedDocument<Rtfo>;
export type RtfoGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type RtfoSamples = {
    sampleWeight: number;
    finalSampleWeight: number;
};
type Rtfo_calc = {
    list: RtfoSamples[];
};
export declare class Rtfo {
    _id: string;
    generalData: RtfoGeneralData;
    rtfo: Rtfo_calc;
    results: {
        data: Calc_Rtfo_Out;
    };
}
export declare const RtfoSchema: import("mongoose").Schema<Rtfo, import("mongoose").Model<Rtfo, any, any, any, import("mongoose").Document<unknown, any, Rtfo> & Rtfo & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Rtfo, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Rtfo>> & import("mongoose").FlatRecord<Rtfo> & Required<{
    _id: string;
}>>;
export {};
