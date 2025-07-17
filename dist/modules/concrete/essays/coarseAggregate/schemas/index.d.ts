import { Material } from "../../../materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_CoarseAggregateSpecificMass_Out } from "../dto/calc.coarseAggregateSpecificMass.dto";
export type CoarseAggregateSpecificMassDocument = HydratedDocument<CoarseAggregateSpecificMass>;
export type CoarseAggregateSpecificMassGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type coarseAggregateSpecificMass_step2Data = {
    material_mass: number;
    table_data: {
        sieve: string;
        passant: number;
        retained: number;
    }[];
    bottom: number;
};
export declare class CoarseAggregateSpecificMass {
    _id: string;
    generalData: CoarseAggregateSpecificMassGeneralData;
    step2Data: coarseAggregateSpecificMass_step2Data;
    results: {
        data: Calc_CoarseAggregateSpecificMass_Out;
    };
}
export declare const CoarseAggregateSpecificMassSchema: import("mongoose").Schema<CoarseAggregateSpecificMass, import("mongoose").Model<CoarseAggregateSpecificMass, any, any, any, import("mongoose").Document<unknown, any, CoarseAggregateSpecificMass> & CoarseAggregateSpecificMass & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CoarseAggregateSpecificMass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CoarseAggregateSpecificMass>> & import("mongoose").FlatRecord<CoarseAggregateSpecificMass> & Required<{
    _id: string;
}>>;
export {};
