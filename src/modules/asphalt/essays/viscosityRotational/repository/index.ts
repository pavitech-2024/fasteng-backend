import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { ViscosityRotational, ViscosityRotationalDocument } from '../schemas';

export class ViscosityRotationalRepository {
  constructor(
    @InjectModel(ViscosityRotational.name, DATABASE_CONNECTION.ASPHALT)
    private viscosityRotationalModel: Model<ViscosityRotationalDocument>,
  ) {}

  async findOne(sayboltFurolFilterQuery: any): Promise<ViscosityRotational> {
    return this.viscosityRotationalModel.findOne(sayboltFurolFilterQuery);
  }

  async findById(materialId: any): Promise<ViscosityRotational> {
    return this.viscosityRotationalModel.findById(materialId);
  }

  async findAll(): Promise<ViscosityRotational[]> {
    return this.viscosityRotationalModel.find();
  }

  async create(viscosityRotational: any): Promise<ViscosityRotational> {
    const createdSayboltFurol = new this.viscosityRotationalModel(viscosityRotational);

    return createdSayboltFurol.save();
  }
}
