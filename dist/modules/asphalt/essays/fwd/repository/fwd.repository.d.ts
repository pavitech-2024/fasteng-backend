import { Model } from 'mongoose';
import { FwdAnalysis, FwdAnalysisDocument } from '../schema/fwd.schema';
export declare class FwdRepository {
    private fwdAnalysisModel;
    constructor(fwdAnalysisModel: Model<FwdAnalysisDocument>);
    create(createFwdAnalysisDto: any): Promise<FwdAnalysis>;
    findAll(): Promise<FwdAnalysis[]>;
    findById(id: string): Promise<FwdAnalysis>;
    update(id: string, updateData: any): Promise<FwdAnalysis>;
    delete(id: string): Promise<FwdAnalysis>;
    findByUserId(userId: string): Promise<FwdAnalysis[]>;
}
