import { MarshallInitDto } from "../dto/marshall-init.dto";
import { GeneralData_Marshall_Service } from "./general-data.marshall.service";
import { MaterialSelection_Marshall_Service } from "./material-selection.marshall.service";
import { Marshall } from "../schemas";
import { MarshallRepository } from '../repository/index';
import { MarshallStep3Dto } from "../dto/step-3-marshall.dto";
import { GranulometryComposition_Marshall_Service } from "./granulometry-composition.marshall.service";
import { SetBinderTrial_Marshall_Service } from "./initial-binder-trial.service";
import { MaximumMixtureDensity_Marshall_Service } from "./maximumMixtureDensity.service";
import { VolumetricParameters_Marshall_Service } from "./volumetric-parameters.service";
import { OptimumBinderContent_Marshall_Service } from "./optimum-binder.marshall.service";
import { ConfirmCompression_Marshall_Service } from "./confirm-compression.marshall.service";
export declare class MarshallService {
    private readonly marshall_repository;
    private readonly generalData_Service;
    private readonly materialSelection_Service;
    private readonly granulometryComposition_Service;
    private readonly setBinderTrial_Service;
    private readonly maximumMixtureDensity_Service;
    private readonly volumetricParameters_Service;
    private readonly optimumBinder_Service;
    private readonly confirmCompression_Service;
    private logger;
    constructor(marshall_repository: MarshallRepository, generalData_Service: GeneralData_Marshall_Service, materialSelection_Service: MaterialSelection_Marshall_Service, granulometryComposition_Service: GranulometryComposition_Marshall_Service, setBinderTrial_Service: SetBinderTrial_Marshall_Service, maximumMixtureDensity_Service: MaximumMixtureDensity_Marshall_Service, volumetricParameters_Service: VolumetricParameters_Marshall_Service, optimumBinder_Service: OptimumBinderContent_Marshall_Service, confirmCompression_Service: ConfirmCompression_Marshall_Service);
    getAllDosages(userId: string): Promise<Marshall[]>;
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
    getUserMaterials(userId: string): Promise<{
        materials: import("../../../materials/schemas").Material[];
        success: boolean;
        error?: undefined;
    } | {
        materials: any[];
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getDosageById(dosageId: string): Promise<{
        dosage: Marshall;
        success: boolean;
        materials?: undefined;
        error?: undefined;
    } | {
        materials: any[];
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
        dosage?: undefined;
    }>;
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
    getStep3Data(body: MarshallStep3Dto): Promise<{
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
    calculateStep3Data(body: any): Promise<{
        data: {
            percentsOfMaterials: any[];
            sumOfPercents: any[];
            pointsOfCurve: any[];
            table_data: any;
            projections: any[];
            bands: {
                higherBand: any;
                lowerBand: any;
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
    saveStep3Data(body: any, userId: string): Promise<{
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
    saveStep4Data(body: any, userId: string): Promise<{
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
                value: number;
                _id: string;
                name: string;
                materialType: "coarseAggregate" | "fineAggregate" | "filler" | "asphaltBinder" | "CAP" | "other";
                hasRealData: boolean;
                status: string;
            }[];
            summary: {
                totalAggregates: number;
                foundInDb: number;
                hasRealData: number;
            };
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
            listOfSpecificGravities: number[];
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
    calculateRiceTest(body: any): Promise<{
        data: {
            maxSpecificGravity: any;
            method: string;
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
    saveMistureMaximumDensityData(body: any, userId: string): Promise<{
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
    saveVolumetricParametersData(body: any, userId: string): Promise<{
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
    saveStep7Data(body: any, userId: string): Promise<{
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
    saveStep8Data(body: any, userId: string): Promise<{
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
    saveMarshallDosage(body: any, userId: string): Promise<{
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
