import { FwdService } from '../services/fwd.service';
import { CreateFwdAnalysisDto } from '../dto/create.fwd.dto';
export declare class FwdAnalysisController {
    private readonly FwdService;
    constructor(FwdService: FwdService);
    create(createFwdAnalysisDto: CreateFwdAnalysisDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFwdAnalysisDto: any): Promise<any>;
    remove(id: string): Promise<any>;
    processAnalysis(id: string): Promise<any>;
}
