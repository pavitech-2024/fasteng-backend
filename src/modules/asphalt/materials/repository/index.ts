import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';
import { FilterQuery, Model } from 'mongoose';
import { Material, MaterialDocument } from '../schemas';

export class MaterialsRepository {
  constructor(
    @InjectModel(Material.name, DATABASE_CONNECTION.ASPHALT) private materialModel: Model<MaterialDocument>,
  ) {}

  async create(material: any): Promise<Material> {
    const createdMaterial = new this.materialModel(material);
    return createdMaterial.save();
  }

  async find(ids?: any): Promise<Material[]> {
    return this.materialModel.find();
  }

  async findOne(materialsFilterQuery: FilterQuery<Material>): Promise<Material> {
    const material = this.materialModel.findOne(materialsFilterQuery);
    return material;
  }

  async findByType(types: any, userId: string): Promise<Material[]> {
    const materials = await this.materialModel.find({
      "userId": userId,
      "type": types
    }).sort({ createdAt: -1 });
    return materials;
  }

  async findById(materialId: string): Promise<Material> {
    return this.materialModel.findById(materialId);
    
  }

  async findSelectedById(ids: string[]): Promise<Material[]> {
    return this.materialModel.find({ _id: { $in: ids } }).exec();
  }

  async findByUserId(materialsFilterQuery: FilterQuery<Material>): Promise<Material[]> {
    const materials = await this.materialModel.find(materialsFilterQuery).sort({ createdAt: -1 });
    return materials;
  }

  async findOneAndUpdate(materialsFilterQuery: FilterQuery<Material>, material: Partial<Material>): Promise<Material> {
    return this.materialModel.findOneAndUpdate(materialsFilterQuery, material, {
      new: true,
    });
  }

  async findOneAndDelete(materialsFilterQuery: FilterQuery<Material>): Promise<Material> {
    return this.materialModel.findByIdAndDelete(materialsFilterQuery);
  }
}
