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
    pointsOfCurveDosageRBV: PointDTO[];
    pointsOfCurveDosageVv: PointDTO[];
    volumetricParameters: VolumetricParameterDTO[];
}
