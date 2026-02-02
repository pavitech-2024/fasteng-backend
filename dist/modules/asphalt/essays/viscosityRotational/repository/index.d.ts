import { Model } from 'mongoose';
import { ViscosityRotational, ViscosityRotationalDocument } from '../schemas';
export declare class ViscosityRotationalRepository {
    private viscosityRotationalModel;
    constructor(viscosityRotationalModel: Model<ViscosityRotationalDocument>);
    findOne(sayboltFurolFilterQuery: any): Promise<ViscosityRotational>;
    findById(materialId: any): Promise<ViscosityRotational>;
    findAll(): Promise<ViscosityRotational[]>;
    create(viscosityRotational: any): Promise<ViscosityRotational>;
}
