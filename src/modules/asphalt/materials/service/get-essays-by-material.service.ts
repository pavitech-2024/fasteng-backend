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
import { SandEquivalentRepository } from 'modules/asphalt/essays/sandEquivalent/repository';
import { AngularityRepository } from 'modules/asphalt/essays/angularity/repository';
import { ViscosityRotationalRepository } from 'modules/asphalt/essays/viscosityRotational/repository';
import { PenetrationRepository } from 'modules/asphalt/essays/penetration/repository';
import { SofteningPointRepository } from 'modules/asphalt/essays/softeningPoint/repository';
import { FlashPointRepository } from 'modules/asphalt/essays/flashPoint/repository';
import { DuctilityRepository } from 'modules/asphalt/essays/ductility/repository';

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
    private readonly sandEquivalentRepository: SandEquivalentRepository,
    private readonly angularityRepository: AngularityRepository,
    private readonly viscosityRotationalRepository: ViscosityRotationalRepository,
    private readonly penetrationRepository: PenetrationRepository,
    private readonly softeningPointRepository: SofteningPointRepository,
    private readonly flashPointRepository: FlashPointRepository,
    private readonly ductilityRepository: DuctilityRepository
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
        let response;

        // Acessando condicionamente o repositório correto para cada ensaio
        switch (essayName) {
          case 'adhesiveness':
            response = await this.adhesivenessRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'elongatedParticles':
            response = await this.elongatedParticlesRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'granulometry':
            response = await this.granulometryRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'specificMass':
            response = await this.specificMassRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'losAngelesAbrasion':
            response = await this.losAngelesAbrasionRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'shapeIndex':
            response = await this.shapeIndexRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'sandEquivalent':
            response = await this.sandEquivalentRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'angularity':
            response = await this.angularityRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'viscosityRotational':
            response = await this.viscosityRotationalRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'penetration':
            response = await this.penetrationRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'softeningPoint':
            response = await this.softeningPointRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'flashPoint':
            response = await this.flashPointRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'ductility':
            response = await this.ductilityRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
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
        possiblesExperimentTypes = ['granulometry', 'specificMass', 'sandEquivalent', 'realDensity', 'angularity'];
        break;
      case 'filler':
        possiblesExperimentTypes = ['granulometry', 'specificMass', 'sandEquivalent'];
        break;
      case 'asphaltBinder':
        possiblesExperimentTypes = [
          'viscosityRotational',
          'penetration',
          'softeningPoint',
          'flashPoint',
          'ductility',
          'dosage',
          'rtfo',
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
