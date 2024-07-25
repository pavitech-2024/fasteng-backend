import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { CoarseAggregateSpecificMass, CoarseAggregateSpecificMassDocument } from "../schemas";
import { Model, FilterQuery } from "mongoose";

export class CoarseAggregateSpecificMassRepository {
  constructor(@InjectModel(CoarseAggregateSpecificMass.name, DATABASE_CONNECTION.CONCRETE) private coarseAggregateSpecificMassModel: Model<CoarseAggregateSpecificMassDocument>) {}

  async findOne(coarseAggregateSpecificMassFilterQuery: FilterQuery<CoarseAggregateSpecificMass>): Promise<CoarseAggregateSpecificMass> {
    return this.coarseAggregateSpecificMassModel.findOne(coarseAggregateSpecificMassFilterQuery);
  }

  async findById(id: string): Promise<CoarseAggregateSpecificMass> {
    return this.coarseAggregateSpecificMassModel.findById(id);
  }

  async findAll(): Promise<CoarseAggregateSpecificMass[]> {
    return this.coarseAggregateSpecificMassModel.find();
  }

  async findAllByMaterialId(unitMassFilterQuery: FilterQuery<CoarseAggregateSpecificMass>): Promise<CoarseAggregateSpecificMass[]> {
    return this.coarseAggregateSpecificMassModel.find(unitMassFilterQuery);
  }

  async findAllCoarseAggregateSpecificMasssByMaterialId(materialId: string, type: string): Promise<CoarseAggregateSpecificMass[]> {
    let coarseAggregateSpecificMassEssays;
    if (type === 'coarse') {
      coarseAggregateSpecificMassEssays = await this.coarseAggregateSpecificMassModel.find({
        "generalData.material._id": materialId,
        "results.nominal_diameter": {
          $gte: 9.5, // Maior ou igual a 9.5mm
          $lte: 37.5 // Menor ou igual a 37.5mm
        }
      });
    } else if (type === 'fine') {
      coarseAggregateSpecificMassEssays = await this.coarseAggregateSpecificMassModel.find({
        "generalData.material._id": materialId,
        "results.fineness_module": {
          $gte: 1.8, // Maior ou igual a 9.5mm
          $lte: 3.6 // Menor ou igual a 37.5mm
        }
      });
    }

    return coarseAggregateSpecificMassEssays;
  }


  async create(coarseAggregateSpecificMass: any): Promise<CoarseAggregateSpecificMass> {
    const createdCoarseAggregateSpecificMass = new this.coarseAggregateSpecificMassModel(coarseAggregateSpecificMass);

    return createdCoarseAggregateSpecificMass.save();
  }
}