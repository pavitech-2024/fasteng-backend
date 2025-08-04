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
import { Material } from "../../../../../modules/concrete/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SandIncrease_Out } from "../dto/calc.sand-increase.dto";
export type SandIncreaseDocument = HydratedDocument<SandIncrease>;
export type SandIncreaseGeneralData = {
    userId: string;
    name: string;
    material: Material;
    operator?: string;
    calculist?: string;
    description?: string;
};
export type UnitMassTableData = {
    containerWeightSample: number;
    moistureContent: string;
    sample: string;
    unitMass: number;
};
export type MoistureContentTableData = {
    capsuleWeight: number;
    dryGrossWeight: number;
    wetGrossWeight: number;
    sample: string;
    moistureContent: null;
};
export type SandIncreaseUnitMassDeterminationData = {
    containerVolume: number;
    containerWeight: number;
    tableData: UnitMassTableData[];
};
export type SandIncreaseHumidityFoundData = {
    capsuleWeight: number;
    dryGrossWeight: number;
    moistureContent: number;
    wetGrossWeight: number;
    sample: string;
};
export type SandIncreaseResultsData = {
    step: number;
    unitMassDeterminationData: {
        containerVolume: string;
        containerWeight: string;
        containerWeightSample: UnitMassTableData[];
        tableData: UnitMassTableData[];
    };
    humidityFoundData: {
        tableData: MoistureContentTableData[];
    };
    sandIncreaseGeneralData: SandIncreaseGeneralData;
};
export declare class SandIncrease {
    _id: string;
    generalData: SandIncreaseGeneralData;
    unitMassDeterminationData: SandIncreaseUnitMassDeterminationData;
    humidityFoundData: SandIncreaseHumidityFoundData[];
    results: {
        data: Calc_SandIncrease_Out;
    };
}
export declare const SandIncreaseSchema: import("mongoose").Schema<SandIncrease, import("mongoose").Model<SandIncrease, any, any, any, import("mongoose").Document<unknown, any, SandIncrease> & SandIncrease & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SandIncrease, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SandIncrease>> & import("mongoose").FlatRecord<SandIncrease> & Required<{
    _id: string;
}>>;
