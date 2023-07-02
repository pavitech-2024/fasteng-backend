import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { Compression, CompressionDocument } from "../schema";


export class CompressionRepository {
  constructor(
    @InjectModel(Compression.name, DATABASE_CONNECTION.SOILS)
    private compressionModel: Model<CompressionDocument>
  ) {}
}