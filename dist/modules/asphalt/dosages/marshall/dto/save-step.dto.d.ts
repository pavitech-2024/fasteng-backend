import { MarshallStep } from '../types/marshall.types';
import { BandsOfTemperaturesDTO } from './binder-trial-data.dto';
export declare class SaveStepDTO {
    dosageId: string;
    step: MarshallStep;
    data: any;
    userId: string;
}
export declare class SaveStep3DTO {
    dosageId: string;
    data: {
        percentsOfMaterials: any[];
        sumOfPercents: any[];
        pointsOfCurve: any[];
        table_data: any[];
        projections: any[];
        bands: {
            higherBand: any[];
            lowerBand: any[];
        };
    };
}
export declare class SaveStep4DTO {
    dosageId: string;
    data: {
        trial: string;
        percentsOfDosage: any[];
        bandsOfTemperatures: BandsOfTemperaturesDTO[];
        newPercentOfDosage: any[];
    };
}
export declare class SaveStep5DTO {
    dosageId: string;
    data: {
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
}
export declare class SaveStep6DTO {
    dosageId: string;
    data: {
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
}
export declare class SaveStep7DTO {
    dosageId: string;
    data: {
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
}
export declare class SaveStep8DTO {
    dosageId: string;
    data: {
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
}
