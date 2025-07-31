import { Model, FilterQuery } from 'mongoose';
import { Fwd, FwdDocument } from '../schema';
export declare class FwdRepository {
    private fwdModel;
    constructor(fwdModel: Model<FwdDocument>);
    findOne(fwdFilterQuery: FilterQuery<Fwd>): Promise<Fwd>;
    findAll(): Promise<Fwd[]>;
    findAllByUserId(id: string): Promise<Fwd[]>;
    create(fwd: any): Promise<Fwd>;
}
