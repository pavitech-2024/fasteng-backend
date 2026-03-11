import { Model } from 'mongoose';
import { UnitMass, UnitMassDocument } from '../schemas';
export declare class UnitMassRepository {
    private unitMassModel;
    constructor(unitMassModel: Model<UnitMassDocument>);
    findOne(unitMassFilterQuery: any): Promise<UnitMass>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, UnitMass> & UnitMass & Required<{
        _id: string;
    }>> & import("mongoose").Document<unknown, {}, UnitMass> & UnitMass & Required<{
        _id: string;
    }>>;
    findAll(): Promise<UnitMass[]>;
    findAllUnitMassesByMaterialId(materialId: string): Promise<UnitMass[]>;
    create(unitMass: any): Promise<UnitMass>;
}
