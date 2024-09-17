import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../../../modules/asphalt/essays/granulometry/repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { ViscosityRotationalRepository } from '../../../essays/viscosityRotational/repository';
import { SpecifyMassRepository } from 'modules/asphalt/essays/specifyMass/repository';

@Injectable()
export class MaterialSelection_Marshall_Service {
  private logger = new Logger(MaterialSelection_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly material_repository: MaterialsRepository,
    private readonly granulometry_repository: AsphaltGranulometryRepository,
    private readonly marshallRepository: MarshallRepository,
    private readonly rotationalViscosity_repository: ViscosityRotationalRepository,
    private readonly specificMass_repository: SpecifyMassRepository
  ) {}

  async getMaterials(userId: string) {
    try {
      this.logger.log('get materials on material-selection.marshall.service.ts > [body]', { userId: userId });
      
      const materials = await this.material_repository.findByUserId({
        userId: userId,
      });

      const granulometrys = await this.granulometry_repository.findAll();

      const rotationalViscosities = await this.rotationalViscosity_repository.findAll();

      const specificMasses = await this.specificMass_repository.findAll();

      const filteredMaterials = materials.filter((material) => {
        const { _id, type } = material;

        if (type === 'CAP' || type === 'asphaltBinder') {
          return rotationalViscosities.some(({ generalData }) => {
            const { material: viscosityMaterial } = generalData;
            return _id.toString() === viscosityMaterial._id.toString();
          });
        } else {
          const granulometriesEssays = granulometrys.some(({ generalData }) => {
            const { material: granulometryMaterial } = generalData;
            return _id.toString() === granulometryMaterial._id.toString();
          });

          const specificMassesEssays = specificMasses.some(({ generalData }) => {
            const { material: specificMassMaterial } = generalData;
            return _id.toString() === specificMassMaterial._id.toString();
          })
          return granulometriesEssays && specificMassesEssays;
        };
      });

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
