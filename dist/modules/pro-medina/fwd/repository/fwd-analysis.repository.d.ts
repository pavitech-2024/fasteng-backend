import { Model } from 'mongoose';
import { FwdAnalysis, FwdAnalysisDocument } from '../schemas/fwd-analysis.schema';
export declare class FwdAnalysisRepository {
    private fwdAnalysisModel;
    constructor(fwdAnalysisModel: Model<FwdAnalysisDocument>);
    create(createFwdAnalysisDto: any): Promise<FwdAnalysis>;
    findAll(): Promise<FwdAnalysis[]>;
    findById(id: string): Promise<FwdAnalysis>;
    update(id: string, updateData: any): Promise<FwdAnalysis>;
    delete(id: string): Promise<FwdAnalysis>;
    findByUserId(userId: string): Promise<FwdAnalysis[]>;
}
