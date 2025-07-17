import { FilterQuery, Model } from 'mongoose';
import { Material, MaterialDocument } from '../schemas';
export declare class MaterialsRepository {
    private materialModel;
    constructor(materialModel: Model<MaterialDocument>);
    create(material: any): Promise<Material>;
    find(ids?: any): Promise<Material[]>;
    findOne(materialsFilterQuery: FilterQuery<Material>): Promise<Material>;
    findByType(types: any, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Material> & Material & Required<{
        _id: string;
    }>> & import("mongoose").Document<unknown, {}, Material> & Material & Required<{
        _id: string;
    }>)[]>;
    findById(materialId: string): Promise<Material>;
    findSelectedById(ids: string[]): Promise<Material[]>;
    findByUserId(materialsFilterQuery: FilterQuery<Material>): Promise<Material[]>;
    findOneAndUpdate(materialsFilterQuery: FilterQuery<Material>, material: Partial<Material>): Promise<Material>;
    findOneAndDelete(materialsFilterQuery: FilterQuery<Material>): Promise<Material>;
}
