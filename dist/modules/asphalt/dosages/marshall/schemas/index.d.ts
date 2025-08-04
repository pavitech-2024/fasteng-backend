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
import { HydratedDocument } from "mongoose";
export type MarshallDocument = HydratedDocument<Marshall>;
export type MarshallGeneralData = {
    userId: string;
    name: string;
    laboratory?: string;
    operator?: string;
    calculist?: string;
    objective: "bearing" | "bonding";
    dnitBand: "A" | "B" | "C";
    description?: string;
};
export type MarshallMaterialData = {
    aggregates: {
        name: string;
        _id: string;
    }[];
    binder: string;
};
export type GranulometryCompositionData = {
    table_data: {
        table_rows: {
            sieve_label: string;
            _id: string;
            total_passant: string;
            passant: string;
        };
    }[];
    percentageInputs: {
        [key: string]: number;
    }[];
    sumOfPercents: number[];
    dnitBands: {
        higher: [string, number][];
        lower: [string, number][];
    };
    pointsOfCurve: any[];
    percentsOfMaterials: any[];
    graphData: any[];
    name: string;
};
export type BinderTrialData = {
    trial: number;
    percentsOfDosage: any[];
    newPercentOfDosage: any[];
    bandsOfTemperatures: {
        machiningTemperatureRange: {
            higher: number;
            average: number;
            lower: number;
        };
        compressionTemperatureRange: {
            higher: number;
            average: number;
            lower: number;
        };
        AggregateTemperatureRange: {
            higher: number;
            average: number;
            lower: number;
        };
    };
};
export type MaximumMixtureDensityData = {
    maxSpecificGravity: {
        result: {
            lessOne: number;
            lessHalf: number;
            normal: number;
            plusHalf: number;
            plusOne: number;
        };
        method: string;
    };
    listOfSpecificGravities: number[];
};
export type VolumetricParametersData = {
    pointsOfCurveDosageRBV: {
        x: number;
        y: number;
    }[];
    pointsOfCurveDosageVv: {
        x: number;
        y: number;
    }[];
    volumetricParameters: {
        asphaltContent: number;
        values: {
            aggregateVolumeVoids: number;
            apparentBulkSpecificGravity: number;
            diametricalCompressionStrength: number;
            fluency: number;
            maxSpecificGravity: number;
            ratioBitumenVoid: number;
            stability: number;
            voidsFilledAsphalt: number;
            volumeVoids: number;
        };
    }[];
};
export type OptimumBinderContentData = {
    optimumBinder: {
        confirmedPercentsOfDosage: number[];
        curveRBV: {
            a: number;
            b: number;
        };
        curveVv: {
            a: number;
            b: number;
        };
        optimumContent: number;
        pointsOfCurveDosage: any[];
    };
    expectedParameters: {
        expectedParameters: {
            Gmb: number;
            RBV: number;
            Vam: number;
            Vv: number;
            newMaxSpecificGravity: number;
        };
    };
    graphics: {
        rbv: any[];
        vv: any[];
        sg: any[];
        gmb: any[];
        stability: any[];
        vam: any[];
    };
};
export type ConfirmationCompressionData = {
    dmt: number;
    gmm: number;
    confirmedSpecificGravity: {
        result: number;
        type: string;
    };
    confirmedVolumetricParameters: {
        pointsOfCurveDosageRBV: {
            x: number;
            y: number;
        }[];
        pointsOfCurveDosageVv: {
            x: number;
            y: number;
        }[];
        volumetricParameters: {
            asphaltContent: number;
            values: {
                aggregateVolumeVoids: number;
                apparentBulkSpecificGravity: number;
                diametricalCompressionStrength: number;
                fluency: number;
                maxSpecificGravity: number;
                ratioBitumenVoid: number;
                stability: number;
                voidsFilledAsphalt: number;
                volumeVoids: number;
            };
        }[];
    };
    optimumBinder: {
        id: number;
        diammeter: number;
        height: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        stability: number;
        fluency: number;
        diametricalCompressionStrength: number;
    }[];
    riceTest: {
        teor: string;
        massOfDrySample: number;
        massOfContainerWaterSample: number;
        massOfContainerWater: number;
    };
};
export declare class Marshall {
    _id: string;
    step: number;
    generalData: MarshallGeneralData;
    materialSelectionData: MarshallMaterialData;
    granulometryCompositionData: GranulometryCompositionData;
    binderTrialData: BinderTrialData;
    maximumMixtureDensityData: MaximumMixtureDensityData;
    volumetricParametersData: VolumetricParametersData;
    optimumBinderContentData: OptimumBinderContentData;
    confirmationCompressionData: ConfirmationCompressionData;
}
declare const MarshallSchema: import("mongoose").Schema<Marshall, import("mongoose").Model<Marshall, any, any, any, import("mongoose").Document<unknown, any, Marshall> & Marshall & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Marshall, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Marshall>> & import("mongoose").FlatRecord<Marshall> & Required<{
    _id: string;
}>>;
export { MarshallSchema };
