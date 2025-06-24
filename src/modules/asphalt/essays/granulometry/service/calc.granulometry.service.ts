import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../../../materials/repository';
import { getSieveValue } from '../../../../../modules/soils/util/sieves';
import { Calc_AsphaltGranulometry_Dto, Calc_AsphaltGranulometry_Out } from '../dto/asphalt.calc.granulometry.dto';
import { AsphaltGranulometryRepository } from '../repository';
import { AllSievesSuperpaveUpdatedAstm } from 'utils/interfaces';

type limit = { value: number; index: number };

@Injectable()
export class Calc_AsphaltGranulometry_Service {
  private logger = new Logger(Calc_AsphaltGranulometry_Service.name);

  constructor(
    private readonly granulometryRepository: AsphaltGranulometryRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async calculateGranulometry({ step2Data, isSuperpave=true }: Calc_AsphaltGranulometry_Dto): Promise<{ success: boolean; result: Calc_AsphaltGranulometry_Out }> {
    try {
      this.logger.log('calculate asphalt granulometry on calc.granulometry.service.ts > [body]');

      const { table_data, material_mass, bottom } = step2Data;

      const length = table_data.length;

      const accumulated_retained: [string, number][] = []

      const passant: [string, number][] = []
      const retained_porcentage: [string, number][] = []

      const graph_data: [number, number][] = []

      let total_retained = 0;

      let nominal_diameter = 0;
      let nominal_size = 0;

      let fineness_module = 0;

      let nominal_size_flag = true;
      let nominal_diameter_flag = true;

      for (let i = 0; i < length; i++) {

        const label = table_data[i].sieve_label;
        const value = table_data[i].sieve_value;
        const passant_porcentage = table_data[i].passant;
        const retained = table_data[i].retained;

        total_retained += retained;

        passant.push(([label, Math.round(100 * (material_mass - total_retained)) / 100]));

        accumulated_retained.push(([label, Math.round(100 * (100 - passant_porcentage)) / 100]));

        if (i === 0) {
          retained_porcentage.push(accumulated_retained[i]);
        } else {
          retained_porcentage.push(([label, Math.round(100 * (accumulated_retained[i][1] - accumulated_retained[i - 1][1])) / 100]));
        }

        fineness_module += accumulated_retained[i][1]

        if (total_retained >= 5 && nominal_size_flag) {
          nominal_size_flag = false;
          if (total_retained === 5) nominal_size = getSieveValue(label, isSuperpave);
          else {
            if (i === 0) nominal_size = getSieveValue(label, isSuperpave);
            else nominal_size = getSieveValue(table_data[i - 1].sieve_label, isSuperpave);
          }
        }

        if (total_retained > 10 && nominal_diameter_flag) {
          nominal_diameter_flag = false;
          if (i === 1) nominal_diameter = getSieveValue(label, isSuperpave);
          else if (i === 0) nominal_diameter = value;
          else nominal_diameter = getSieveValue(table_data[i - 1].sieve_label, isSuperpave);
        }

        graph_data.push(([value, passant_porcentage]));

      }

      fineness_module = Math.round(100 * fineness_module / 100) / 100;

      total_retained = Math.round(100 * total_retained) / 100;

      const error = Math.round(100 * (material_mass - total_retained - bottom) * 100 / material_mass) / 100;

      const limit_10 = this.getPercentage(10, table_data);
      const limit_30 = this.getPercentage(30, table_data);
      const limit_60 = this.getPercentage(60, table_data);

      const diameter10 = this.getDiameter(table_data, 10, limit_10);
      const diameter30 = this.getDiameter(table_data, 30, limit_30);
      const diameter60 = this.getDiameter(table_data, 60, limit_60);

      const cnu = Math.round(100 * diameter60 / diameter10) / 100;

      const cc = Math.round(100 * Math.pow(diameter30, 2) / (diameter60 * diameter10)) / 100;

      return {
        success: true,
        result: {
          accumulated_retained,
          graph_data,
          passant,
          retained_porcentage,
          total_retained,
          nominal_diameter,
          nominal_size,
          fineness_module,
          cc,
          cnu,
          error,
        }
      };

    } catch (error) {
      this.logger.error(`error on calculate asphalt granulometry > [error]: ${error}`);
      return {
        success: false,
        result: null
      };
    }
  }

//   async calculateGranulometry({ step2Data, isSuperpave = true }: Calc_AsphaltGranulometry_Dto): Promise<{
//     success: boolean;
//     result: {
//       massValues: Calc_AsphaltGranulometry_Out;
//       percentageValues: Calc_AsphaltGranulometry_Out;
//     };
//   }> {
//     try {
//       this.logger.log('Calculando granulometria (ambos os modos)');

//       const { table_data, material_mass, bottom } = step2Data;
//       const length = table_data.length;

//       // Dados comuns
//       const listSieves = table_data.map((d) => d.sieve_value);

//       // MODO MASSA
//       const mass = {
//         accumulated_retained: [],
//         passant: [],
//         retained_porcentage: [],
//         graph_data: [],
//         total_retained: 0,
//         nominal_diameter: 0,
//         nominal_size: 0,
//         fineness_module: 0,
//         cc: 0,
//         cnu: 0,
//         error: 0,
//       };

//       let total_retained_mass = 0;
//       let fm_mass = 0;
//       let flagMassSize = true;
//       let flagMassDiameter = true;

//       for (let i = 0; i < length; i++) {
//         const { sieve_label, sieve_value, retained, passant: passant_percent } = table_data[i];
//         total_retained_mass += retained;

//         const current_passant_mass = Math.round(100 * (material_mass - total_retained_mass)) / 100;
//         mass.passant.push([sieve_label, current_passant_mass]);

//         const current_acc_ret = Math.round(100 * (100 - passant_percent)) / 100;
//         mass.accumulated_retained.push([sieve_label, current_acc_ret]);

//         if (i === 0) {
//           mass.retained_porcentage.push([sieve_label, current_acc_ret]);
//         } else {
//           const diff = Math.round(100 * (current_acc_ret - mass.accumulated_retained[i - 1][1])) / 100;
//           mass.retained_porcentage.push([sieve_label, diff]);
//         }

//         mass.graph_data.push([sieve_value, passant_percent]);

//         fm_mass += current_acc_ret;

//         if (total_retained_mass >= 5 && flagMassSize) {
//           flagMassSize = false;
//           mass.nominal_size = total_retained_mass === 5 || i === 0 ? sieve_value : table_data[i - 1].sieve_value;
//         }

//         if (total_retained_mass > 10 && flagMassDiameter) {
//           flagMassDiameter = false;
//           mass.nominal_diameter = i === 0 ? sieve_value : table_data[i - 1].sieve_value;
//         }
//       }

//       mass.total_retained = Math.round(100 * total_retained_mass) / 100;
//       mass.fineness_module = Math.round(100 * (fm_mass / 100)) / 100;
//       mass.error = Math.round((100 * ((material_mass - mass.total_retained - bottom) * 100)) / material_mass) / 100;

//       // MODO PORCENTAGEM
//       const percentage = {
//         accumulated_retained: [],
//         passant: [],
//         retained_porcentage: [],
//         graph_data: [],
//         total_retained: 0,
//         nominal_diameter: 0,
//         nominal_size: 0,
//         fineness_module: 0,
//         error: 0,
//         cc: 0,
//         cnu: 0,
//       };

//       let total_retained_percentage = 0;
//       let fm_percentage = 0;
//       let acc_ret_mass = 0;
//       let flagPercSize = true;
//       let flagPercDiameter = true;

//       for (let i = 0; i < length; i++) {
//         const { sieve_label, sieve_value, passant: passant_percent } = table_data[i];

//         if (passant_percent !== null) {
//           const retainedPerc = i === 0 ? 100 - passant_percent : table_data[i - 1].passant - passant_percent;

//           const retainedMass = (retainedPerc / 100) * material_mass;

//           acc_ret_mass += retainedMass;
//           total_retained_percentage += retainedMass;

//           const accRetPercent = (acc_ret_mass / material_mass) * 100;

//           percentage.retained_porcentage.push([sieve_label, retainedPerc]);
//           percentage.accumulated_retained.push([sieve_label, accRetPercent]);

//           // Determinar nominal_diameter e nominal_size
//           if (acc_ret_mass >= 0.05 * material_mass && flagPercSize) {
//             flagPercSize = false;
//             percentage.nominal_diameter =
//               acc_ret_mass === 0.05 * material_mass || i === 0 ? sieve_value : table_data[i - 1].sieve_value;
//           }

//           if (acc_ret_mass > 0.1 * material_mass && flagPercDiameter) {
//             flagPercDiameter = false;
//             percentage.nominal_size = i === 0 ? sieve_value : table_data[i - 1].sieve_value;
//           }

//           const passantPercentage = passant_percent;
// percentage.passant.push([sieve_label, passantPercentage]);


//           percentage.graph_data.push([sieve_value, passant_percent]);

//           fm_percentage += 100 - passant_percent;
//         } else {
//           percentage.retained_porcentage.push([sieve_label, null]);
//           percentage.accumulated_retained.push([sieve_label, null]);
//           percentage.passant.push([sieve_label, null]);
//           percentage.graph_data.push([sieve_value, null]);
//         }
//       }

//       percentage.total_retained = Math.round(100 * total_retained_percentage) / 100;
//       percentage.fineness_module = Math.round(100 * (fm_percentage / 100)) / 100;
//       percentage.error =
//         Math.round(100 * (((material_mass - total_retained_percentage - bottom) * 100) / material_mass)) / 100;

//       return {
//         success: true,
//         result: {
//           massValues: mass,
//           percentageValues: percentage,
//         },
//       };
//     } catch (error) {
//       this.logger.error(`Erro ao calcular granulometria: ${error}`);
//       return {
//         success: false,
//         result: null,
//       };
//     }
//   }

  getDiameter = (
    table_data: { sieve_label: string; passant: number; retained: number }[],
    percentage: number,
    limits: { upperLimit: limit; inferiorLimit: limit },
  ) => {
    if (limits.upperLimit.value === percentage) return table_data[limits.upperLimit.index].passant;
    if (limits.inferiorLimit.value === percentage) return table_data[limits.inferiorLimit.index].passant;

    const coefficientA =
      (limits.upperLimit.value - limits.inferiorLimit.value) /
      (table_data[limits.upperLimit.index].passant - table_data[limits.inferiorLimit.index].passant);
    const coefficientB = limits.upperLimit.value / (coefficientA * table_data[limits.upperLimit.index].passant);

    return (percentage - coefficientB) / coefficientA;
  };

  getPercentage = (percentage: number, table_data: { sieve_label: string; passant: number; retained: number }[]) => {
    return table_data.reduce(
      (accumulate, sieve, index) => {
        const { upperLimit, inferiorLimit } = accumulate;

        if (sieve.passant >= percentage) {
          if (upperLimit.value === 0 || sieve.passant < upperLimit.value)
            accumulate.upperLimit = {
              value: sieve.passant,
              index: index,
            };
        } else {
          if (inferiorLimit.value === 0 || sieve.passant > inferiorLimit.value)
            accumulate.inferiorLimit = {
              value: sieve.passant,
              index: index,
            };
        }
        return accumulate;
      },
      {
        upperLimit: {
          value: 0,
          index: 0,
        },
        inferiorLimit: {
          value: 0,
          index: 0,
        },
      },
    );
  };
}
