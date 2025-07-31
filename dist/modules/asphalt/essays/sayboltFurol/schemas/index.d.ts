import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SayboltFurol_Out } from "../dto/calc-sayboltFurol.dto";
export type SayboltFurolDocument = HydratedDocument<SayboltFurol>;
export type SayboltFurolGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type SayboltFurol_calc = {
    viscosityType: string;
    modified: boolean;
    dataPoints: [
        {
            temperature: number;
            viscosity: number;
        }
    ];
};
export declare class SayboltFurol {
    _id: string;
    generalData: SayboltFurolGeneralData;
    sayboltFurol: SayboltFurol_calc;
    results: {
        data: Calc_SayboltFurol_Out;
    };
}
export declare const SayboltFurolSchema: import("mongoose").Schema<SayboltFurol, import("mongoose").Model<SayboltFurol, any, any, any, import("mongoose").Document<unknown, any, SayboltFurol> & SayboltFurol & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SayboltFurol, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SayboltFurol>> & import("mongoose").FlatRecord<SayboltFurol> & Required<{
    _id: string;
}>>;
export {};
