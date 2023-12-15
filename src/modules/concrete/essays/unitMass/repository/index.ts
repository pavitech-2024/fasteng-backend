import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { FilterQuery, Model } from 'mongoose';
import { UnitMass, UnitMassDocument } from '../schemas';

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
