import { Model } from 'mongoose';
import { IggAnalysis, IggAnalysisDocument } from '../schema/igg-analysis.schema';
export declare class IggAnalysisRepository {
    private iggAnalysisModel;
    constructor(iggAnalysisModel: Model<IggAnalysisDocument>);
    create(createIggAnalysisDto: any): Promise<IggAnalysis>;
    findAll(): Promise<IggAnalysis[]>;
    findById(id: string): Promise<IggAnalysis>;
    update(id: string, updateData: any): Promise<IggAnalysis>;
    delete(id: string): Promise<IggAnalysis>;
    findByUserId(userId: string): Promise<IggAnalysis[]>;
}
