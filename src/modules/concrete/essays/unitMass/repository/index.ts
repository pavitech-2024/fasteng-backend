import { InjectModel } from '@nestjs/mongoose';
<<<<<<< HEAD
=======
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
>>>>>>> a83b56dda65f210ca5b55f713dd145821409bf70
import { Model } from 'mongoose';
import { UnitMass, UnitMassDocument } from '../schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';

export class UnitMassRepository {
  constructor(
    @InjectModel(UnitMass.name, DATABASE_CONNECTION.CONCRETE) private unitMassModel: Model<UnitMassDocument>,
  ) {}

  async findOne(unitMassFilterQuery: any): Promise<UnitMass> {
    return this.unitMassModel.findOne(unitMassFilterQuery);
  }

  async findById(id: string) {
    return this.unitMassModel.findById(id);
  } 

  async findAll(): Promise<UnitMass[]> {
    return this.unitMassModel.find();
  }

  // async findAllByMaterialId(unitMassFilterQuery: FilterQuery<UnitMass>): Promise<UnitMass[]> {
  //   return this.unitMassModel.find(unitMassFilterQuery);
  // }

  async findAllUnitMassesByMaterialId(materialId: string): Promise<UnitMass[]> {

    const unitMassEssays = await this.unitMassModel.find({ "generalData.material._id": materialId });

    return unitMassEssays
  }

  async create(unitMass: any): Promise<UnitMass> {
    const createdUnitMass = new this.unitMassModel(unitMass);

    return createdUnitMass.save();
  }
}
