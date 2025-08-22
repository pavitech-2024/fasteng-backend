import { SamplesRepository } from '../repository';
import { Sample } from '../schemas';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { GetEssaysBySample_Service } from './get-essays-by-sample.service';
export declare class SamplesService {
    private readonly samplesRepository;
    private readonly getEssaysBySample_Service;
    private logger;
    constructor(samplesRepository: SamplesRepository, getEssaysBySample_Service: GetEssaysBySample_Service);
    createSample(sample: CreateSampleDto): Promise<Sample>;
    getSample(sampleId: string): Promise<any>;
    getAllSamplesByUserId(userId: string): Promise<Sample[]>;
    updateSample(sample: Sample): Promise<Sample>;
    deleteSample(sampleId: string): Promise<Sample>;
}
