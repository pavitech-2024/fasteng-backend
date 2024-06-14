import { InjectModel } from "@nestjs/mongoose/dist";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model, FilterQuery } from "mongoose";
import { Rt, RtDocument } from "../schemas";

export class ConcreteRtRepository {
    constructor(@InjectModel(Rt.name, DATABASE_CONNECTION.CONCRETE) private rtModel: Model<RtDocument>) {}
  
    async findOne(rtFilterQuery: FilterQuery<Rt>): Promise<Rt> {
      return this.rtModel.findOne(rtFilterQuery);
    }
  
    async findById(id: string): Promise<Rt> {
      return this.rtModel.findById(id);
    }
  
    async findAll(): Promise<Rt[]> {
      return this.rtModel.find();
    }
  
    async findAllByMaterialId(unitMassFilterQuery: FilterQuery<Rt>): Promise<Rt[]> {
      return this.rtModel.find(unitMassFilterQuery);
    }
  
    async findAllRtsByMaterialId(materialId: string, type: string): Promise<Rt[]> {
      let rtEssays;
      if (type === 'coarse') {
        rtEssays = await this.rtModel.find({
          "generalData.material._id": materialId,
          "results.nominal_diameter": {
            $gte: 9.5, // Maior ou igual a 9.5mm
            $lte: 37.5 // Menor ou igual a 37.5mm
          }
        });
      } else if (type === 'fine') {
        rtEssays = await this.rtModel.find({
          "generalData.material._id": materialId,
          "results.fineness_module": {
            $gte: 1.8, // Maior ou igual a 9.5mm
            $lte: 3.6 // Menor ou igual a 37.5mm
          }
        });
      }
  
      return rtEssays;
    }
  
  
    async create(rt: any): Promise<Rt> {
      const createdRt = new this.rtModel(rt);
  
      return createdRt.save();
    }
  }