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

  async calculateCompression({
    step2Data,
  }: Calc_Compression_Dto): Promise<{ success: boolean; result: Calc_Compression_Out }> {
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
      } = step2Data;

      // Validações;
      this.validateData(
        step2Data.capsule_tare,
        step2Data.wet_gross_weight_capsule,
        step2Data.dry_gross_weight,
        step2Data.mold_weight,
        step2Data.mold_volume,
        step2Data.wet_gross_weights,
        step2Data.capsules_tare,
        step2Data.wet_gross_weights_capsule,
        step2Data.dry_gross_weights,
        step2Data.capsules,
        step2Data.capsule,
      );

      // Calculos;

      const essay: any = {};
      essay.water_weight = wet_gross_weight_capsule.map((element, i) => element - dry_gross_weight[i]);
      essay.net_weight_dry_soil = dry_gross_weight.map((element, i) => element - capsule_tare[i]);
      essay.hygroscopic_moisture = essay.water_weight.reduce((acc, element, i) => (acc = (element * 100) / essay.net_weight_dry_soil[i]), 0) / essay.water_weight.length;

      essay.wet_soil_weights = wet_gross_weights.map((element) => element - mold_weight);
      essay.wet_soil_densitys = essay.wet_soil_weights.map((element) => element / mold_volume);
      essay.water_weights = wet_gross_weights_capsule.map((element, i) => element - dry_gross_weights[i]);
      essay.net_weights_dry_soil = dry_gross_weights.map((element, i) => element - capsules_tare[i]);
      essay.moistures = essay.water_weights.map((element, i) => (element * 100) / essay.net_weights_dry_soil[i]);
      essay.dry_soil_densitys = essay.wet_soil_densitys.map((element, i) => (element * 10000) / ((essay.moistures[i] + 100) * 100));
      essay.dry_soil_densitys = essay.wet_soil_densitys.map((element, i) => (element * 10000) / ((essay.moistures[i] + 100) * 100));

      const regression = PolynomialRegression(essay.moistures, essay.dry_soil_densitys, 4);

      const { a_index, b_index } = this.findAB(essay.dry_soil_densitys);

      essay.optimum_moisture = this.bisection(essay.moistures[a_index], essay.moistures[b_index], regression.coefficients);
      essay.optimum_density = regression.coefficients[0] +
        (regression.coefficients[1] * essay.optimum_moisture) +
        (regression.coefficients[2] * Math.pow(essay.optimum_moisture, 2)) +
        (regression.coefficients[3] * Math.pow(essay.optimum_moisture, 3)) +
        (regression.coefficients[4] * Math.pow(essay.optimum_moisture, 4));

      essay.graph = essay.moistures.map((element, i) => [element, essay.dry_soil_densitys[i]])

      return {
        success: true,
        result: essay,
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

  private validateData(
    capsule_tare: number[],
    wet_gross_weight_capsule: number[],
    dry_gross_weight: number[],
    mold_weight: number,
    mold_volume: number,
    wet_gross_weights: number[],
    capsules_tare: number[],
    wet_gross_weights_capsule: number[],
    dry_gross_weights: number[],
    capsules: string[],
    capsule: string[],
  ): void {
    // Validações do app antigo
    if (!capsule_tare) throw new BadRequestException('Informe a tara da capsula.');
    if (!wet_gross_weight_capsule) throw new BadRequestException('Informe o peso bruto úmido na capsula.');
    if (!dry_gross_weight) throw new BadRequestException('Informe o peso bruto seco.');

    capsule_tare.forEach((capsule_step_1, i) => {
      if (capsule_step_1 >= dry_gross_weight[i]) {
        if (capsule[i])
          throw new BadRequestException(`Tara da capsula ${capsule[i]} é maior ou igual do que o peso bruto seco.`);
        else
          throw new BadRequestException(
            `Tara da capsula do ${i + 1}º ponto é maior ou igual do que o peso bruto seco.`,
          );
      }
      if (dry_gross_weight[i] >= wet_gross_weight_capsule[i]) {
        if (capsule[i])
          throw new BadRequestException(
            `Peso bruto seco da capsula ${capsule[i]} é maior ou igual do que o peso bruto úmido.`,
          );
        else
          throw new BadRequestException(
            `Peso bruto seco do ${i + 1}º ponto é maior ou igual do que o peso bruto úmido.`,
          );
      }
    });

    if (!mold_weight) throw new BadRequestException('Informe peso do molde.');
    if (!mold_volume) throw new BadRequestException('Informe volume do molde.');
    if (!wet_gross_weights) throw new BadRequestException('Informe os pesos brutos úmidos.');
    if (!capsules_tare) throw new BadRequestException('Informe as taras das capsulas.');
    if (!wet_gross_weights_capsule) throw new BadRequestException('Informe os pesos brutos úmido.');
    if (!dry_gross_weights) throw new BadRequestException('Informe os pesos brutos secos.');

    capsules_tare.forEach((capsule_step_2, i) => {
      if (capsule_step_2 >= dry_gross_weight[i]) {
        if (capsules[i])
          throw new BadRequestException(`Tara da capsula ${capsules[i]} é maior ou igual do que o peso bruto seco.`);
        else
          throw new BadRequestException(
            `Tara da capsula do ${i + 1}º ponto é maior ou igual do que o peso bruto seco.`,
          );
      }
      if (dry_gross_weight[i] >= wet_gross_weight_capsule[i]) {
        if (capsules[i])
          throw new BadRequestException(
            `Peso bruto seco da capsula ${capsules[i]} é maior ou igual do que o peso bruto úmido.`,
          );
        else
          throw new BadRequestException(
            `Peso bruto seco do ${i + 1}º ponto é maior ou igual do que o peso bruto úmido.`,
          );
      }
    });
  }
}
