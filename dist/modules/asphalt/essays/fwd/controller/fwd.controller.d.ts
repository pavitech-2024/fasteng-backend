import { FwdAnalysisService } from '../services/fwd.service';
import { CreateFwdAnalysisDto } from '../dto/create-fwd-analysis.dto';
export declare class FwdAnalysisController {
    private readonly fwdAnalysisService;
    constructor(fwdAnalysisService: FwdAnalysisService);
    create(createFwdAnalysisDto: CreateFwdAnalysisDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateFwdAnalysisDto: any): any;
    remove(id: string): any;
    processAnalysis(id: string): any;
}
