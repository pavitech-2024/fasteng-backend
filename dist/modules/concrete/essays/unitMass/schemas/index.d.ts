/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
