import { MarshallService } from '../service';
import { MarshallInitDto } from '../dto/marshall-init.dto';
export declare class MarshallController {
    private readonly marshallService;
    private readonly logger;
    constructor(marshallService: MarshallService);
    getAllByUserId(userId: string): Promise<import("../schemas").Marshall[]>;
    verifyInitMarshall(body: MarshallInitDto, userId: string): Promise<{
        success: boolean;
        dosage: any;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getMaterialsByUserId(response: Response, userId: string): Promise<any>;
    getDosageById(response: Response, dosageId: string): Promise<any>;
    saveMaterialSelectionStep(body: any, userId: string): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getStep3Data(body: any): Promise<{
        data: {
            dnitBands: {
                higher: any[];
                lower: any[];
            };
            table_data: {
                table_column_headers: string[];
                table_rows: any[];
            };
            project: any[];
            graphData: any[];
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateStep3Data(response: Response, body: any): Promise<any>;
    saveGranulometryCompositionStep(userId: string, body: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateStep4Data(body: any): Promise<{
        data: {
            percentsOfDosage: any[];
            bandsOfTemperatures: any;
            newPercentOfDosage: any[];
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveBinderTrialStep(userId: string, body: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getIndexesOfMissesSpecificGravity(aggregates: any): Promise<{
        data: {
            missesSpecificGravity: {
                value: any;
                _id: any;
                name: any;
            }[];
        };
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
        data?: undefined;
    }>;
    calculateDmtData(body: any): Promise<{
        data: {
            maxSpecificGravity: any;
            method: any;
            listOfSpecificGravities: any;
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateGmmData(body: any): Promise<{
        data: {
            maxSpecificGravity: {
                lessOne: any;
                lessHalf: any;
                normal: any;
                plusHalf: any;
                plusOne: any;
            };
            method: string;
            listOfSpecificGravities: any;
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateRiceTest(response: Response, body: any): Promise<any>;
    saveMaximumMixtureDensityData(response: Response, userId: string, body: any): Promise<any>;
    setVolumetricParameters(body: any): Promise<{
        data: {
            volumetricParameters: {
                volumetricParameters: any[];
                pointsOfCurveDosageRBV: any[];
                pointsOfCurveDosageVv: any[];
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveVolumetricParametersData(response: Response, userId: string, body: any): Promise<any>;
    setOptimumBinderContentData(body: any): Promise<{
        data: {
            optimumBinder: {
                rbv: string[][];
                vv: string[][];
                sg: string[][];
                gmb: string[][];
                stability: string[][];
                vam: string[][];
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    setOptimumBinderContentDosageGraph(body: any): Promise<{
        data: {
            optimumBinderDosageGraph: {
                pointsOfCurveDosage: any[];
                optimumContent: number;
                confirmedPercentsOfDosage: any;
                curveRBV: {
                    a: any;
                    b: any;
                };
                curveVv: {
                    a: any;
                    b: any;
                };
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getOptimumBinderExpectedParameters(body: any): Promise<{
        data: {
            expectedParameters: {
                Vv: any;
                RBV: any;
                Vam: number;
                Gmb: number;
                newMaxSpecificGravity: any;
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveOptimumBinderContentData(userId: string, body: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    confirmSpecificGravity(body: any): Promise<{
        data: {
            confirmedSpecificGravity: any;
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    confirmVolumetricParameters(body: any): Promise<{
        data: {
            confirmedVolumetricParameters: {
                valuesOfVolumetricParameters: any;
                asphaltContent: any;
                quantitative: any;
                values: {
                    volumeVoids: number;
                    apparentBulkSpecificGravity: number;
                    voidsFilledAsphalt: number;
                    aggregateVolumeVoids: number;
                    ratioBitumenVoid: number;
                    stability: number;
                    fluency: number;
                    indirectTensileStrength: number;
                };
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveConfirmationCompressionData(userId: string, body: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveMarshallDosage(userId: string, body: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    deleteMarshallDosage(id: string): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
}
