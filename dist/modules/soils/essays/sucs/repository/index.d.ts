import { Sucs, SucsDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class SucsRepository {
    private sucsModel;
    private logger;
    constructor(sucsModel: Model<SucsDocument>);
    findOne(sucsFilterQuery: any): Promise<Sucs>;
    findAll(): Promise<Sucs[]>;
    create(sucs: any): Promise<Sucs>;
}
