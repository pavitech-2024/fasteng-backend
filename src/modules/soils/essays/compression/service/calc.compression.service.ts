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
  ) { }

  async calculateCompression({ calculation }: Calc_Compression_Dto): Promise<{ success: boolean; result: Calc_Compression_Out }> {
    try {
      this.logger.log('calculate compression on calc.compression.service.ts > [body]');

      const {
        capsule,
        capsule_tare,
        wet_gross_weight_capsule,
        dry_gross_weight,
        mold_weight,
        mold_volume,
        wet_gross_weights,
        capsules,
        capsules_tare,
        wet_gross_weights_capsule,
        dry_gross_weights,
        mold_number,
        socket_weight,
        space_disc_thickness,
        strokes_per_layer,
        layers,
      } = calculation;

      // Calculos;
      const water_weight = wet_gross_weight_capsule.map((element, i) => element - dry_gross_weight[i]);
      
      const net_weight_dry_soil = dry_gross_weight.map((element, i) => element - capsule_tare[i]);

      const hygroscopic_moisture = water_weight.reduce((acc, element, i) => (acc = (element * 100) / net_weight_dry_soil[i]), 0) / water_weight.length;

      const wet_soil_weights = wet_gross_weights.map((element) => element - mold_weight);

      const wet_soil_densitys = wet_soil_weights.map((element) => element / mold_volume);

      const water_weights = wet_gross_weights_capsule.map((element, i) => element - dry_gross_weights[i]);

      const net_weights_dry_soil = dry_gross_weights.map((element, i) => element - capsules_tare[i]);

      const moistures = water_weights.map((element, i) => (element * 100) / net_weights_dry_soil[i]);

      const dry_soil_densitys = wet_soil_densitys.map((element, i) => (element * 10000) / ((moistures[i] + 100) * 100));

      const regression = new PolynomialRegression(moistures, dry_soil_densitys, 4);

      const { a_index, b_index } = this.findAB(dry_soil_densitys);

      const optimum_moisture = this.bisection(moistures[a_index], moistures[b_index], regression.coefficients);

      const optimum_density = regression.coefficients[0] +
        (regression.coefficients[1] * optimum_moisture) +
        (regression.coefficients[2] * Math.pow(optimum_moisture, 2)) +
        (regression.coefficients[3] * Math.pow(optimum_moisture, 3)) +
        (regression.coefficients[4] * Math.pow(optimum_moisture, 4));

      const graph = moistures.map((element, i) => [element, dry_soil_densitys[i]])

      return {
        success: true,
        result: {
          water_weight,
          net_weight_dry_soil,
          hygroscopic_moisture,
          wet_soil_weights,
          wet_soil_densitys,
          water_weights,
          net_weights_dry_soil,
          moistures,
          dry_soil_densitys,
          regression,
          a_index,
          b_index,
          optimum_moisture,
          optimum_density,
          graph
        }
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
