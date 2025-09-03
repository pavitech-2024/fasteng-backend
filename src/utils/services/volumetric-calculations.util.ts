export class VolumetricCalculationsUtil {
  static calculateSampleVolumes(saturatedMass: number, submergedMass: number): number {
    return saturatedMass - submergedMass;
  }

  static calculateApparentBulkSpecificGravity(dryMass: number, sampleVolumes: number, temperatureOfWater: number): number {
    return (dryMass / sampleVolumes) * temperatureOfWater;
  }

  static calculateVolumeVoids(maxSpecificGravity: number, apparentBulkSpecificGravity: number): number {
    return (maxSpecificGravity - apparentBulkSpecificGravity) / maxSpecificGravity;
  }

  static calculateVoidsFilledAsphalt(apparentBulkSpecificGravity: number, asphaltContent: number): number {
    return (apparentBulkSpecificGravity * asphaltContent) / 102.7;
  }

  static calculateAggregateVolumeVoids(volumeVoids: number, voidsFilledAsphalt: number): number {
    return volumeVoids + voidsFilledAsphalt;
  }

  static calculateRatioBitumenVoid(voidsFilledAsphalt: number, aggregateVolumeVoids: number): number {
    return voidsFilledAsphalt / aggregateVolumeVoids;
  }

  static calculateQuantitative(confirmedSpecificGravity: number, percents: number[], specificGravities: number[]): number[] {
    return percents.map((percent, i) => 
      (confirmedSpecificGravity * percent * 10) / 1000 / specificGravities[i]
    );
  }
}