import { FwdAnalysisRepository } from '../repository/fwd-analysis.repository';
import { CreateFwdAnalysisDto } from '../dto/create-fwd-analysis.dto';
export declare class FwdAnalysisService {
    private readonly fwdAnalysisRepository;
    constructor(fwdAnalysisRepository: FwdAnalysisRepository);
    create(createFwdAnalysisDto: CreateFwdAnalysisDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFwdAnalysisDto: any): Promise<any>;
    remove(id: string): Promise<any>;
    processAnalysis(id: string): Promise<any>;
}
