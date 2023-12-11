import { InjectModel } from '@nestjs/mongoose';
import { Granulometry, GranulometryDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model, FilterQuery } from 'mongoose';

export class ConcreteGranulometryRepository {
  constructor(@InjectModel(Granulometry.name, DATABASE_CONNECTION.CONCRETE) private granulometryModel: Model<GranulometryDocument>) {}

  async findOne(granulometryFilterQuery: FilterQuery<Granulometry>): Promise<Granulometry> {
    return this.granulometryModel.findOne(granulometryFilterQuery);
  }

  async findAll(): Promise<Granulometry[]> {
    return this.granulometryModel.find();
  }

  async findAllByMaterialId(unitMassFilterQuery: FilterQuery<Granulometry>): Promise<Granulometry[]> {
    return this.granulometryModel.find(unitMassFilterQuery);
  }

  async findAllGranulometrysByMaterialId(materialId: string, type: string): Promise<Granulometry[]> {
    let granulometryEssays;
    if (type === 'coarse') {
      granulometryEssays = await this.granulometryModel.find({
        "generalData.material._id": materialId,
        "generalData.results.nominal_diameter": {
          $gte: 9.5, // Maior ou igual a 9.5mm
          $lte: 37.5 // Menor ou igual a 37.5mm
        }
      });
    } else if (type === 'fine') {
      granulometryEssays = await this.granulometryModel.find({
        "generalData.material._id": materialId,
        "generalData.results.fineness_module": {
          $gte: 1.8, // Maior ou igual a 9.5mm
          $lte: 3.6 // Menor ou igual a 37.5mm
        }
      });
    }

    return granulometryEssays;
  }


  async create(granulometry: any): Promise<Granulometry> {
    const createdGranulometry = new this.granulometryModel(granulometry);

    return createdGranulometry.save();
  }
}