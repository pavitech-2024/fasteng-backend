import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";
export type AbrasionDocument = HydratedDocument<Abrasion>;
export type AbrasionGeneralData = {
    name: string;
    material: Material;
    userId: string;
};
type abrasion_Calc = {
    initialMass: number;
    finalMass: number;
    graduation: string;
};
export declare class Abrasion {
    _id: string;
    generalData: AbrasionGeneralData;
    abrasionCalc: abrasion_Calc;
    results: {
        data: Calc_Abrasion_Out;
    };
}
export declare const AbrasionSchema: import("mongoose").Schema<Abrasion, import("mongoose").Model<Abrasion, any, any, any, import("mongoose").Document<unknown, any, Abrasion> & Abrasion & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Abrasion, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Abrasion>> & import("mongoose").FlatRecord<Abrasion> & Required<{
    _id: string;
}>>;
export {};
