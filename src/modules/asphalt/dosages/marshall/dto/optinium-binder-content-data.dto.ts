import { ApiProperty } from '@nestjs/swagger';
import { MaxSpecificGravityDTO } from './maximum-mixture-density-data.dto';

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

  @ApiProperty({ type: [[Number]], example: [[4.5, 4.8, 65], [5.0, 4.5, 67]] })
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
  rbv: (string | number)[][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'Vv'], [4.5, 12]] })
  vv: (string | number)[][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'SpecificGravity'], [4.5, 2.45]] })
  sg: (string | number)[][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'Gmb'], [4.5, 2.4]] })
  gmb: (string | number)[][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'Stability'], [4.5, 1200]] })
  stability: (string | number)[][];

  @ApiProperty({ type: [[Number]], example: [['Teor', 'Vam'], [4.5, 7]] })
  vam: (string | number)[][];
}

export class OptimumBinderContentDataDTO {
  @ApiProperty({ type: OptimumBinderDTO })
  optimumBinder: OptimumBinderDTO;

  @ApiProperty({ type: ExpectedParametersDTO })
  expectedParameters: ExpectedParametersDTO;

  @ApiProperty({ type: GraphicsDTO })
  graphics: GraphicsDTO;
}

export class VolumetricParametersDTO {
  @ApiProperty({ type: [[Number]], example: [[4.5, 65], [5.0, 67]] })
  pointsOfCurveDosageRBV: [number, number][];

  @ApiProperty({ type: [[Number]], example: [[4.5, 12], [5.0, 11]] })
  pointsOfCurveDosageVv: [number, number][];
}

export class PlotDosageGraphInputDTO {
  @ApiProperty({ example: 'A' })
  dnitBand: string;

  @ApiProperty({ type: VolumetricParametersDTO })
  volumetricParameters: VolumetricParametersDTO;

  @ApiProperty({ example: 5.0 })
  trial: number;

  @ApiProperty({ type: [Number], example: [15, 20, 25] })
  percentsOfDosage: number[];
}





export class GetExpectedParametersDTO {
  @ApiProperty({
    type: [Object],
    example: [{ percent_1: 5.2, percent_2: 4.8 }],
  })
  percentsOfDosage: Record<string, number>[];

  @ApiProperty({ example: 5.0 })
  optimumContent: number;

  @ApiProperty({ type: MaxSpecificGravityDTO })
  maxSpecificGravity: MaxSpecificGravityDTO;

  @ApiProperty({ type: [Number], example: [2.45, 2.44, 2.43] })
  listOfSpecificGravities: number[];

  @ApiProperty({ example: 4.5 })
  trial: number;

  @ApiProperty({ type: [Number], example: [15, 20, 25] })
  confirmedPercentsOfDosage: number[];

  @ApiProperty({ type: CurveDTO })
  curveVv: CurveDTO;

  @ApiProperty({ type: CurveDTO })
  curveRBV: CurveDTO;
}