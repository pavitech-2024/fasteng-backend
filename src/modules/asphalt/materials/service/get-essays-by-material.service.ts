import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../repository';
import { AdhesivenessRepository } from '../../essays/adhesiveness/repository';
import { ElongatedParticlesRepository } from '../../essays/elongatedParticles/repository';
import { AsphaltGranulometryRepository } from '../../essays/granulometry/repository';
import { SpecifyMassRepository } from '../../essays/specifyMass/repository';
import { ShapeIndexRepository } from '../../essays/shapeIndex/repository';
import { AbrasionRepository } from '../../essays/abrasion/repository';
import { InjectModel } from '@nestjs/mongoose';
import { Material, MaterialDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { SandEquivalentRepository } from '../../essays/sandEquivalent/repository';
import { AngularityRepository } from '../../essays/angularity/repository';
import { ViscosityRotationalRepository } from '../../essays/viscosityRotational/repository';
import { PenetrationRepository } from '../../essays/penetration/repository';
import { SofteningPointRepository } from '../../essays/softeningPoint/repository';
import { FlashPointRepository } from '../../essays/flashPoint/repository';
import { DuctilityRepository } from '../../essays/ductility/repository';
import { RtfoRepository } from '../../essays/rtfo/repository';
import { ElasticRecoveryRepository } from '../../essays/elasticRecovery/repository';

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
    private readonly ductilityRepository: DuctilityRepository,
    private readonly rtfoRepository: RtfoRepository,
    private readonly elasticRecoveryRepository: ElasticRecoveryRepository
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
          case 'rtfo':
            response = await this.rtfoRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'elasticRecovery':
            response = await this.elasticRecoveryRepository.findOne({ 'generalData.material._id': _id.toString() });
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
          // To-do: fazer a dosagem;
          'dosage',
          'rtfo',
        ];
        break;
      case 'CAP':
        possiblesExperimentTypes = [
          'viscosityRotational',
          'penetration',
          'softeningPoint',
          'flashPoint',
          'ductility',
          'dosage',
          'elasticRecovery',
          'rtfo',
        ];
        break;
      case 'other':
        possiblesExperimentTypes = [
          'adhesiveness',
          'angularity',
          'elongatedParticles',
          'sandEquivalent',
          'granulometry',
          'specificMass',
          'shapeIndex',
          'losAngelesAbrasion',
          'viscosityRotational',
          'penetration',
          'softeningPoint',
          'flashPoint',
          'ductility',
          'dosage',
          'elasticRecovery',
          'realDensity',
        ];
        break;
      default:
        possiblesExperimentTypes = [];
        break;
    }

    return possiblesExperimentTypes;
  }
}
