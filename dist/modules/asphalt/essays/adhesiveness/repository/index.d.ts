import { Model } from "mongoose";
import { Adhesiveness, AdhesivenessDocument } from "../schemas";
export declare class AdhesivenessRepository {
    private adhesivenessModel;
    constructor(adhesivenessModel: Model<AdhesivenessDocument>);
    findOne(adhesivenessFilterQuery: any): Promise<Adhesiveness>;
    findAll(): Promise<Adhesiveness[]>;
    create(adhesiveness: any): Promise<Adhesiveness>;
}
