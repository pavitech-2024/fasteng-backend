import { Model, FilterQuery } from "mongoose";
import { RC, RCDocument } from "../schemas";
export declare class ConcreteRCRepository {
    private rcModel;
    constructor(rcModel: Model<RCDocument>);
    findOne(rcFilterQuery: FilterQuery<RC>): Promise<RC>;
    findById(id: string): Promise<RC>;
    findAll(): Promise<RC[]>;
    findAllByMaterialId(unitMassFilterQuery: FilterQuery<RC>): Promise<RC[]>;
    create(rc: any): Promise<RC>;
}
