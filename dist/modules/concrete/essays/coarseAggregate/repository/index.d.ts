import { CoarseAggregateSpecificMass, CoarseAggregateSpecificMassDocument } from "../schemas";
import { Model, FilterQuery } from "mongoose";
export declare class CoarseAggregateSpecificMassRepository {
    private coarseAggregateSpecificMassModel;
    constructor(coarseAggregateSpecificMassModel: Model<CoarseAggregateSpecificMassDocument>);
    findOne(coarseAggregateSpecificMassFilterQuery: FilterQuery<CoarseAggregateSpecificMass>): Promise<CoarseAggregateSpecificMass>;
    findById(id: string): Promise<CoarseAggregateSpecificMass>;
    findAll(): Promise<CoarseAggregateSpecificMass[]>;
    findAllByMaterialId(unitMassFilterQuery: FilterQuery<CoarseAggregateSpecificMass>): Promise<CoarseAggregateSpecificMass[]>;
    findAllCoarseAggregateSpecificMasssByMaterialId(materialId: string, type: string): Promise<CoarseAggregateSpecificMass[]>;
    create(coarseAggregateSpecificMass: any): Promise<CoarseAggregateSpecificMass>;
}
