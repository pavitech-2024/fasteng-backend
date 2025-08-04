/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
