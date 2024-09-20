import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model, FilterQuery } from "mongoose";
import { RC, RCDocument } from "../schemas";


export class ConcreteRCRepository {
  constructor(@InjectModel(RC.name, DATABASE_CONNECTION.CONCRETE) private rcModel: Model<RCDocument>) {}

  async findOne(rcFilterQuery: FilterQuery<RC>): Promise<RC> {
    return this.rcModel.findOne(rcFilterQuery);
  }

  async findById(id: string): Promise<RC> {
    return this.rcModel.findById(id);
  }

  async findAll(): Promise<RC[]> {
    return this.rcModel.find();
  }

  async findAllByMaterialId(unitMassFilterQuery: FilterQuery<RC>): Promise<RC[]> {
    return this.rcModel.find(unitMassFilterQuery);
  }

  async findAllRCsByMaterialId(materialId: string, type: string): Promise<RC[]> {
    let rcEssays;
    if (type === 'coarse') {
      rcEssays = await this.rcModel.find({
        "generalData.material._id": materialId,
        "results.nominal_diameter": {
          $gte: 9.5, // Maior ou igual a 9.5mm
          $lte: 37.5 // Menor ou igual a 37.5mm
        }
      });
    } else if (type === 'fine') {
      rcEssays = await this.rcModel.find({
        "generalData.material._id": materialId,
        "results.fineness_module": {
          $gte: 1.8, // Maior ou igual a 9.5mm
          $lte: 3.6 // Menor ou igual a 37.5mm
        }
      });
    }

    return rcEssays;
  }


  async create(rc: any): Promise<RC> {
    const createdRC = new this.rcModel(rc);

    return createdRC.save();
  }
}