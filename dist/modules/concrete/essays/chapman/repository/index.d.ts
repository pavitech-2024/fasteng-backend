import { Model } from 'mongoose';
import { Chapman, ChapmanDocument } from '../schemas';
export declare class ChapmanRepository {
    private chapmanModel;
    constructor(chapmanModel: Model<ChapmanDocument>);
    findOne(chapmanFilterQuery: any): Promise<Chapman>;
    findAll(): Promise<Chapman[]>;
    create(chapman: any): Promise<Chapman>;
}
