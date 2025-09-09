import { ApiProperty } from '@nestjs/swagger';
import { PointDTO, VolumetricParameterDTO } from './volumetric-params-data.dto';
export class ConfirmedSpecificGravityDTO {
  @ApiProperty({ example: 2.42 })
  result: number;

  @ApiProperty({ example: 'normal' })
  type: string;
}

export class ConfirmationVolumetricParameterDTO extends VolumetricParameterDTO {}

export class ConfirmationVolumetricParametersDTO {
  @ApiProperty({ type: [PointDTO] })
  pointsOfCurveDosageRBV: PointDTO[];

  @ApiProperty({ type: [PointDTO] })
  pointsOfCurveDosageVv: PointDTO[];

  @ApiProperty({ type: [ConfirmationVolumetricParameterDTO] })
  volumetricParameters: ConfirmationVolumetricParameterDTO[];
}

export class OptimumBinderConfirmationDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 100 })
  diammeter: number;

  @ApiProperty({ example: 50 })
  height: number;

  @ApiProperty({ example: 200 })
  dryMass: number;

  @ApiProperty({ example: 180 })
  submergedMass: number;

  @ApiProperty({ example: 205 })
  drySurfaceSaturatedMass: number;

  @ApiProperty({ example: 60 })
  stability: number;

  @ApiProperty({ example: 30 })
  fluency: number;

  @ApiProperty({ example: 350 })
  diametricalCompressionStrength: number;
}

export class RiceTestDTO {
  @ApiProperty({ example: '5.5%' })
  teor: string;

  @ApiProperty({ example: 100 })
  massOfDrySample: number;

  @ApiProperty({ example: 120 })
  massOfContainerWaterSample: number;

  @ApiProperty({ example: 50 })
  massOfContainerWater: number;
}

export class ConfirmationCompressionDataDTO {
  @ApiProperty({ example: 2.4 })
  dmt: number;
  @ApiProperty({ example: 'normal' })
  name: string;
//aaa
  @ApiProperty({ example: 2.45 })
  gmm: number;

  @ApiProperty({ type: ConfirmedSpecificGravityDTO })
  confirmedSpecificGravity: ConfirmedSpecificGravityDTO;

  @ApiProperty({ type: ConfirmationVolumetricParametersDTO })
  confirmedVolumetricParameters: ConfirmationVolumetricParametersDTO;

  @ApiProperty({ type: [OptimumBinderConfirmationDTO] })
  optimumBinder: OptimumBinderConfirmationDTO[];

  @ApiProperty({ type: RiceTestDTO })
  riceTest: RiceTestDTO;
}
