import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../../../modules/asphalt/essays/granulometry/repository';
import { SpecifyMassRepository } from '../../../../../modules/asphalt/essays/specifyMass/repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';
import { SuperpaveRepository } from '../repository';
import { ViscosityRotationalRepository } from 'modules/asphalt/essays/viscosityRotational/repository';

@Injectable()
export class MaterialSelection_Superpave_Service {
  private logger = new Logger(MaterialSelection_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly material_repository: MaterialsRepository,
    private readonly granulometry_repository: AsphaltGranulometryRepository,
    private readonly specifyMass_repository: SpecifyMassRepository,
    private readonly superpaveRepository: SuperpaveRepository,
    private readonly rotationalViscosity_repository: ViscosityRotationalRepository
  ) {}

  async getMaterials(userId: string) {
    try {
      const materials = await this.material_repository.findByUserId({
        userId: userId,
      });

      const granulometrys = await this.granulometry_repository.findAll();
      const specifyMasses = await this.specifyMass_repository.findAll();
      const viscosities = await this.rotationalViscosity_repository.findAll();

      const binders = materials.filter(({ _id }) => {
        const viscosity = viscosities.some(({ generalData }) => {
          const { material } = generalData;
          return _id.toString() === material._id.toString();
        })
        return viscosity
      });

      const aggregates = materials.filter(({ _id, type }) => {
        if (type === 'CAP' || type === 'asphaltBinder') return false;
        const granulometry = granulometrys.some(({ generalData }) => {
          const { material } = generalData;
          return _id.toString() === material._id.toString();
        });
        const specifyMass = specifyMasses.some(({ generalData }) => {
          const { material } = generalData;
          return _id.toString() === material._id.toString();
        });
        return granulometry; //&& specifyMass;
      });

      const filteredMaterials = binders.concat(aggregates);

      return filteredMaterials;
    } catch (error) {
      throw error;
    }
  }

  async saveMaterials(body: any, userId: string) {
    console.log("Teste")
    try {
      this.logger.log('save superpave materials step on material-selection.superpave.service.ts > [body]', { body });

      const { name } = body.materialSelectionData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...materialDataWithoutName } = body.materialSelectionData;

      const superpaveWithMaterials = { ...superpaveExists._doc, materialSelectionData: materialDataWithoutName };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithMaterials);

      if (superpaveExists._doc.generalData.step < 2) {
        await this.superpaveRepository.saveStep(superpaveExists, 2);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
