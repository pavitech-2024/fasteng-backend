import { SuperpaveInitDto } from '../dto/superpave-init.dto';
import { GeneralData_Superpave_Service } from './general-data.superpave.service';
import { MaterialSelection_Superpave_Service } from './material-selection.superpave.service';
import { Superpave } from '../schemas';
import { SuperpaveRepository } from '../repository/index';
import { SuperpaveStep3Dto } from '../dto/step-3-superpave.dto';
import { GranulometryComposition_Superpave_Service } from './granulometry-composition.superpave.service';
import { AsphaltGranulometryRepository } from 'modules/asphalt/essays/granulometry/repository';
import { InitialBinder_Superpave_Service } from './initial-binder.superpave.service';
import { FirstCompression_Superpave_Service } from './first-compression.service';
import { FirstCurvePercentages_Service } from './first-curve-percentages.service';
import { ChosenCurvePercentages_Superpave_Service } from './chosen-curves-percentages.service';
import { SecondCompression_Superpave_Service } from './second-compression.superpave.service';
import { SecondCompressionParameters_Superpave_Service } from './second-compression-parameters.service';
import { ResumeDosage_Superpave_Service } from './resume-dosage.service';
export declare class SuperpaveService {
    private readonly superpave_repository;
    private readonly generalData_Service;
    private readonly materialSelection_Service;
    private readonly granulometryComposition_Service;
    private readonly granulometryRepository;
    private readonly initialBinder_Service;
    private readonly firstCompression_Service;
    private readonly firstCurvePercentages_Service;
    private readonly chosenCurvePercentages_Service;
    private readonly secondCompression_Service;
    private readonly secondCompressionParameters_Service;
    private readonly resumeDosageEquation_Service;
    private logger;
    constructor(superpave_repository: SuperpaveRepository, generalData_Service: GeneralData_Superpave_Service, materialSelection_Service: MaterialSelection_Superpave_Service, granulometryComposition_Service: GranulometryComposition_Superpave_Service, granulometryRepository: AsphaltGranulometryRepository, initialBinder_Service: InitialBinder_Superpave_Service, firstCompression_Service: FirstCompression_Superpave_Service, firstCurvePercentages_Service: FirstCurvePercentages_Service, chosenCurvePercentages_Service: ChosenCurvePercentages_Superpave_Service, secondCompression_Service: SecondCompression_Superpave_Service, secondCompressionParameters_Service: SecondCompressionParameters_Superpave_Service, resumeDosageEquation_Service: ResumeDosage_Superpave_Service);
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
    saveMaterialSelectionStep(body: any, userId: string): Promise<boolean | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getStep3Data(body: SuperpaveStep3Dto): Promise<{
        data: {
            nominalSize: {
                controlPoints: {
                    lower: any[];
                    higher: any[];
                };
                restrictedZone: {
                    lower: any[];
                    higher: any[];
                };
                curve: any[];
                value: number;
            };
            percentsToList: any[];
            porcentagesPassantsN200: any[];
            bands: {
                letter: string;
                higher: any[];
                lower: any[];
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
    insertBlankPointsOnCurve(curve: any, axisX: any): Promise<any[]>;
    findEquationOfCurve(curve: any, axisX: any, y2: any, y1: any, x2: any, x1: any, i: any): Promise<any>;
    calculateStep3Data(body: any): Promise<{
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
    getStep4SpecificMasses(body: any): Promise<{
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
    getStep4Data(body: any): Promise<{
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
    calculateGmm(body: any): Promise<{
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
    saveStep5Data(body: any, userId: string): Promise<{
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
    getStep6Parameters(body: any): Promise<{
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
    saveStep6Data(body: any, userId: string): Promise<{
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
    getStep7Parameters(body: any): Promise<{
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
    calculateStep7RiceTest(body: any): Promise<{
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
    calculateVolumetricParametersOfChoosenGranulometryComposition(body: any): Promise<{
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
    getStep9Data(body: any): Promise<{
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
    saveStep9Data(body: any, userId: string): Promise<{
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
    calculateVolumetricParametersOfConfirmGranulometryComposition(body: any): Promise<{
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
    saveStep10Data(body: any, userId: string): Promise<{
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
