import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../../../materials/repository';
import { getSieveValue } from '../../../../../modules/soils/util/sieves';
import { Calc_AsphaltGranulometry_Dto, Calc_AsphaltGranulometry_Out } from '../dto/asphalt.calc.granulometry.dto';
import { AsphaltGranulometryRepository } from '../repository';

type limit = { value: number; index: number };

@Injectable()
export class Calc_AsphaltGranulometry_Service {
  private logger = new Logger(Calc_AsphaltGranulometry_Service.name);

  constructor(
    private readonly granulometryRepository: AsphaltGranulometryRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  /**
   * Calculates the granulometry for asphalt materials.
   *
   * @param step2Data - Contains the table data, material mass, and bottom value for the calculation.
   * @param isSuperpave - Indicates whether the method should consider Superpave specifications (default is true).
   *
   * @returns A promise that resolves to an object containing:
   * - success: A boolean indicating whether the calculation was successful.
   * - result: An object with detailed granulometry results including accumulated retained, graph data, passant, retained percentage,
   *   passant percentage, total retained, nominal diameter, nominal size, fineness module, coefficient of curvature (cc),
   *   uniformity coefficient (cnu), and error.
   *
   * The function calculates the accumulated retained percentage, passant percentage, and retained percentage for each sieve.
   * It determines the nominal diameter and size based on the retained material. The fineness module is computed as well.
   * The function also calculates the coefficients of curvature and uniformity based on specified sieve limits.
   * Errors are logged if the calculation fails.
   */

  async calculateGranulometry({
    step2Data,
    isSuperpave = true,
  }: Calc_AsphaltGranulometry_Dto): Promise<{ success: boolean; result: Calc_AsphaltGranulometry_Out }> {
    try {
      this.logger.log(
        `calculate asphalt granulometry on calc.granulometry.service.ts > [${
          isSuperpave ? 'Superpave' : 'Granulometry'
        }] [${step2Data}]`,
      );

      const { table_data, material_mass, bottom } = step2Data;
      const length = table_data.length;
      const accumulated_retained: [string, number][] = [];
      const passant: [string, number][] = [];
      const retained_porcentage: [string, number][] = [];
      const passant_porcentage: [string, number][] = [];
      const graph_data: [number, number][] = [];

      let total_retained = 0;
      let nominal_diameter = 0;
      let nominal_size = 0;
      let fineness_module = 0;
      let nominal_size_flag = true;

      // Loop principal para cálculos básicos
      for (let i = 0; i < length; i++) {
        const label = table_data[i].sieve_label;
        const value = table_data[i].sieve_value;
        passant_porcentage.push([table_data[i].sieve_label, table_data[i].passant]);
        const retained = table_data[i].retained;

        total_retained += retained;

        passant.push([label, Math.round(100 * (material_mass - total_retained)) / 100]);

        accumulated_retained.push([label, Math.round(100 * (100 - passant_porcentage[i][1])) / 100]);

        if (i === 0) {
          retained_porcentage.push(accumulated_retained[i]);
        } else {
          retained_porcentage.push([
            label,
            Math.round(100 * (accumulated_retained[i][1] - accumulated_retained[i - 1][1])) / 100,
          ]);
        }

        fineness_module += accumulated_retained[i][1];

        // ✅ 3.2 TAMANHO NOMINAL MÁXIMO (TNM)
        // "Peneira imediatamente acima daquela que retém mais que 10% acumulado 
        // OU da que passa menos que 90% dos grãos"
        if (nominal_size_flag && (accumulated_retained[i][1] > 10 || table_data[i].passant < 90)) {
          nominal_size_flag = false;
          if (i > 0) {
            nominal_size = getSieveValue(table_data[i - 1].sieve_label, isSuperpave);
          } else {
            nominal_size = getSieveValue(label, isSuperpave);
          }
          console.log(
            `🎯 TNM calculado: ${nominal_size}mm (peneira acima de ${label} - Retido: ${accumulated_retained[i][1]}%, Passante: ${table_data[i].passant}%)`,
          );
        }

        graph_data.push([value, passant_porcentage[i][1]]);
      }

      //3.1 DIMENSÃO MÁXIMA
      // "Menor abertura das peneira através da quall vai passar 100% dos grãos"
      let max_dimension_found = false;
      for (let i = length - 1; i >= 0; i--) { 
        if (table_data[i].passant === 100) {
          nominal_diameter = getSieveValue(table_data[i].sieve_label, isSuperpave);
          max_dimension_found = true;
          console.log(`📏 Dimensão Máxima: ${nominal_diameter}mm (${table_data[i].sieve_label} - MENOR peneira que passa 100%)`);
          break; 
        }
      }

      // Se n encontrou nenhuma peneira que passa 100%, ent vai dar log de aviso
      if (!max_dimension_found) {
        nominal_diameter = 0;
        console.log(`⚠️ Nenhuma peneira passou 100% - não foi possível determinar Dimensão Máxima`);
      }

      fineness_module = Math.round((100 * fineness_module) / 100) / 100;
      total_retained = Math.round(100 * total_retained) / 100;
      const error = Math.round((100 * (material_mass - total_retained - bottom) * 100) / material_mass) / 100;

      const limit_10 = this.getPercentage(10, table_data);
      const limit_30 = this.getPercentage(30, table_data);
      const limit_60 = this.getPercentage(60, table_data);

      const diameter10 = this.getDiameter(table_data, 10, limit_10);
      const diameter30 = this.getDiameter(table_data, 30, limit_30);
      const diameter60 = this.getDiameter(table_data, 60, limit_60);

      const cnu = Math.round((100 * diameter60) / diameter10) / 100;
      const cc = Math.round((100 * Math.pow(diameter30, 2)) / (diameter60 * diameter10)) / 100;

      return {
        success: true,
        result: {
          accumulated_retained,
          graph_data,
          passant,
          retained_porcentage,
          passant_porcentage,
          total_retained,
          nominal_diameter, // ✅ Agora é a Dimensão Máxima correta
          nominal_size,     // ✅ TNM correto
          fineness_module,
          cc,
          cnu,
          error,
        },
      };
    } catch (error) {
      this.logger.error(`error on calculate asphalt granulometry > [error]: ${error}`);
      return {
        success: false,
        result: null,
      };
    }
  }

  /**
   * Calculates the diameter corresponding to a given percentage based on the table data and specified limits.
   * This function uses linear interpolation to determine the diameter when the percentage does not exactly
   * match the upper or lower limit values.
   *
   * @param table_data - Array of objects containing sieve data with labels, passant, and retained values.
   * @param percentage - The percentage for which the diameter needs to be calculated.
   * @param limits - An object containing the upper and lower limits with their respective values and indices.
   *
   * @returns The calculated diameter corresponding to the given percentage.
   */
  getDiameter = (
    table_data: { sieve_label: string; passant: number; retained: number }[],
    percentage: number,
    limits: { upperLimit: limit; inferiorLimit: limit },
  ): number => {
    // Check if the percentage matches the upper limit value
    if (limits.upperLimit.value === percentage) {
      return table_data[limits.upperLimit.index].passant;
    }
    // Check if the percentage matches the lower limit value
    if (limits.inferiorLimit.value === percentage) {
      return table_data[limits.inferiorLimit.index].passant;
    }

    // Calculate the coefficients for linear interpolation
    const coefficientA =
      (limits.upperLimit.value - limits.inferiorLimit.value) /
      (table_data[limits.upperLimit.index].passant - table_data[limits.inferiorLimit.index].passant);
    const coefficientB = limits.upperLimit.value / (coefficientA * table_data[limits.upperLimit.index].passant);

    // Use the coefficients to interpolate and find the diameter
    return (percentage - coefficientB) / coefficientA;
  };

  /**
   * Finds the upper and lower limits of the given percentage in the table of values.
   * The upper limit is the value of the sieve that is just above the given percentage
   * and the lower limit is the value of the sieve that is just below the given percentage.
   * If the given percentage is equal to the value of the sieve, the upper and lower limits
   * are the same.
   * @param percentage the percentage to find the limits for
   * @param table_data the table of values to search in
   * @returns an object with two properties: upperLimit and inferiorLimit. Each property
   * is an object with two properties: value and index. The value is the value of the sieve
   * and the index is the index of the sieve in the table.
   */
  getPercentage = (percentage: number, table_data: { sieve_label: string; passant: number; retained: number }[]) => {
    return table_data.reduce(
      (accumulate, sieve, index) => {
        // sieve.passant is the value of the sieve
        // if the value of the sieve is greater than or equal to the percentage
        // then the upper limit is the value of the sieve
        if (sieve.passant >= percentage) {
          if (accumulate.upperLimit.value === 0 || sieve.passant < accumulate.upperLimit.value)
            accumulate.upperLimit = {
              // the value of the sieve
              value: sieve.passant,
              // the index of the sieve in the table
              index: index,
            };
        } else {
          // if the value of the sieve is less than the percentage
          // then the lower limit is the value of the sieve
          if (accumulate.inferiorLimit.value === 0 || sieve.passant > accumulate.inferiorLimit.value)
            accumulate.inferiorLimit = {
              // the value of the sieve
              value: sieve.passant,
              // the index of the sieve in the table
              index: index,
            };
        }
        return accumulate;
      },
      {
        // the initial upper limit is 0
        upperLimit: {
          value: 0,
          index: 0,
        },
        // the initial lower limit is 0
        inferiorLimit: {
          value: 0,
          index: 0,
        },
      },
    );
  };
}