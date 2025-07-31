import { SpecifyMass, SpecifyMassDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class SpecifyMassRepository {
    private specifyMassModel;
    private logger;
    constructor(specifyMassModel: Model<SpecifyMassDocument>);
    findOne(specifyMassFilterQuery: any): Promise<SpecifyMass>;
    findAll(): Promise<SpecifyMass[]>;
    create(specifyMass: any): Promise<SpecifyMass>;
}
