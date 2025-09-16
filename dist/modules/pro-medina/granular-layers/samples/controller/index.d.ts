import { GranularLayersSamplesService } from '../service/granular-layers-samples.service';
import { CreateGranularLayersSampleDto } from '../dto/create-granular-layers-sample.dto';
import { GranularLayers_Sample } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';
export declare class GranularLayersSamplesController {
    private readonly granularLayersSamplesService;
    private logger;
    constructor(granularLayersSamplesService: GranularLayersSamplesService);
    createSample(sample: CreateGranularLayersSampleDto): Promise<GranularLayers_Sample | {
        success: boolean;
        error: {
            name: string;
            message: any;
        };
    }>;
    getAll(): Promise<GranularLayers_Sample[]>;
    getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    getSampleById(sampleId: string): Promise<GranularLayers_Sample>;
    updateSampleById(sampleId: string, sample: GranularLayers_Sample): Promise<GranularLayers_Sample>;
    deleteSampleById(sampleId: string): Promise<GranularLayers_Sample>;
}
