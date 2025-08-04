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
import { Calc_Ddui_Out } from "../dto/calc-ddui.dto";
export type DduiDocument = HydratedDocument<Ddui>;
export type DduiGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
export type Ddui_Step2 = {
    dnitRange: string;
    sampleVoidVolume: number;
    pressConstant: number;
    pressSpecification: string;
    sampleOrigin: string;
};
export type Ddui_Step3 = {
    ddui_data: {
        sampleName: string;
        condicionamento: string;
        d1: number;
        d2: number;
        d3: number;
        h1: number;
        h2: number;
        h3: number;
        pressReading: number;
    }[];
};
export declare class Ddui {
    _id: string;
    generalData: DduiGeneralData;
    dduiStep2: Ddui_Step2;
    dduiStep3: Ddui_Step3;
    results: {
        data: Calc_Ddui_Out;
    };
}
export declare const DduiSchema: import("mongoose").Schema<Ddui, import("mongoose").Model<Ddui, any, any, any, import("mongoose").Document<unknown, any, Ddui> & Ddui & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ddui, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Ddui>> & import("mongoose").FlatRecord<Ddui> & Required<{
    _id: string;
}>>;
