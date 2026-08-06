import { FwdRepository } from '../repository/fwd.repository';
import { CreateFwdAnalysisDto } from '../dto/create.fwd.dto';
export declare class FwdService {
    private readonly fwdAnalysisRepository;
    constructor(fwdAnalysisRepository: FwdRepository);
    create(createFwdAnalysisDto: CreateFwdAnalysisDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFwdAnalysisDto: any): Promise<any>;
    remove(id: string): Promise<any>;
    processAnalysis(id: string): Promise<any>;
}
