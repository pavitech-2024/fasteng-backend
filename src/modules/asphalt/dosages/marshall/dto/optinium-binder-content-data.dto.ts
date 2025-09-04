import { ApiProperty } from '@nestjs/swagger';

export class CurveDTO {
  @ApiProperty({ example: 0.5 })
  a: number;

  @ApiProperty({ example: 0.2 })
  b: number;
}

export class OptimumBinderDTO {
  @ApiProperty({ type: [Number], example: [15, 20, 25] })
  confirmedPercentsOfDosage: number[];

  @ApiProperty({ type: CurveDTO })
  curveRBV: CurveDTO;

  @ApiProperty({ type: CurveDTO })
  curveVv: CurveDTO;

  @ApiProperty({ example: 5.3 })
  optimumContent: number;

  @ApiProperty({ type: [[Number]], example: [[4.5, 2.34], [5.0, 2.45]] })
  pointsOfCurveDosage: number[][];
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

export class GraphicsDTO {
  @ApiProperty({ type: [[Number]], example: [['Teor', 'Rbv'], [4.5, 65]] })
  rbv: [string, string] | [number, number][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'Vv'], [4.5, 12]] })
  vv: [string, string] | [number, number][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'SpecificGravity'], [4.5, 2.45]] })
  sg: [string, string] | [number, number][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'Gmb'], [4.5, 2.4]] })
  gmb: [string, string] | [number, number][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'Stability'], [4.5, 1200]] })
  stability: [string, string] | [number, number][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'Vam'], [4.5, 7]] })
  vam: [string, string] | [number, number][];
}

export class OptimumBinderContentDataDTO {
  @ApiProperty({ type: OptimumBinderDTO })
  optimumBinder: OptimumBinderDTO;

  @ApiProperty({
    type: () => ({
      expectedParameters: ExpectedParametersDTO,
    }),
    example: {
      expectedParameters: {
        Gmb: 2.4,
        RBV: 65,
        Vam: 7,
        Vv: 12,
        newMaxSpecificGravity: 2.45,
      },
    },
  })
  expectedParameters: {
    expectedParameters: ExpectedParametersDTO;
  };

  @ApiProperty({ type: GraphicsDTO })
  graphics: GraphicsDTO;
}
