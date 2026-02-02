import { Angularity, AngularityDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class AngularityRepository {
    private angularityModel;
    private logger;
    constructor(angularityModel: Model<AngularityDocument>);
    findOne(angularityFilterQuery: any): Promise<Angularity>;
    findAll(): Promise<Angularity[]>;
    create(angularity: any): Promise<Angularity>;
}
