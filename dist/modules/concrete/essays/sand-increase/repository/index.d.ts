import { FilterQuery, Model } from "mongoose";
import { SandIncrease, SandIncreaseDocument } from "../schema";
export declare class SandIncreaseRepository {
    private sandIncreaseModel;
    constructor(sandIncreaseModel: Model<SandIncreaseDocument>);
    findOne(sandIncreaseFilterQuery: FilterQuery<any>): Promise<any>;
    create(sandIncrease: any): Promise<SandIncrease>;
}
