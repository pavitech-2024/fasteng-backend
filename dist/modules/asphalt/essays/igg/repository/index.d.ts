import { Model, FilterQuery } from 'mongoose';
import { Igg, IggDocument } from '../schemas';
export declare class IggRepository {
    private iggModel;
    constructor(iggModel: Model<IggDocument>);
    findOne(iggFilterQuery: FilterQuery<Igg>): Promise<Igg>;
    findAll(): Promise<Igg[]>;
    findAllByUserId(id: string): Promise<Igg[]>;
    create(igg: any): Promise<Igg>;
}
