import { CreateGranularLayersSampleDto } from '../dto/create-granular-layers-sample.dto';
import { GranularLayers_SamplesRepository } from '../repository';
import { GranularLayers_Sample } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';
export declare class GranularLayersSamplesService {
    private readonly granularLayers_SamplesRepository;
    private logger;
    constructor(granularLayers_SamplesRepository: GranularLayers_SamplesRepository);
    createSample(sample: CreateGranularLayersSampleDto): Promise<GranularLayers_Sample>;
    getAllSamples(): Promise<GranularLayers_Sample[]>;
    getSample(sampleId: string): Promise<GranularLayers_Sample>;
    getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    updateSample(sample: GranularLayers_Sample): Promise<GranularLayers_Sample>;
    deleteSample(sampleId: string): Promise<GranularLayers_Sample>;
}
