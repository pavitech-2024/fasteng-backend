export type VolumetricParametersData = {
  pointsOfCurveDosageRBV: { x: number; y: number }[];
  pointsOfCurveDosageVv: { x: number; y: number }[];
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
