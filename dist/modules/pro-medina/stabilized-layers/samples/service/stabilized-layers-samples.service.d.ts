import { StabilizedLayers_SamplesRepository } from '../repository';
import { StabilizedLayers_Sample } from '../schemas';
import { CreateStabilizedLayersSampleDto } from '../dto/create-stabilized-layers-sample.dto';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';
export declare class StabilizedLayersSamplesService {
    private readonly stabilizedLayers_SamplesRepository;
    private logger;
    constructor(stabilizedLayers_SamplesRepository: StabilizedLayers_SamplesRepository);
    createSample(sample: CreateStabilizedLayersSampleDto): Promise<StabilizedLayers_Sample>;
    getAllSamples(options: {
        page: number;
        limit: number;
    }): Promise<any>;
    getSample(sampleId: string): Promise<StabilizedLayers_Sample>;
    getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    updateSample(sample: StabilizedLayers_Sample): Promise<StabilizedLayers_Sample>;
    deleteSample(sampleId: string): Promise<StabilizedLayers_Sample>;
}
