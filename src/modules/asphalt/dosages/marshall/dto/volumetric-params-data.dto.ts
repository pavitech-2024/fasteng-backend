import { ApiProperty } from '@nestjs/swagger';

export class PointDTO {
  @ApiProperty({ example: 0.5 })
  x: number;

  @ApiProperty({ example: 0.65 })
  y: number;
}

export class VolumetricValuesDTO {
  @ApiProperty({ example: 12.5 })
  aggregateVolumeVoids: number;

  @ApiProperty({ example: 2.45 })
  apparentBulkSpecificGravity: number;

  @ApiProperty({ example: 350 })
  diametricalCompressionStrength: number;

  @ApiProperty({ example: 30 })
  fluency: number;

  @ApiProperty({ example: 2.42 })
  maxSpecificGravity: number;

  @ApiProperty({ example: 0.04 })
  ratioBitumenVoid: number;

  @ApiProperty({ example: 55 })
  stability: number;

  @ApiProperty({ example: 60 })
  voidsFilledAsphalt: number;

  @ApiProperty({ example: 8 })
  volumeVoids: number;
}

export class VolumetricParameterDTO {
  @ApiProperty({ example: 5.5 })
  asphaltContent: number;

  @ApiProperty({ type: VolumetricValuesDTO })
  values: VolumetricValuesDTO;
}

export class VolumetricParametersDataDTO {
  @ApiProperty({ type: [PointDTO] })
  pointsOfCurveDosageRBV: PointDTO[];

  @ApiProperty({ type: [PointDTO] })
  pointsOfCurveDosageVv: PointDTO[];

  @ApiProperty({ type: [VolumetricParameterDTO] })
  volumetricParameters: VolumetricParameterDTO[];
}
