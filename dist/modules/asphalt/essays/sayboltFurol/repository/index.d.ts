import { Model } from "mongoose";
import { SayboltFurol, SayboltFurolDocument } from "../schemas";
export declare class SayboltFurolRepository {
    private sayboltFurolModel;
    constructor(sayboltFurolModel: Model<SayboltFurolDocument>);
    findOne(sayboltFurolFilterQuery: any): Promise<SayboltFurol>;
    findById(materialId: any): Promise<SayboltFurol>;
    findAll(): Promise<SayboltFurol[]>;
    create(sayboltFurol: any): Promise<SayboltFurol>;
}
