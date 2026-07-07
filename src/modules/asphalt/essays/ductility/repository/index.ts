import { InjectModel } from '@nestjs/mongoose';
import { Ductility, DuctilityDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';

export class DuctilityRepository {
  constructor(
    @InjectModel(Ductility.name, DATABASE_CONNECTION.ASPHALT) 
    private ductilityModel: Model<DuctilityDocument>
  ) {}

  async findOne(ductilityFilterQuery: any): Promise<Ductility> {
    return this.ductilityModel.findOne(ductilityFilterQuery);
  }

  async findAll(): Promise<Ductility[]> {
    return this.ductilityModel.find();
  }

  async create(ductility: any): Promise<Ductility> {
    const createdDuctility = new this.ductilityModel(ductility);
    return createdDuctility.save();
  }

  async listAllDocuments(): Promise<any[]> {
    const allDocs = await this.ductilityModel.find({});
    return allDocs.map(doc => ({
      id: doc._id,
      name: doc.generalData?.name,
      userId: doc.generalData?.userId,
      materialId: doc.generalData?.material?._id,
    }));
  }

  async find(filterQuery: any = {}): Promise<Ductility[]> {
    return this.ductilityModel.find(filterQuery);
  }
}