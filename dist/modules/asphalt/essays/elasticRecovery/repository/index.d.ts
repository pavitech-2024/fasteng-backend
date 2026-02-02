import { Model } from "mongoose";
import { ElasticRecovery, ElasticRecoveryDocument } from "../schema";
export declare class ElasticRecoveryRepository {
    private elasticRecoveryModel;
    constructor(elasticRecoveryModel: Model<ElasticRecoveryDocument>);
    findOne(elasticRecoveryFilterQuery: any): Promise<ElasticRecovery>;
    findAll(): Promise<ElasticRecovery[]>;
    create(elasticRecovery: any): Promise<ElasticRecovery>;
}
