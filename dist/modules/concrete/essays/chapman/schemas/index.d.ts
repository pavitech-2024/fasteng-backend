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
