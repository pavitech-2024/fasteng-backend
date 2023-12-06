import { InjectModel } from '@nestjs/mongoose';
<<<<<<< HEAD
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
=======
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { FilterQuery, Model } from 'mongoose';
>>>>>>> 70548140e675219f3d42284300c7b7e2f82f3b02
import { UnitMass, UnitMassDocument } from '../schemas';

export class UnitMassRepository {
  constructor(
    @InjectModel(UnitMass.name, DATABASE_CONNECTION.CONCRETE) private unitMassModel: Model<UnitMassDocument>,
  ) {}

  async findOne(unitMassFilterQuery: any): Promise<UnitMass> {
    return this.unitMassModel.findOne(unitMassFilterQuery);
  }

  async findAll(): Promise<UnitMass[]> {
    return this.unitMassModel.find();
  }

  async findAllByMaterialId(unitMassFilterQuery: FilterQuery<UnitMass>): Promise<UnitMass[]> {
    return this.unitMassModel.find(unitMassFilterQuery);
  }

  async create(unitMass: any): Promise<UnitMass> {
    const createdUnitMass = new this.unitMassModel(unitMass);

    return createdUnitMass.save();
  }
}
