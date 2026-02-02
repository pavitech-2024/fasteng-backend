import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";
export type SandEquivalentDocument = HydratedDocument<SandEquivalent>;
export type SandEquivalentGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type SandEquivalent_calc = {
    sandLevel: number;
    clayLevel: number;
};
export declare class SandEquivalent {
    _id: string;
    generalData: SandEquivalentGeneralData;
    sandEquivalent: SandEquivalent_calc;
    results: {
        data: Calc_SandEquivalent_Out;
    };
}
export declare const SandEquivalentSchema: import("mongoose").Schema<SandEquivalent, import("mongoose").Model<SandEquivalent, any, any, any, import("mongoose").Document<unknown, any, SandEquivalent> & SandEquivalent & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SandEquivalent, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SandEquivalent>> & import("mongoose").FlatRecord<SandEquivalent> & Required<{
    _id: string;
}>>;
export {};
