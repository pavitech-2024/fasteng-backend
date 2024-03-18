import { Injectable, Logger } from '@nestjs/common';
import { CbrRepository } from '../repository';
import { SamplesRepository } from '../../../samples/repository';
import { Calc_CBR_Dto, Calc_CBR_Out } from '../dto/calc.cbr.dto';

@Injectable()
export class Calc_CBR_Service {
  private logger = new Logger(Calc_CBR_Service.name);

  constructor(private readonly cbrRepository: CbrRepository, private readonly sampleRepository: SamplesRepository) {}

  async calculateCbr({ step2Data, expansionData }: Calc_CBR_Dto): Promise<{ success: boolean; result: Calc_CBR_Out }> {
    try {
      this.logger.log('calculate cbr on calc.cbr.service.ts > [body]');

      const { ring_constant, cylinder_height, extended_reads } = step2Data;

      const deflectometer_reads = expansionData.map(({ deflectometer_read }) => deflectometer_read);

      const cbrs: {
        2: number | null;
        4: number | null;
        6: number | null;
        8: number | null;
        10: number | null;
      } = {
        2: null,
        4: null,
        6: null,
        8: null,
        10: null,
      };

      const measured_pressure = extended_reads.map(({ extended_read }) => extended_read * ring_constant);

      measured_pressure.map((pressure, index) => {
        if (index === 3) pressure !== 0 ? (cbrs[2] = (pressure / 70.31) * 100) : (cbrs[2] = null);
        if (index === 5) pressure !== 0 ? (cbrs[4] = (pressure / 105.46) * 100) : (cbrs[4] = null);
        if (index === 6) pressure !== 0 ? (cbrs[6] = (pressure / 131.58) * 100) : (cbrs[6] = null);
        if (index === 7) pressure !== 0 ? (cbrs[8] = (pressure / 161.71) * 100) : (cbrs[8] = null);
        if (index === 8) pressure !== 0 ? (cbrs[10] = (pressure / 182.8) * 100) : (cbrs[10] = null);
      });

      const cbr = cbrs[2] > cbrs[4] ? cbrs[2] : cbrs[4];

      const penetrations_pol = extended_reads.map(({ pol }) => pol);

      const cbr_graph = [];

      measured_pressure.forEach((pressure, index) => {
        pressure !== 0 ? cbr_graph.push([Number(penetrations_pol[index]), pressure]) : null;
      });

      const free_expansion = ((deflectometer_reads[1] - deflectometer_reads[0]) / cylinder_height) * 100;

      return {
        success: true,
        result: {
          measured_pressure,
          cbr,
          cbrs,
          cbr_graph,
          free_expansion,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
