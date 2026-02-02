import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_SPECIFYMASS_Out } from '../dto/calc.specifyMass.dto';
export type SpecifyMassDocument = HydratedDocument<SpecifyMass>;
export type SpecifyMassGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type SpecifyMass_step2Data = {
    dry_mass: number;
    submerged_mass: number;
    surface_saturated_mass: number;
};
export declare class SpecifyMass {
    _id: string;
    generalData: SpecifyMassGeneralData;
    step2Data: SpecifyMass_step2Data;
    results: {
        data: Calc_SPECIFYMASS_Out;
    };
}
export declare const SpecifyMassSchema: import("mongoose").Schema<SpecifyMass, import("mongoose").Model<SpecifyMass, any, any, any, import("mongoose").Document<unknown, any, SpecifyMass> & SpecifyMass & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SpecifyMass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SpecifyMass>> & import("mongoose").FlatRecord<SpecifyMass> & Required<{
    _id: string;
}>>;
export {};
