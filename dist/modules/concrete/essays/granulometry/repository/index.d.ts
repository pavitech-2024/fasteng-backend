import { Granulometry, GranulometryDocument } from '../schemas';
import { Model, FilterQuery } from 'mongoose';
export declare class ConcreteGranulometryRepository {
    private granulometryModel;
    constructor(granulometryModel: Model<GranulometryDocument>);
    findOne(granulometryFilterQuery: FilterQuery<Granulometry>): Promise<Granulometry>;
    findById(id: string): Promise<Granulometry>;
    findAll(): Promise<Granulometry[]>;
    findAllByMaterialId(unitMassFilterQuery: FilterQuery<Granulometry>): Promise<Granulometry[]>;
    findAllGranulometrysByMaterialId(materialId: string, type: string): Promise<Granulometry[]>;
    create(granulometry: any): Promise<Granulometry>;
}
