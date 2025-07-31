import { Model, FilterQuery } from "mongoose";
import { RT, RtDocument } from "../schemas";
export declare class ConcreteRtRepository {
    private rtModel;
    constructor(rtModel: Model<RtDocument>);
    findOne(rtFilterQuery: FilterQuery<RT>): Promise<RT>;
    findById(id: string): Promise<RT>;
    findAll(): Promise<RT[]>;
    findAllByMaterialId(unitMassFilterQuery: FilterQuery<RT>): Promise<RT[]>;
    findAllRtsByMaterialId(materialId: string, type: string): Promise<RT[]>;
    create(rt: any): Promise<RT>;
}
