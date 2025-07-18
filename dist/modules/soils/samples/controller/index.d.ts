import { SamplesService } from '../service';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { Sample } from '../schemas';
export declare class SamplesController {
    private readonly samplesService;
    private logger;
    constructor(samplesService: SamplesService);
    createSample(sample: CreateSampleDto, userId: string): Promise<Sample>;
    getAllByUserId(userId: string): Promise<{
        materials: Sample[];
    }[]>;
    getSampleById(sampleId: string): Promise<any>;
    updateSampleById(sampleId: string, sample: Sample): Promise<Sample>;
    deleteSampleById(sampleId: string): Promise<Sample>;
}
