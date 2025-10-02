import { Model, FilterQuery } from "mongoose";
import { AsphaltGranulometry, AsphaltGranulometryDocument } from "../schemas";
export declare class AsphaltGranulometryRepository {
    private granulometryModel;
    constructor(granulometryModel: Model<AsphaltGranulometryDocument>);
    findOne(granulometryFilterQuery: FilterQuery<AsphaltGranulometry>): Promise<AsphaltGranulometry>;
    findAll(): Promise<AsphaltGranulometry[]>;
    findById(ids: string[]): Promise<AsphaltGranulometry[]>;
    create(granulometry: any): Promise<AsphaltGranulometry>;
    findByMaterialId(materialId: string): Promise<AsphaltGranulometry[]>;
}
