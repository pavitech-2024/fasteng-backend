export type ConfirmationCompressionData = {
  dmt: number;
  gmm: number;
  confirmedSpecificGravity: {
    result: number;
    type: string;
  };
  confirmedVolumetricParameters: {
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
