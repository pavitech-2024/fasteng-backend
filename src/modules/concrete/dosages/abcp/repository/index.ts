import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { ABCP, ABCPDocument } from "../schemas";

export class ABCPRepository {
    constructor(@InjectModel(ABCP.name, DATABASE_CONNECTION.CONCRETE) private abcpModel: Model<ABCPDocument>) {}

    async findOne(abcpFilterQuery: any): Promise<ABCP> {
        return this.abcpModel.findOne(abcpFilterQuery);
    }
}