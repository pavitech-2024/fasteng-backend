import { IggAnalysisService } from '../service/igg-analysis.service';
import { CreateIggAnalysisDto } from '../dto/create-igg-analysis.dto';
import { UpdateIggAnalysisDto } from '../dto/update-igg-analysis.dto';
export declare class IggAnalysisController {
    private readonly iggAnalysisService;
    private logger;
    constructor(iggAnalysisService: IggAnalysisService);
    create(createIggAnalysisDto: CreateIggAnalysisDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateIggAnalysisDto: UpdateIggAnalysisDto): Promise<any>;
    remove(id: string): Promise<any>;
    processAnalysis(id: string): Promise<any>;
}
