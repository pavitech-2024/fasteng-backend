import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CompressionRepository } from '../repository';
import { SamplesRepository } from 'modules/soils/samples/repository';
import { Calc_Compression_Dto, Calc_Compression_Out } from '../dto/calc.compression.dto';

@Injectable()
export class Calc_Compression_Service {
  private logger = new Logger(Calc_Compression_Service.name);

  constructor(
    private readonly compressionRepository: CompressionRepository,
    private readonly sampleRepository: SamplesRepository,
  ) {}

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

      return {
        success: true,
        result: {},
      };
    } catch (error) {
      throw error;
    }
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
