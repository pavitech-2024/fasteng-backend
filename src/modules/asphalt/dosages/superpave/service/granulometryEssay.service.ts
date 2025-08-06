import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { getSieveValue } from 'modules/soils/util/sieves';
import { Calc_Superpave_GranulometyEssay_Dto } from '../dto/granulometry-essay.dto';
import { SuperpaveRepository } from '../repository';

type limit = { value: number; index: number };

@Injectable()
export class GranulometryEssay_Superpave_Service {
  private logger = new Logger(GranulometryEssay_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpave_repository: SuperpaveRepository,
  ) {}

  /**
   * Calculates the granulometry essay for Superpave.
   * @param body Request body with granulometry data.
   * @returns An object with the result of the granulometry essay.
   * @throws {Error} If fails to calculate the granulometry essay.
   */
  async calculateGranulometryEssay(body: Calc_Superpave_GranulometyEssay_Dto) {
    try {
      this.logger.log('calculate granulometry essay data on granulometry-essay.superpave.service.ts > [body]', {
        body,
      });

      const { table_data, material_mass, bottom } = body;

      const length = table_data.length;

      const accumulated_retained: [string, number][] = [];

      const passant: [string, number][] = [];
      const retained_porcentage: [string, number][] = [];

      const graph_data: [number, number][] = [];

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

        passant.push([label, Math.round(100 * (material_mass - total_retained)) / 100]);

        accumulated_retained.push([label, Math.round(100 * (100 - passant_porcentage)) / 100]);

        if (i === 0) {
          retained_porcentage.push(accumulated_retained[i]);
        } else {
          retained_porcentage.push([
            label,
            Math.round(100 * (accumulated_retained[i][1] - accumulated_retained[i - 1][1])) / 100,
          ]);
        }

        fineness_module += accumulated_retained[i][1];

        if (total_retained >= 5 && nominal_size_flag) {
          nominal_size_flag = false;
          if (total_retained === 5) nominal_size = getSieveValue(label);
          else {
            if (i === 0) nominal_size = getSieveValue(label);
            else nominal_size = getSieveValue(table_data[i - 1].sieve_label, true);
          }
        }

        if (total_retained > 10 && nominal_diameter_flag) {
          nominal_diameter_flag = false;
          if (i === 1) nominal_diameter = getSieveValue(label, true);
          else if (i === 0) nominal_diameter = value;
          else nominal_diameter = getSieveValue(table_data[i - 1].sieve_label, true);
        }

        graph_data.push([value, passant_porcentage]);
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
          total_retained,
          nominal_diameter,
          nominal_size,
          fineness_module,
          cc,
          cnu,
          error,
        },
      };
    } catch (error) {
      throw new Error('Failed to calculate granulometry essay.');
    }
  }

  /**
   * This function calculate the diameter of a particle given the percentage of particles that passed and retained.
   *
   * @param table_data - The table data with the passant and retained values.
   * @param percentage - The percentage of the particles that passed.
   * @param limits - The limits of the two points of the line.
   *
   * @returns The diameter of the particle.
   */
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

  /**
   * Calculates the upper and lower limits of the table data for a given percentage.
   *
   * @param percentage - The percentage of particles that passed.
   * @param table_data - The table data containing sieve information with passant and retained values.
   * @returns An object containing the upper and lower limits.
   */
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

  async saveGranulometryEssayData(body: any, userId: string) {
    try {
      this.logger.log('save superpave materials data on material-selection.superpave.service.ts > [body]', { body });

      const { name } = body.granulometryEssayData;

      const superpaveExists: any = await this.superpave_repository.findOne(name, userId);

      const { name: materialName, ...materialDataWithoutName } = body.granulometryEssayData;

      const superpaveWithMaterials = { ...superpaveExists._doc, granulometryEssayData: materialDataWithoutName };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithMaterials);

      if (superpaveExists._doc.generalData.step < 2) {
        await this.superpave_repository.saveStep(superpaveExists, 2);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async saveGranulometryEssayResults(body: any, userId: string) {
    try {
      this.logger.log('save superpave materials results on material-selection.superpave.service.ts > [body]', { body });

      const { name } = body.granulometryEssayResults;

      const superpaveExists: any = await this.superpave_repository.findOne(name, userId);

      const { name: materialName, ...materialDataWithoutName } = body.granulometryEssayResults;

      const superpaveWithMaterials = { ...superpaveExists._doc, granulometryEssayResults: materialDataWithoutName };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithMaterials);

      if (superpaveExists._doc.generalData.step < 3) {
        await this.superpave_repository.saveStep(superpaveWithMaterials, 3);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
