import { Material } from '../../../../../modules/asphalt/materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';
export type ViscosityRotationalDocument = HydratedDocument<ViscosityRotational>;
export type ViscosityRotationalGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type ViscosityRotational_calc = {
    viscosityType: string;
    dataPoints: {
        id: number;
        temperature: number;
        viscosity: number;
    }[];
};
export declare class ViscosityRotational {
    _id: string;
    generalData: ViscosityRotationalGeneralData;
    viscosityRotational: ViscosityRotational_calc;
    results: {
        data: Calc_ViscosityRotational_Out;
    };
}
export declare const ViscosityRotationalSchema: import("mongoose").Schema<ViscosityRotational, import("mongoose").Model<ViscosityRotational, any, any, any, import("mongoose").Document<unknown, any, ViscosityRotational> & ViscosityRotational & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ViscosityRotational, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ViscosityRotational>> & import("mongoose").FlatRecord<ViscosityRotational> & Required<{
    _id: string;
}>>;
export {};
