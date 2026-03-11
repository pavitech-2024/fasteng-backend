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
