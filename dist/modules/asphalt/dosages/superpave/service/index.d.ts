import { SuperpaveInitDto } from '../dto/superpave-init.dto';
import { GeneralData_Superpave_Service } from './general-data.superpave.service';
import { MaterialSelection_Superpave_Service } from './material-selection.superpave.service';
import { Superpave } from '../schemas';
import { SuperpaveRepository } from '../repository/index';
import { GranulometryComposition_Superpave_Service } from './granulometry-composition.superpave.service';
import { AsphaltGranulometryRepository } from 'modules/asphalt/essays/granulometry/repository';
import { InitialBinder_Superpave_Service } from './initial-binder.superpave.service';
import { FirstCompression_Superpave_Service } from './first-compression.service';
import { FirstCurvePercentages_Service } from './first-curve-percentages.service';
import { ChosenCurvePercentages_Superpave_Service } from './chosen-curves-percentages.service';
import { SecondCompression_Superpave_Service } from './second-compression.superpave.service';
import { SecondCompressionParameters_Superpave_Service } from './second-compression-parameters.service';
import { ResumeDosage_Superpave_Service } from './resume-dosage.service';
import { GranulometryEssay_Superpave_Service } from './granulometry-essay.service';
import { AsphaltGranulometryService } from 'modules/asphalt/essays/granulometry/service';
import { ViscosityRotationalService } from 'modules/asphalt/essays/viscosityRotational/service/viscosityRotational.service';
import { ConfirmCompaction_Superpave_Service } from './confirm-compaction.service';
export declare class SuperpaveService {
    private readonly superpave_repository;
    private readonly generalData_Service;
    private readonly granulometryEssay_Service;
    private readonly materialSelection_Service;
    private readonly granulometryComposition_Service;
    private readonly granulometryRepository;
    private readonly initialBinder_Service;
    private readonly firstCompression_Service;
    private readonly firstCompressionParams_Service;
    private readonly chosenCurvePercentages_Service;
    private readonly secondCompression_Service;
    private readonly secondCompressionParameters_Service;
    private readonly confirmCompaction_Service;
    private readonly resumeDosageEquation_Service;
    private readonly asphaltGranulometry_Service;
    private readonly rotationalViscosity_Service;
    private logger;
    constructor(superpave_repository: SuperpaveRepository, generalData_Service: GeneralData_Superpave_Service, granulometryEssay_Service: GranulometryEssay_Superpave_Service, materialSelection_Service: MaterialSelection_Superpave_Service, granulometryComposition_Service: GranulometryComposition_Superpave_Service, granulometryRepository: AsphaltGranulometryRepository, initialBinder_Service: InitialBinder_Superpave_Service, firstCompression_Service: FirstCompression_Superpave_Service, firstCompressionParams_Service: FirstCurvePercentages_Service, chosenCurvePercentages_Service: ChosenCurvePercentages_Superpave_Service, secondCompression_Service: SecondCompression_Superpave_Service, secondCompressionParameters_Service: SecondCompressionParameters_Superpave_Service, confirmCompaction_Service: ConfirmCompaction_Superpave_Service, resumeDosageEquation_Service: ResumeDosage_Superpave_Service, asphaltGranulometry_Service: AsphaltGranulometryService, rotationalViscosity_Service: ViscosityRotationalService);
    verifyInitSuperpave(body: SuperpaveInitDto, userId: string): Promise<{
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
    getAllDosages(userId: string): Promise<Superpave[]>;
    calculateGranulometryEssayData(body: any): Promise<{
        granulometry: ({
            material: any;
            success: boolean;
            result: import("modules/asphalt/essays/granulometry/dto/asphalt.calc.granulometry.dto").Calc_AsphaltGranulometry_Out;
        } | {
            material: any;
            success: boolean;
            error: {
                status: any;
                message: any;
                name: any;
            };
        })[];
        viscosity: {
            material: any;
            result: {
                success: boolean;
                result: import("../../../essays/viscosityRotational/dto/calc-viscosityRotational.dto").Calc_ViscosityRotational_Out;
            } | {
                success: boolean;
                error: {
                    status: any;
                    message: any;
                    name: any;
                };
            };
        };
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
        granulometry?: undefined;
        viscosity?: undefined;
    }>;
    saveGranulometryEssayData(body: any, userId: string): Promise<boolean | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveGranulometryEssayResults(body: any, userId: string): Promise<boolean | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getDosageById(dosageId: string): Promise<{
        dosage: Superpave;
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
    getGranulometricCompositionData(body: any): Promise<any>;
    insertBlankPointsOnCurve(curve: any, axisX: any): Promise<any[]>;
    findEquationOfCurve(curve: any, axisX: any, y2: any, y1: any, x2: any, x1: any, i: any): Promise<any>;
    calculateGranulometricCompositionData(body: any): Promise<{
        data: {
            lowerComposition: {
                sumOfPercents: any[];
                percentsOfMaterials: any;
            };
            averageComposition: {
                sumOfPercents: any[];
                percentsOfMaterials: any;
            };
            higherComposition: {
                sumOfPercents: any[];
                percentsOfMaterials: any;
            };
            pointsOfCurve: any[];
            nominalSize: any;
            chosenCurves: any;
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
    getFirstCompressionSpecificMasses(body: any): Promise<{
        data: {
            specificMasses: any[];
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
    saveGranulometryCompositionData(body: any, userId: string): Promise<{
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
    calculateStep5Data(body: any): Promise<{
        data: {
            granulometryComposition: {
                combinedGsb: number;
                combinedGsa: number;
                gse: number;
                vla: number;
                tmn: number;
                vle: number;
                mag: number;
                pli: number;
                percentsOfDosageWithBinder: number[];
                curve: string;
            }[];
            turnNumber: {
                initialN: number;
                projectN: number;
                maxN: number;
                tex: string;
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
    calculateGmm_RiceTest(body: any): Promise<{
        data: any;
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
    saveInitialBinderStep(body: any, userId: string): Promise<{
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
    saveFirstCompressionData(body: any, userId: string): Promise<{
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
    getFirstCompressionParametersData(body: any): Promise<{
        data: {
            table1: {
                trafficVolume: any;
                nominalSize: any;
                expectedPorcentageGmmInitialN: any;
                expectedPorcentageGmmProjectN: any;
                expectedPorcentageGmmMaxN: any;
                expectedVam: any;
                expectedRBV_Higher: any;
                expectedRBV_Lower: any;
            };
            table2: {
                table2Lower: {
                    percentageGmmInitialN: {};
                    percentageGmmProjectN: {};
                    percentageGmmMaxN: {};
                    porcentageVv: {};
                    porcentageVam: {};
                    specificMass: {};
                    percentWaterAbs: {};
                    ratioDustAsphalt: {};
                };
                table2Average: {
                    percentageGmmInitialN: {};
                    percentageGmmProjectN: {};
                    percentageGmmMaxN: {};
                    porcentageVv: {};
                    porcentageVam: {};
                    specificMass: {};
                    percentWaterAbs: {};
                    ratioDustAsphalt: {};
                };
                table2Higher: {
                    percentageGmmInitialN: {};
                    percentageGmmProjectN: {};
                    percentageGmmMaxN: {};
                    porcentageVv: {};
                    porcentageVam: {};
                    specificMass: {};
                    percentWaterAbs: {};
                    ratioDustAsphalt: {};
                };
            };
            table3: {
                table3Lower: {};
                table3Average: {};
                table3Higher: {};
            };
            table4: {
                table4Lower: {};
                table4Average: {};
                table4Higher: {};
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
    saveFirstCompressionParamsData(body: any, userId: string): Promise<{
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
    savePercentsOfChosenCurveData(body: any, userId: string): Promise<{
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
    getChosenCurvePercentsData(body: any): Promise<{
        data: {};
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
    calculateSecondCompressionRiceTest(body: any): Promise<{
        data: number;
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
    calculateStep7Gmm(gmmData: any): Promise<{
        data: any[];
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
    calculateSecondCompressionData(body: any): Promise<{
        data: {
            composition: {
                halfLess: {
                    projectN: {
                        samplesData: any;
                        gmb: any;
                        percentWaterAbs: any;
                        percentageGmm: any;
                    };
                    specifiesMass: any;
                    gmm: any;
                    Vv: any;
                    Vam: any;
                    expectedPli: any;
                    RBV: any;
                    ratioDustAsphalt: any;
                    indirectTensileStrength: any;
                };
                normal: {
                    projectN: {
                        samplesData: any;
                        gmb: any;
                        percentWaterAbs: any;
                        percentageGmm: any;
                    };
                    specifiesMass: any;
                    gmm: any;
                    Vv: any;
                    Vam: any;
                    RBV: any;
                    ratioDustAsphalt: any;
                    indirectTensileStrength: any;
                };
                halfPlus: {
                    projectN: {
                        samplesData: any;
                        gmb: any;
                        percentWaterAbs: any;
                        percentageGmm: any;
                    };
                    specifiesMass: any;
                    gmm: any;
                    Vv: any;
                    Vam: any;
                    RBV: any;
                    ratioDustAsphalt: any;
                    indirectTensileStrength: any;
                };
                onePlus: {
                    projectN: {
                        samplesData: any;
                        gmb: any;
                        percentWaterAbs: any;
                        percentageGmm: any;
                    };
                    specifiesMass: any;
                    gmm: any;
                    Vv: any;
                    Vam: any;
                    RBV: any;
                    ratioDustAsphalt: any;
                    indirectTensileStrength: any;
                };
            };
            expectedPli: any;
            combinedGsb: any;
            percentsOfDosage: any;
            Gse: any;
            ponderatedPercentsOfDosage: any;
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
    saveSecondCompressionData(body: any, userId: string): Promise<{
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
    getSecondCompressionPercentageData(body: any): Promise<{
        data: {
            optimumContent: any;
            graphs: {
                graphVv: any[][];
                graphVam: any[][];
                graphGmb: any[][];
                graphGmm: any[][];
                graphRBV: any[][];
                graphPA: any[][];
                graphRT: any[][];
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
    saveSecondCompressionParams(body: any, userId: string): Promise<{
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
    saveConfirmattionCompressionData(body: any, userId: string): Promise<{
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
    calculateStep9RiceTest(body: any): Promise<{
        data: any;
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
    calculateDosageResumeEquation(body: any): Promise<{
        data: {
            ponderatedPercentsOfDosage: any;
            samplesData: any;
            Gmb: any;
            Vv: any;
            Gmm: number;
            percentWaterAbs: any;
            specifiesMass: any;
            Vam: any;
            RBV: any;
            quantitative: any;
            diametralTractionResistance: any;
            ratioDustAsphalt: any;
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
    saveStep11Data(body: any, userId: string): Promise<{
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
    saveSuperpaveDosage(body: any, userId: string): Promise<{
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
    deleteSuperpaveDosage(id: string): Promise<{
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
