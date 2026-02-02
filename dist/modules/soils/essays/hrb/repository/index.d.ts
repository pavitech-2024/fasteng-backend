import { Model } from 'mongoose';
import { Hrb, HrbDocument } from '../schemas';
export declare class HrbRepository {
    private hrbModel;
    constructor(hrbModel: Model<HrbDocument>);
    findOne(hrbFilterQuery: any): Promise<Hrb>;
    findAll(): Promise<Hrb[]>;
    create(hrb: any): Promise<Hrb>;
}
