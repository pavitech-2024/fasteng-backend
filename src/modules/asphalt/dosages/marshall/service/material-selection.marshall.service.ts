import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../../../modules/asphalt/essays/granulometry/repository';
import { SpecifyMassRepository } from '../../../../../modules/asphalt/essays/specifyMass/repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';

@Injectable()
export class MaterialSelection_Marshall_Service {
  private logger = new Logger(MaterialSelection_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly material_repository: MaterialsRepository,
    private readonly granulometry_repository: AsphaltGranulometryRepository,
    private readonly specifyMass_repository: SpecifyMassRepository,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async getMaterials(userId: string) {
    try {
      this.logger.log('get materials on material-selection.marshall.service.ts > [body]', { userId: userId });
      
      const materials = await this.material_repository.findByUserId({
        userId: userId,
      });

      const granulometrys = await this.granulometry_repository.findAll();
      const specifyMasses = await this.specifyMass_repository.findAll();

      const binders = materials.filter(({ type }) => {
        return type === 'CAP' || type === 'asphaltBinder';
      });

      const aggregates = materials.filter(({ _id, type }) => {
        if (type === 'CAP' || type === 'asphaltBinder') return false;

        // Find the materials that already has the granulometry essay completed;
        const granulometry = granulometrys.some(({ generalData }) => {
          const { material } = generalData;
          return _id.toString() === material._id.toString();
        });

        // Find the materials that already has the specific mass essay completed;
        const specifyMass = specifyMasses.some(({ generalData }) => {
          const { material } = generalData;
          return _id.toString() === material._id.toString();
        });

        return granulometry && specifyMass;
      });

      const filteredMaterials = binders.concat(aggregates);

      return filteredMaterials;
    } catch (error) {
      throw error;
    }
  }

  async saveMaterials(body: any, userId: string) {
    try {
      this.logger.log('save marshall materials step on material-selection.marshall.service.ts > [body]', { body });

      const { name } = body.materialSelectionData;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { name: materialName, ...materialDataWithoutName } = body.materialSelectionData;

      const marshallWithMaterials = { ...marshallExists._doc, materialSelectionData: materialDataWithoutName };

      await this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithMaterials);

      if (marshallExists._doc.generalData.step < 2) {
        await this.marshallRepository.saveStep(marshallExists, 2);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
