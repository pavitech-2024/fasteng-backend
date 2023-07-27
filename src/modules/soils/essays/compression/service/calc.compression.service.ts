import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CompressionRepository } from '../repository';
import { SamplesRepository } from 'modules/soils/samples/repository';
import { Calc_Compression_Dto, Calc_Compression_Out } from '../dto/calc.compression.dto';
import * as PolynomialRegression from 'ml-regression-polynomial';

@Injectable()
export class Calc_Compression_Service {
  private logger = new Logger(Calc_Compression_Service.name);

  constructor(
    private readonly compressionRepository: CompressionRepository,
    private readonly sampleRepository: SamplesRepository,
  ) {}

  async calculateCompression({
    hygroscopicData,
    humidityDeterminationData,
  }: Calc_Compression_Dto): Promise<{ success: boolean; result: Calc_Compression_Out }> {
    try {
      this.logger.log('calculate compression on calc.compression.service.ts > [body]');

      const {
        hygroscopicTable,
        moldNumber,
        moldVolume,
        moldWeight,
        socketWeight,
        spaceDiscThickness,
        strokesPerLayer,
        layers,
      } = hygroscopicData;

      const { humidityTable } = humidityDeterminationData;

      // Calculos;
      const waterWeight = hygroscopicTable.map(
        (element, i) => element.wetGrossWeightCapsule - element.dryGrossWeight[i],
      );

      const netWeightDrySoil = hygroscopicTable.map((element, i) => element.dryGrossWeight - element.capsule[i]);

      const hygroscopic_moisture =
        waterWeight.reduce((acc, element, i) => (acc = (element * 100) / netWeightDrySoil[i]), 0) / waterWeight.length;

      const wetSoilWeights = hygroscopicTable.map((element) => element.dryGrossWeight - moldWeight);

      const wetSoilDensitys = wetSoilWeights.map((element) => element / moldVolume);

      const waterWeights = hygroscopicTable.map(
        (element, i) => element.wetGrossWeightCapsule - element.dryGrossWeight[i],
      );

      const netWeightsDrySoil = hygroscopicTable.map((element, i) => element.dryGrossWeight - element.capsule[i]);

      const moistures = waterWeights.map((element, i) => (element * 100) / netWeightsDrySoil[i]);

      const drySoilDensitys = wetSoilDensitys.map((element, i) => (element * 10000) / ((moistures[i] + 100) * 100));

      const regression = new PolynomialRegression(moistures, drySoilDensitys, 4);

      const { a_index, b_index } = this.findAB(drySoilDensitys);

      const optimum_moisture = this.bisection(moistures[a_index], moistures[b_index], regression.coefficients);

      const optimumDensity =
        regression.coefficients[0] +
        regression.coefficients[1] * optimum_moisture +
        regression.coefficients[2] * Math.pow(optimum_moisture, 2) +
        regression.coefficients[3] * Math.pow(optimum_moisture, 3) +
        regression.coefficients[4] * Math.pow(optimum_moisture, 4);

      const graph = moistures.map((element, i) => [element, drySoilDensitys[i]]);

      return {
        success: true,
        result: {
          waterWeight,
          netWeightDrySoil,
          hygroscopic_moisture,
          wetSoilWeights,
          wetSoilDensitys,
          waterWeights,
          netWeightsDrySoil,
          moistures,
          drySoilDensitys,
          regression,
          a_index,
          b_index,
          optimum_moisture,
          optimumDensity,
          graph,
          socketWeight,
          spaceDiscThickness,
          strokesPerLayer,
          layers,
          moldNumber,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  private bisection(a: number, b: number, coefficients: number[]): number {
    let x;
    while (b - a > 0.0000001) {
      x = (a + b) / 2;
      const fa =
        4 * coefficients[4] * Math.pow(a, 3) +
        3 * coefficients[3] * Math.pow(a, 2) +
        2 * coefficients[2] * a +
        coefficients[1];
      const fx =
        4 * coefficients[4] * Math.pow(x, 3) +
        3 * coefficients[3] * Math.pow(x, 2) +
        2 * coefficients[2] * x +
        coefficients[1];
      if (fa * fx < 0) b = x;
      else a = x;
    }
    return x;
  }

  private findAB(array: number[]): { a_index: number; b_index: number } {
    let b_index = 0;
    let b = 0;
    array.forEach((element, i) => {
      if (element !== b && element > b) {
        b_index = i;
        b = element;
      }
    });

    let a_index = 0;
    let a = 0;
    array.forEach((element, i) => {
      if (element !== b && element !== a && element > a) {
        a_index = i;
        a = element;
      }
    });

    return { a_index, b_index };
  }
}
