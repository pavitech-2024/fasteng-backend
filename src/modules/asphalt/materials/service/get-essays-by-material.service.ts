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
      this.logger.log('=========================================');
      this.logger.log('START getEssaysByMaterial');
      this.logger.log(`Material ID: ${material._id}`);
      this.logger.log(`Material Type: ${material.type}`);
      this.logger.log('=========================================');

      const { type, _id } = material;

      // Pegar os tipos possíveis de experimentos
      const possiblesExperimentTypes = await this.findTypeExperiment(type);
      
      this.logger.log(`Possible essay types for material type "${type}":`);
      this.logger.log(possiblesExperimentTypes);

      let essays = [];

      for (const essayName of possiblesExperimentTypes) {
        this.logger.log(`--- Checking essay: ${essayName} ---`);
        let essay = null;
        let response;

        try {
          // Acessando condicionamente o repositório correto para cada ensaio
          switch (essayName) {
            case 'adhesiveness':
              this.logger.log(`Querying adhesiveness with material._id: ${_id.toString()}`);
              response = await this.adhesivenessRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`Adhesiveness result: ${response ? `FOUND (ID: ${response._id}, Name: ${response.generalData?.name})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'elongatedParticles':
              this.logger.log(`Querying elongatedParticles with material._id: ${_id.toString()}`);
              response = await this.elongatedParticlesRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`ElongatedParticles result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'granulometry':
              this.logger.log(`Querying granulometry with material._id: ${_id.toString()}`);
              response = await this.granulometryRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`Granulometry result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'specificMass':
              this.logger.log(`Querying specificMass with material._id: ${_id.toString()}`);
              response = await this.specificMassRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`SpecificMass result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'losAngelesAbrasion':
              this.logger.log(`Querying losAngelesAbrasion with material._id: ${_id.toString()}`);
              response = await this.losAngelesAbrasionRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`LosAngelesAbrasion result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'shapeIndex':
              this.logger.log(`Querying shapeIndex with material._id: ${_id.toString()}`);
              response = await this.shapeIndexRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`ShapeIndex result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'sandEquivalent':
              this.logger.log(`Querying sandEquivalent with material._id: ${_id.toString()}`);
              response = await this.sandEquivalentRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`SandEquivalent result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'angularity':
              this.logger.log(`Querying angularity with material._id: ${_id.toString()}`);
              response = await this.angularityRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`Angularity result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'viscosityRotational':
              this.logger.log(`Querying viscosityRotational with material._id: ${_id.toString()}`);
              response = await this.viscosityRotationalRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`ViscosityRotational result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'penetration':
              this.logger.log(`Querying penetration with material._id: ${_id.toString()}`);
              response = await this.penetrationRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`Penetration result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'softeningPoint':
              this.logger.log(`Querying softeningPoint with material._id: ${_id.toString()}`);
              response = await this.softeningPointRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`SofteningPoint result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'flashPoint':
              this.logger.log(`Querying flashPoint with material._id: ${_id.toString()}`);
              response = await this.flashPointRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`FlashPoint result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'ductility':
              this.logger.log(`Querying ductility with material._id: ${_id.toString()}`);
              response = await this.ductilityRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`Ductility result: ${response ? `FOUND (ID: ${response._id}, Name: ${response.generalData?.name})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'rtfo':
              this.logger.log(`Querying rtfo with material._id: ${_id.toString()}`);
              response = await this.rtfoRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`Rtfo result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            case 'elasticRecovery':
              this.logger.log(`Querying elasticRecovery with material._id: ${_id.toString()}`);
              response = await this.elasticRecoveryRepository.findOne({ 'generalData.material._id': _id.toString() });
              this.logger.log(`ElasticRecovery result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
              if (response) {
                essay = { essayName, data: response };
              }
              break;
            default:
              this.logger.log(`Unknown essay type: ${essayName}`);
              break;
          }
        } catch (error) {
          this.logger.error(`Error checking essay ${essayName}: ${error.message}`);
          this.logger.error(error.stack);
        }

        if (essay) {
          essays.push(essay);
          this.logger.log(`✓ Added essay: ${essayName}`);
        } else {
          this.logger.log(`✗ No essay found for: ${essayName}`);
        }
      }

      this.logger.log('=========================================');
      this.logger.log(`Total essays found: ${essays.length}`);
      this.logger.log('=========================================');

      return essays;
    } catch (error) {
      this.logger.error(`error on get essays of this material > [error]: ${error}`);
      this.logger.error(error.stack);
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
          'sandEquivalent',
          // 'realDensity',
          // 'dosage',
        ];
        break;
        
      case 'fineAggregate':
        possiblesExperimentTypes = [
          'granulometry',
          'specificMass',
          'sandEquivalent',
          'angularity',
          // 'realDensity',
        ];
        break;
        
      case 'filler':
        possiblesExperimentTypes = [
          'granulometry',
          'specificMass',
          'sandEquivalent',
        ];
        break;
        
      case 'asphaltBinder':
        possiblesExperimentTypes = [
          'adhesiveness',
          'viscosityRotational',
          'penetration',
          'softeningPoint',
          'flashPoint',
          'ductility',
          'rtfo',
          // 'dosage',
        ];
        break;
        
      case 'CAP':
        possiblesExperimentTypes = [
          'adhesiveness',
          'viscosityRotational',
          'penetration',
          'softeningPoint',
          'flashPoint',
          'ductility',
          'elasticRecovery',
          'rtfo',
          // 'dosage',
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
          'elasticRecovery',
          'rtfo',
          // 'dosage',
          // 'realDensity',
        ];
        break;
        
      default:
        possiblesExperimentTypes = [];
        break;
    }

    this.logger.log(`findTypeExperiment for "${typeMaterial}": ${possiblesExperimentTypes.join(', ')}`);
    return possiblesExperimentTypes;
  }
}