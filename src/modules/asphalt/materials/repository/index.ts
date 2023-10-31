import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Material, MaterialDocument } from '../schemas';

export class MaterialsRepository {
  constructor(
    @InjectModel(Material.name, DATABASE_CONNECTION.ASPHALT) private materialModel: Model<MaterialDocument>,
  ) {}

  async create(material: any): Promise<Material> {
    const createdMaterial = new this.materialModel(material);
    return createdMaterial.save();
  }

  async find(): Promise<Material[]> {
    return this.materialModel.find();
  }

  async findOne(materialsFilterQuery: any): Promise<Material> {
    return this.materialModel.findOne(materialsFilterQuery);
  }

  async findOneAndUpdate(materialsFilterQuery: any, material: Partial<Material>): Promise<Material> {
    return this.materialModel.findOneAndUpdate(materialsFilterQuery, material, {
      new: true,
    });
  }

  async findOneAndDelete(materialsFilterQuery: any): Promise<Material> {
    return this.materialModel.findByIdAndDelete(materialsFilterQuery);
  }

  async findById(id: string): Promise<Material> {
    return this.materialModel.findById(id).exec();
  }
}
