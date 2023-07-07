import { Injectable, Logger } from '@nestjs/common';
import { Calc_HRB_Dto, Calc_HRB_Out } from '../dto/calc.hrb.dto';
import hrb_classifications, { Hrb_Classification } from '../utils/hrb-classifications';

@Injectable()
export class Calc_HRB_Service {
  private logger = new Logger(Calc_HRB_Service.name);

  // peguei daqui oh: http://www.cct.udesc.br/arquivos/id_submenu/1470/classificacao___rodoviaria___hrb.pdf
  calculateHrb = async ({ step2Data }: Calc_HRB_Dto): Promise<{ success: boolean; result: Calc_HRB_Out }> => {
    try {
      this.logger.log('calculate hrb on calc.hrb.service.ts > [body]');

      const classifications: Hrb_Classification[] = hrb_classifications;
      const { tableData, liquidity_limit, plasticity_limit } = step2Data;

      const plasticity_index = liquidity_limit - plasticity_limit;

      const group_index = this.calculate_group_index({
        liquidity_limit,
        sieve200: tableData[2].percent_passant,
        plasticity_index,
      });

      // Encontra o primeiro elemento que satisfaz as condições
      let hrb_classification = classifications.find((classification) =>
        ['sieve10', 'sieve40', 'sieve200', 'liquidity_limit', 'plasticity_index', 'group_index'].every((field) =>
          classification.validateParams(field, {
            sieve10: tableData[0].percent_passant,
            sieve40: tableData[1].percent_passant,
            sieve200: tableData[2].percent_passant,
            liquidity_limit: liquidity_limit as number,
            plasticity_index,
            group_index,
          }),
        ),
      );

      // para os a-7 precisa fazer verificação especial
      if (hrb_classification.code === 'A-7-5' && plasticity_index > liquidity_limit - 30)
        hrb_classification = classifications[classifications.length - 1];

      const classification = hrb_classification.code;

      return {
        success: true,
        result: {
          classification,
          plasticity_index,
          group_index,
        },
      };
    } catch (error) {
      throw error;
    }
  };

  // see http://www.cct.udesc.br/arquivos/id_submenu/1470/classificacao___rodoviaria___hrb.pdf
  calculate_group_index = ({ liquidity_limit, sieve200, plasticity_index }): number => {
    const p = sieve200;
    const a = p > 75 ? 75 - 35 : p < 35 ? 35 - 35 : p - 35;
    const b = p > 55 ? 55 - 15 : p < 15 ? 15 - 15 : p - 15;
    const c = liquidity_limit > 60 ? 60 - 40 : liquidity_limit < 40 ? 40 - 40 : liquidity_limit - 40;
    const d = plasticity_index > 30 ? 30 - 10 : plasticity_index < 10 ? 10 - 10 : plasticity_index - 10;

    return Math.ceil(0.2 * a + 0.005 * a * c + 0.01 * b * d);
  };
}
