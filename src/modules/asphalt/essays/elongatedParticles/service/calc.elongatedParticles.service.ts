import { Injectable, Logger } from '@nestjs/common';
import { Calc_ELONGATEDPARTICLES_Dto, Calc_ELONGATEDPARTICLES_Out } from '../dto/calc.elongatedparticles.dto';
import { ElongatedParticlesRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { ElongatedParticlesResultsDimensionsRow } from '../schemas';

@Injectable()
export class Calc_ELONGATEDPARTICLES_Service {
  private logger = new Logger(Calc_ELONGATEDPARTICLES_Service.name);

  constructor(private readonly elongatedparticlesRepository: ElongatedParticlesRepository, private readonly materialRepository: MaterialsRepository) { }

  async calculateElongatedParticles({ step2Data }: Calc_ELONGATEDPARTICLES_Dto): Promise<{ success: boolean; result: Calc_ELONGATEDPARTICLES_Out }> {
    try {
      this.logger.log('calculate elongatedParticles on calc.elongatedParticles.service.ts > [body]');

      const { dimensions_table_data } = step2Data;

      const results_dimensions_table_data: ElongatedParticlesResultsDimensionsRow[] = [];

      dimensions_table_data.map((row) => {
        const { ratio, sample_mass, mass } = row;
        const particles_percentage = (sample_mass !== 0 && mass !== 0)
          ? Math.round(100 * (mass / sample_mass) * 100) / 100
          : 0;

        results_dimensions_table_data.push({
          ratio,
          particles_percentage
        })
      })

      const alerts: string[] = [];

      if (results_dimensions_table_data[0].particles_percentage > 10) {
        alerts.push("elongatedParticles.warning.criterion-1_5-max-value")
      }

      return {
        success: true,
        result: {
          results_dimensions_table_data,
          alerts,
        },
      };
    } catch (error) {
      return {
        success: false,
        result: null
      };
    }
  }
}