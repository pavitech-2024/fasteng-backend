import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { getSieveValue } from "modules/soils/util/sieves";
import { Calc_AsphaltGranulometry_Dto, Calc_AsphaltGranulometry_Out } from "../dto/asphalt.calc.granulometry.dto";
import { AsphaltGranulometryRepository } from "../repository";

type limit = { value: number, index: number };

@Injectable()
export class Calc_AsphaltGranulometry_Service {
  private logger = new Logger(Calc_AsphaltGranulometry_Service.name);

  constructor(private readonly granulometryRepository: AsphaltGranulometryRepository, private readonly materialsRepository: MaterialsRepository) { }

  async calculateGranulometry({ step2Data }: Calc_AsphaltGranulometry_Dto): Promise<{ success: boolean; result: Calc_AsphaltGranulometry_Out }> {
    try {
      this.logger.log('calculate granulometry on calc.granulometry.service.ts > [body]');

      const { table_data, material_mass, bottom } = step2Data;

      const length = table_data.length;

      const accumulated_retained: number[] = []

      const passant: number[] = []
      const retained_porcentage: number[] = []

      const graph_data: [number, number][] = []

      let total_retained = 0;

      let nominal_diameter = 0;
      let nominal_size = 0;

      let fineness_module = 0;

      let nominal_size_flag = true;
      let nominal_diameter_flag = true;

      for (let i = 0; i < length; i++) {

        const label = table_data[i].sieve;
        const passant_porcentage = table_data[i].passant;
        const retained = table_data[i].retained;

        total_retained += retained;

        passant.push(Math.round(100 * (material_mass - total_retained)) / 100);

        accumulated_retained.push(Math.round(100 * (100 - passant_porcentage)) / 100);

        if (i === 0) {
          retained_porcentage.push(accumulated_retained[i]);
        } else {
          retained_porcentage.push(Math.round(100 * (accumulated_retained[i] - accumulated_retained[i - 1])) / 100);
        }

        fineness_module += accumulated_retained[i]

        if (total_retained >= 5 && nominal_size_flag) {
          nominal_size_flag = false;
          if (total_retained === 5) nominal_size = getSieveValue(label);
          else {
            if (i === 0) nominal_size = getSieveValue(label);
            else nominal_size = getSieveValue(table_data[i - 1].sieve);
          }
        }

        if (total_retained > 10 && nominal_diameter_flag) {
          nominal_diameter_flag = false;
          if (i === 1) nominal_diameter = getSieveValue(label);
          else nominal_diameter = getSieveValue(table_data[i - 1].sieve);
        }

        graph_data.push(([getSieveValue(label), passant_porcentage]));

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
      return {
        success: false,
        result: null
      };
    }
  }

  getDiameter = (table_data: { sieve: string, passant: number, retained: number }[], percentage: number, limits: { upperLimit: limit, inferiorLimit: limit }) => {
    if (limits.upperLimit.value === percentage) return table_data[limits.upperLimit.index].passant;
    if (limits.inferiorLimit.value === percentage) return table_data[limits.inferiorLimit.index].passant;

    const coefficientA =
      (limits.upperLimit.value - limits.inferiorLimit.value) /
      (table_data[limits.upperLimit.index].passant - table_data[limits.inferiorLimit.index].passant);
    const coefficientB = limits.upperLimit.value / (coefficientA * table_data[limits.upperLimit.index].passant);

    return (percentage - coefficientB) / coefficientA;
  }

  getPercentage = (percentage: number, table_data: { sieve: string, passant: number, retained: number }[]) => {
    return table_data.reduce(
      (accumulate, sieve, index) => {
        const { upperLimit, inferiorLimit } = accumulate;

        if (sieve.passant >= percentage) {
          if (upperLimit.value === 0 || sieve.passant < upperLimit.value)
            accumulate.upperLimit = {
              value: sieve.passant,
              index: index
            };
        } else {
          if (inferiorLimit.value === 0 || sieve.passant > inferiorLimit.value)
            accumulate.inferiorLimit = {
              value: sieve.passant,
              index: index
            };
        }
        return accumulate;
      },
      {
        upperLimit: {
          value: 0,
          index: 0
        },
        inferiorLimit: {
          value: 0,
          index: 0
        }
      }
    );
  }
}