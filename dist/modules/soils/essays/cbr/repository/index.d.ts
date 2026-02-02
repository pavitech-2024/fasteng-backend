import { Cbr, CbrDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class CbrRepository {
    private cbrModel;
    constructor(cbrModel: Model<CbrDocument>);
    findOne(cbrFilterQuery: any): Promise<Cbr>;
    findAll(): Promise<Cbr[]>;
    create(cbr: any): Promise<Cbr>;
}
