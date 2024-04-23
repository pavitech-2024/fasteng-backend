import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../repository';
import { AdhesivenessRepository } from 'modules/asphalt/essays/adhesiveness/repository';
import { ElongatedParticlesRepository } from 'modules/asphalt/essays/elongatedParticles/repository';
import { AsphaltGranulometryRepository } from 'modules/asphalt/essays/granulometry/repository';
import { SpecifyMassRepository } from 'modules/asphalt/essays/specifyMass/repository';
import { ShapeIndexRepository } from 'modules/asphalt/essays/shapeIndex/repository';
import { AbrasionRepository } from 'modules/asphalt/essays/abrasion/repository';
import { InjectModel } from '@nestjs/mongoose';
import { Material, MaterialDocument } from '../schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';

@Injectable()
export class GetEssaysByMaterial_Service {
  private logger = new Logger(GetEssaysByMaterial_Service.name);

  constructor(
    @InjectModel(Material.name, DATABASE_CONNECTION.ASPHALT)
    private materialModel: Model<MaterialDocument>,
    private readonly materialsRepository: MaterialsRepository,
    private readonly adhesivenessRepository: AdhesivenessRepository,
    private readonly elongatedParticlesRepository: ElongatedParticlesRepository,
    private readonly granulometryRepository: AsphaltGranulometryRepository,
    private readonly specificMassRepository: SpecifyMassRepository,
    private readonly shapeIndexRepository: ShapeIndexRepository,
    private readonly losAngelesAbrasionRepository: AbrasionRepository,
  ) {}

  async getEssaysByMaterial(material: any) {
    try {
      this.logger.log({ material }, 'start get essays by material > asphalt > [service]');

      const { type, _id } = material;

      // Pegar os tipos possíveis d eexperimentos
      const possiblesExperimentTypes = await this.findTypeExperiment(type);

      let essays = [];

      for (const essayName of possiblesExperimentTypes) {
        let essay = null;

        // Aqui você pode acessar diretamente os repositórios necessários com segurança
        switch (essayName) {
          case 'adhesiveness':
            essay = await this.adhesivenessRepository.findOne({ _id });
            break;
          case 'elongatedParticles':
            essay = await this.elongatedParticlesRepository.findOne({ _id });
            break;
          case 'granulometry':
            essay = await this.granulometryRepository.findOne({ "generalData.material._id": _id.toString() });
            break;
          case 'specificMass':
            essay = await this.specificMassRepository.findOne({ _id });
            break;
          case 'losAngelesAbrasion':
            essay = await this.losAngelesAbrasionRepository.findOne({ _id });
            break;
          case 'shapeIndex':
            essay = await this.shapeIndexRepository.findOne({ _id });
            break;
          default:
            break;
        }

        if (essay) {
          essays.push(essay);
        }
      }

      return essays;
    } catch (error) {
      this.logger.error(`error on get essays of this material > [error]: ${error}`);

      throw error;
    }
  }

  findTypeExperiment(typeMaterial): string[] {
    let possiblesExperimentTypes = [];

    switch (typeMaterial) {
      case 'coarseAggregate':
        possiblesExperimentTypes = [
          'adhesiveness',
          'elongatedParticles',
          'granulometry',
          'specificMass',
          'shapeIndex',
          'losAngelesAbrasion',
          'dosage',
          // To-do: qual ensaio é esse?
          'realDensity',
        ];
        break;
      case 'fineAggregate':
        possiblesExperimentTypes = [
          'Granulometry',
          'Fine Specific Gravity',
          'Sand Equivalent',
          'realDensity',
          'Angularity',
        ];
        break;
      case 'filler':
        possiblesExperimentTypes = ['Granulometry', 'Fine Specific Gravity', 'Sand Equivalent'];
        break;
      case 'asphaltBinder':
        possiblesExperimentTypes = [
          'Viscosity',
          'Penetration',
          'Softening Point',
          'Flash Point',
          'Ductility',
          'Dosage',
          'Rtfo',
        ];
        break;
      case 'modifiedAsphaltBinder':
        possiblesExperimentTypes = [
          'Viscosity',
          'Penetration',
          'Softening Point',
          'Flash Point',
          'Ductility',
          'Dosage',
          'Elastic Recovery',
          'Rtfo',
        ];
        break;
      case 'other':
        possiblesExperimentTypes = [
          'Adhesion',
          'Angularity',
          'FlatAndElongated',
          'Sand Equivalent',
          'Granulometry',
          'Coarse Specific Gravity',
          'Form Index',
          'Los Angeles Abrasion',
          'Viscosity',
          'Penetration',
          'Softening Point',
          'Flash Point',
          'Ductility',
          'Dosage',
          'Elastic Recovery',
          'realDensity',
        ];
        break;
      case 'CAP':
        possiblesExperimentTypes = [''];
        break;
      default:
        possiblesExperimentTypes = [];
        break;
    }

    return possiblesExperimentTypes;
  }
}
