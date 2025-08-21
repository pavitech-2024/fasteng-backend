import { ApiProperty } from '@nestjs/swagger';

export class CurveDTO {
  @ApiProperty({ example: 0.5 })
  a: number;

  @ApiProperty({ example: 0.2 })
  b: number;
}

export class OptimumBinderDTO {
  @ApiProperty({ type: [Number] })
  confirmedPercentsOfDosage: number[];

  @ApiProperty({ type: CurveDTO })
  curveRBV: CurveDTO;

  @ApiProperty({ type: CurveDTO })
  curveVv: CurveDTO;

  @ApiProperty({ example: 5.3 })
  optimumContent: number;

  @ApiProperty({ type: [Object] })
  pointsOfCurveDosage: any[];
}

export class ExpectedParametersDTO {
  @ApiProperty({ example: 2.4 })
  Gmb: number;

  @ApiProperty({ example: 65 })
  RBV: number;

  @ApiProperty({ example: 7 })
  Vam: number;

  @ApiProperty({ example: 12 })
  Vv: number;

  @ApiProperty({ example: 2.45 })
  newMaxSpecificGravity: number;
}

export class OptimumBinderContentDataDTO {
  @ApiProperty({ type: OptimumBinderDTO })
  optimumBinder: OptimumBinderDTO;

  @ApiProperty({ type: Object })
  expectedParameters: { expectedParameters: ExpectedParametersDTO };

  @ApiProperty({ type: Object })
  graphics: {
    rbv: any[];
    vv: any[];
    sg: any[];
    gmb: any[];
    stability: any[];
    vam: any[];
  };
}
