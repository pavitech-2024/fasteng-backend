import { Granulometry, GranulometryDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class GranulometryRepository {
    private granulometryModel;
    private logger;
    constructor(granulometryModel: Model<GranulometryDocument>);
    findOne(granulometryFilterQuery: any): Promise<Granulometry>;
    findAllBySample(granulometryFilterQuery: any): Promise<Granulometry[]>;
    findAll(): Promise<Granulometry[]>;
    create(granulometry: any): Promise<Granulometry>;
}
