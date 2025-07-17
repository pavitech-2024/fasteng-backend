import { Model } from 'mongoose';
import { Rtcd, RtcdDocument } from '../schemas';
export declare class RtcdRepository {
    private rtcdModel;
    constructor(rtcdModel: Model<RtcdDocument>);
    findOne(rtcdFilterQuery: any): Promise<Rtcd>;
    findAll(): Promise<Rtcd[]>;
    create(rtcd: any): Promise<Rtcd>;
}
