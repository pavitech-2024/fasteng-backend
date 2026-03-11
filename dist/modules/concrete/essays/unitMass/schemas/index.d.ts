import { Material } from '../../../../../modules/asphalt/materials/schemas';
import { HydratedDocument } from 'mongoose';
export type UnitMassDocument = HydratedDocument<UnitMass>;
export type UnitMassGeneralData = {
    userId: string;
    experimentName: string;
    material: Material;
    method: string;
};
type UnitMass_step2Data = {
    containerVolume: number;
    containerWeight: number;
    sampleContainerWeight: number;
};
type UnitMass_Result = {
    result: number;
};
export declare class UnitMass {
    _id: string;
    generalData: UnitMassGeneralData;
    step2Data: UnitMass_step2Data;
    result: {
        result: UnitMass_Result;
    };
}
export declare const UnitMassSchema: import("mongoose").Schema<UnitMass, import("mongoose").Model<UnitMass, any, any, any, import("mongoose").Document<unknown, any, UnitMass> & UnitMass & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UnitMass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UnitMass>> & import("mongoose").FlatRecord<UnitMass> & Required<{
    _id: string;
}>>;
export {};
