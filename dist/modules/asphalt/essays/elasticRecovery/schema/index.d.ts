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
import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_ElasticRecovery_Out } from "../dto/calc-elasticRecovery.dto";
export type ElasticRecoveryDocument = HydratedDocument<ElasticRecovery>;
export type ElasticRecoveryGeneralData = {
    name: string;
    material: Material;
    userId: string;
};
type elasticRecovery_Calc = {
    lengths: {
        id: number;
        stretching_lenght: number;
        juxtaposition_length: number;
    }[];
};
export declare class ElasticRecovery {
    _id: string;
    generalData: ElasticRecoveryGeneralData;
    elasticRecoveryCalc: elasticRecovery_Calc;
    results: {
        data: Calc_ElasticRecovery_Out;
    };
}
export declare const ElasticRecoverySchema: import("mongoose").Schema<ElasticRecovery, import("mongoose").Model<ElasticRecovery, any, any, any, import("mongoose").Document<unknown, any, ElasticRecovery> & ElasticRecovery & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ElasticRecovery, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ElasticRecovery>> & import("mongoose").FlatRecord<ElasticRecovery> & Required<{
    _id: string;
}>>;
export {};
