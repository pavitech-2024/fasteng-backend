import { SamplesService } from '../service';
import { Sample } from '../schemas';
import { CreateSampleDto } from '../dto/create-sample.dto';
export declare class SamplesController {
    private readonly samplesService;
    private logger;
    constructor(samplesService: SamplesService);
    createSample(sample: CreateSampleDto): Promise<Sample>;
    getAllByUserId(userId: string): Promise<Sample[]>;
    getSampleById(sampleId: string): Promise<any>;
    updateSampleById(sampleId: string, sample: Sample): Promise<Sample>;
    deleteSampleById(sampleId: string): Promise<Sample>;
}
