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
import { Material } from '../../../materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_CHAPMAN_Out } from '../dto/calc.chapman.dto';
export type ChapmanDocument = HydratedDocument<Chapman>;
export type ChapmanGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type Chapman_step2Data = {
    displaced_volume: number;
};
export declare class Chapman {
    _id: string;
    generalData: ChapmanGeneralData;
    step2Data: Chapman_step2Data;
    results: {
        data: Calc_CHAPMAN_Out;
    };
}
export declare const ChapmanSchema: import("mongoose").Schema<Chapman, import("mongoose").Model<Chapman, any, any, any, import("mongoose").Document<unknown, any, Chapman> & Chapman & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Chapman, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Chapman>> & import("mongoose").FlatRecord<Chapman> & Required<{
    _id: string;
}>>;
export {};
