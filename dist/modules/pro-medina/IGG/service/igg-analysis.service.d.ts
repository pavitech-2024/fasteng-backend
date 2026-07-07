import { IggAnalysisRepository } from '../repository/igg-analysis.repository';
import { CreateIggAnalysisDto } from '../dto/create-igg-analysis.dto';
export declare class IggAnalysisService {
    private readonly iggAnalysisRepository;
    constructor(iggAnalysisRepository: IggAnalysisRepository);
    create(createIggAnalysisDto: CreateIggAnalysisDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateIggAnalysisDto: any): Promise<any>;
    remove(id: string): Promise<any>;
    processAnalysis(id: string): Promise<any>;
}
