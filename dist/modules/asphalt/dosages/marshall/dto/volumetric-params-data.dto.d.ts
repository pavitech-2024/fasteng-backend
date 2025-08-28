export declare class PointDTO {
    x: number;
    y: number;
}
export declare class VolumetricValuesDTO {
    aggregateVolumeVoids: number;
    apparentBulkSpecificGravity: number;
    diametricalCompressionStrength: number;
    fluency: number;
    maxSpecificGravity: number;
    ratioBitumenVoid: number;
    stability: number;
    voidsFilledAsphalt: number;
    volumeVoids: number;
}
export declare class VolumetricParameterDTO {
    asphaltContent: number;
    values: VolumetricValuesDTO;
}
export declare class VolumetricParametersDataDTO {
    name?: string;
    pointsOfCurveDosageRBV: PointDTO[];
    pointsOfCurveDosageVv: PointDTO[];
    volumetricParameters: VolumetricParameterDTO[];
}
export declare class SaveVolumetricParametersResponseDTO {
    success: boolean;
    message: string;
    step: number;
}
export declare class SaveVolumetricParametersRequestDTO {
    volumetricParametersData: VolumetricParametersDataDTO;
}
