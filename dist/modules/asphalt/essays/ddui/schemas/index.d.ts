import { HydratedDocument } from "mongoose";
import { Calc_Ddui_Out } from "../dto/calc-ddui.dto";
export type DduiDocument = HydratedDocument<Ddui>;
export type DduiGeneralData = {
    userId: string;
    name: string;
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
    _id?: string;
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
