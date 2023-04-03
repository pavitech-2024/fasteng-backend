import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Material, MaterialDocument } from '../schemas';

export class MaterialsRepository {
  constructor(
    @InjectModel(Material.name, DATABASE_CONNECTION.CONCRETE) private materialModel: Model<MaterialDocument>,
  ) {}

  async create(material: Material): Promise<Material> {
    const createdMaterial = new this.materialModel(material);
    return createdMaterial.save();
  }
}
