import { Ductility, DuctilityDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class DuctilityRepository {
    private ductilityModel;
    private logger;
    constructor(ductilityModel: Model<DuctilityDocument>);
    findOne(ductilityFilterQuery: any): Promise<Ductility>;
    findAll(): Promise<Ductility[]>;
    create(ductility: any): Promise<Ductility>;
}
