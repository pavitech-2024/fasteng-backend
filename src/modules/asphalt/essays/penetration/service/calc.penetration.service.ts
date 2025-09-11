import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../../../materials/repository';
import { Calc_Penetration_Dto, Calc_Penetration_Out } from '../dto/calc.penetration.dto';
import { PenetrationRepository } from '../repository';
import { Material } from 'modules/asphalt/materials/schemas';
import { SofteningPointRepository } from '../../softeningPoint/repository';

@Injectable()
export class Calc_Penetration_Service {
  private logger = new Logger(Calc_Penetration_Service.name);

  constructor(
    private readonly penetrationRepository: PenetrationRepository,
    private readonly materialRepository: MaterialsRepository,
    private readonly softeningPointRespository: SofteningPointRepository,
  ) {}

  async calculatePenetration({
    penetrationCalc,
    generalData,
  }: Calc_Penetration_Dto): Promise<{ success: boolean; result: Calc_Penetration_Out }> {
    try {
      this.logger.log('calculate penetration on calc.penetration.service.ts > [body]');

      const { points } = penetrationCalc;
      const { material } = generalData;

      const penetration = points.reduce((soma, valor) => (soma += valor)) / points.length;

      const indexOfSusceptibility = await this.setIndexOfSusceptibility(penetration, material);

      await this.verifyResults(penetration, points, material);

      return {
        success: true,
        result: {
          penetration,
          cap: '',
          alerts: '',
          indexOfSusceptibility,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Calculates the Index of Susceptibility based on the penetration value and the last softening point
   * associated with the given material, if applicable.
   *
   * @param {number} penetration - The penetration value used in the calculation.
   * @param {Material} [material] - The material object containing classification and ID information.
   * @returns {Promise<number>} The calculated index of susceptibility. Returns 0 if conditions are not met.
   * @throws {Error} If an error occurs during the database query or calculation.
   */
  private async setIndexOfSusceptibility(penetration: number, material?: Material) {
    this.logger.log('set index of susceptibility on calc.penetration.service.ts > [body]');
    try {
      let indexOfSusceptibility = 0;
      if (material.description.classification_CAP) {
        const allSofteningPointsById = await this.softeningPointRespository.findAllByMaterialId(material._id);

        if (allSofteningPointsById.length === 1 || allSofteningPointsById.length > 1) {
          const softeningPoint = allSofteningPointsById[allSofteningPointsById.length - 1];

          if (softeningPoint) {
            indexOfSusceptibility = this.calculateIndexOfSusceptibility(
              penetration,
              softeningPoint.results.data.softeningPoint,
            );
          }
        }
      }
      return indexOfSusceptibility;
    } catch (error) {
      this.logger.error('Error in setIndexOfSusceptibility', error);
      throw error;
    }
  }

  /**
   * Computes the Index of Susceptibility based on the given penetration value and softening point.
   * The formula used is:
   *
   * ```
   * ((500 * log(penetration)) + (20 * softeningPoint - 1951)) /
   * ((120 - 50 * log(penetration)) + softeningPoint)
   * ```
   *
   * @param {number} penetration - The penetration value used in the calculation.
   * @param {number} softeningPoint - The softening point value used in the calculation.
   * @returns {number} The computed index of susceptibility.
   * @throws {Error} If an error occurs during the calculation.
   */
  private calculateIndexOfSusceptibility(penetration: number, softeningPoint: number) {
    this.logger.log('calculate index of susceptibility on calc.penetration.service.ts > [body]');
    try {
      const indexOfSusceptibility =
        (500 * Math.log(penetration) + (20 * softeningPoint - 1951)) /
        (120 - 50 * Math.log(penetration) + softeningPoint);

      return indexOfSusceptibility;
    } catch (error) {
      this.logger.error('Error in calculateIndexOfSusceptibility', error);
      throw error;
    }
  }

  private compareResults(penetration: number, points: number[], material: Material) {
    let alert = false;
    let max = Math.max(...points);
    let min = Math.min(...points);
    let maxDifference = 0;
    let alerts = [];

    if (penetration >= 0 && penetration <= 4.9) {
      maxDifference = 0.2;
    } else if (penetration >= 5 && penetration <= 14.9) {
      maxDifference = 0.4;
    } else if (penetration >= 15 && penetration <= 24.9) {
      maxDifference = 1.2;
    } else if (penetration >= 25 && penetration <= 50) {
      maxDifference = 2;
    }

    alert = this.compareHighAndlower(max, min, maxDifference);

    if (alert) {
      alerts.push(
        'Atenção: diferença máxima entre o valor mais alto e mais baixo das determinações acima do valor recomendado (DNIT-ME 155/2010).',
      );
    }
    return this.classifyCap(penetration, material);
  }

  private compareHighAndlower(high: number, lower: number, difference: number) {
    if (difference == 0 && Math.abs(high - lower) <= difference) {
      return false;
    }
    return true;
  }

  private async classifyCap(penetration: number, material: Material) {
    try {
      let type: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200';
      let alert = '';

      if (penetration >= 3 && penetration <= 4.5) {
        type = 'CAP 30/45';
      } else if (penetration >= 5 && penetration <= 7) {
        type = 'CAP 50/70';
      } else if (penetration >= 8.5 && penetration <= 10) {
        type = 'CAP 85/100';
      } else if (penetration >= 15 && penetration <= 20) {
        type = 'CAP 150/200';
      }

      if ((!material.description.classification_CAP && material.type === 'CAP') || material.type === 'other') {
        // Buscar o material e mudar sua classificação
        const materialFinded = await this.materialRepository.findById(material._id);
        materialFinded.description.classification_CAP = type;
        //await this.materialRepository.findOneAndUpdate({ _id: materialFinded._id }, materialFinded);
        await this.materialRepository.findOneAndUpdate({ _id: materialFinded._id }, materialFinded, { new: true });
      } else {
        if (!material.description.classification_AMP && material.type === 'asphaltBinder') {
          alert += this.ampAlert(penetration, material.description.classification_AMP);
        }
      }
      return { type: type, alert: alert };
    } catch (error) {
      this.logger.error('Error in classifyCap', error);
      throw error;
    }
  }

  private ampAlert(penetration: number, classification: string) {
    let out = false;
    if ((classification === 'AMP 50/65' || classification === 'AMP 55/75') && (penetration < 4.5 || penetration > 7)) {
      out = true;
    } else if (
      (classification === 'AMP 60/85' || classification === 'AMP 65/90') &&
      (penetration < 4 || penetration > 7)
    ) {
      out = true;
    }
    if (out) {
      return 'Atenção: resultado de penetração fora dos limites especificados para o ' + classification + '.';
    }
    return '';
  }

  private async verifyResults(penetration: number, points: number[], material) {
    let cap = await this.compareResults(penetration, points, material);
    return {
      cap: cap.type,
      alert: cap.alert,
    };
  }
}
