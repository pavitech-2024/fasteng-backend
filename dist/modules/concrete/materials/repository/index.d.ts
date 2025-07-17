import { Model, FilterQuery } from 'mongoose';
import { Material, MaterialDocument } from '../schemas';
export declare class MaterialsRepository {
    private materialModel;
    constructor(materialModel: Model<MaterialDocument>);
    create(material: any): Promise<Material>;
    findOne(materialsFilterQuery: any): Promise<Material>;
    findByUserId(materialsFilterQuery: FilterQuery<Material>): Promise<Material[]>;
    find(): Promise<Material[]>;
    findById(id: string): Promise<Material>;
    findOneAndUpdate(materialsFilterQuery: any, material: Partial<Material>): Promise<Material>;
    findOneAndDelete(materialsFilterQuery: any): Promise<Material>;
}
