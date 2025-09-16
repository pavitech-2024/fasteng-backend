import { Model } from "mongoose";
import { SofteningPoint, SofteningPointDocument } from "../schemas";
export declare class SofteningPointRepository {
    private softeningPointModel;
    constructor(softeningPointModel: Model<SofteningPointDocument>);
    findOne(softeningPointFilterQuery: any): Promise<SofteningPoint>;
    findAll(): Promise<SofteningPoint[]>;
    create(softeningPoint: any): Promise<SofteningPoint>;
    findAllByMaterialId(materialId: string): Promise<SofteningPoint[]>;
}
