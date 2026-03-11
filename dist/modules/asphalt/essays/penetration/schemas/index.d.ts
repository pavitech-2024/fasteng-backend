import { Date, HydratedDocument } from "mongoose";
import { Calc_Penetration_Out } from "../dto/calc.penetration.dto";
import { Material } from "../../../../../modules/asphalt/materials/schemas";
export type PenetrationDocument = HydratedDocument<Penetration>;
export type PenetrationGeneralData = {
    name: string;
    material: Material;
    userId: string;
};
type penetration_Calc = {
    resultMode: boolean;
    experimentDate: Date;
    points: number[];
};
export declare class Penetration {
    _id: string;
    generalData: PenetrationGeneralData;
    penetrationCalc: penetration_Calc;
    results: {
        data: Calc_Penetration_Out;
    };
}
export declare const PenetrationSchema: import("mongoose").Schema<Penetration, import("mongoose").Model<Penetration, any, any, any, import("mongoose").Document<unknown, any, Penetration> & Penetration & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Penetration, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Penetration>> & import("mongoose").FlatRecord<Penetration> & Required<{
    _id: string;
}>>;
export {};
