import { PointDTO, VolumetricParameterDTO } from './volumetric-params-data.dto';
export declare class ConfirmedSpecificGravityDTO {
    result: number;
    type: string;
}
export declare class ConfirmationVolumetricParameterDTO extends VolumetricParameterDTO {
}
export declare class ConfirmationVolumetricParametersDTO {
    pointsOfCurveDosageRBV: PointDTO[];
    pointsOfCurveDosageVv: PointDTO[];
    volumetricParameters: ConfirmationVolumetricParameterDTO[];
}
export declare class OptimumBinderConfirmationDTO {
    id: number;
    diammeter: number;
    height: number;
    dryMass: number;
    submergedMass: number;
    drySurfaceSaturatedMass: number;
    stability: number;
    fluency: number;
    diametricalCompressionStrength: number;
}
export declare class RiceTestDTO {
    teor: string;
    massOfDrySample: number;
    massOfContainerWaterSample: number;
    massOfContainerWater: number;
}
export declare class ConfirmationCompressionDataDTO {
    dmt: number;
    name: string;
    gmm: number;
    confirmedSpecificGravity: ConfirmedSpecificGravityDTO;
    confirmedVolumetricParameters: ConfirmationVolumetricParametersDTO;
    optimumBinder: OptimumBinderConfirmationDTO[];
    riceTest: RiceTestDTO;
}
