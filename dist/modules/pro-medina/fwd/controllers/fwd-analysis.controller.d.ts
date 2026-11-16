import { FwdAnalysisService } from '../service/fwd-analysis.service';
import { CreateFwdAnalysisDto } from '../dto/create-fwd-analysis.dto';
export declare class FwdAnalysisController {
    private readonly fwdAnalysisService;
    constructor(fwdAnalysisService: FwdAnalysisService);
    create(createFwdAnalysisDto: CreateFwdAnalysisDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFwdAnalysisDto: any): Promise<any>;
    remove(id: string): Promise<any>;
    processAnalysis(id: string): Promise<any>;
}
