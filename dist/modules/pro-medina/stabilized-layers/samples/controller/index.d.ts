import { StabilizedLayers_Sample } from '../schemas';
import { StabilizedLayersSamplesService } from '../service/stabilized-layers-samples.service';
import { CreateStabilizedLayersSampleDto } from '../dto/create-stabilized-layers-sample.dto';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';
export declare class StabilizedLayersSamplesController {
    private readonly stabilizedLayersSamplesService;
    private logger;
    constructor(stabilizedLayersSamplesService: StabilizedLayersSamplesService);
    createSample(sample: CreateStabilizedLayersSampleDto): Promise<StabilizedLayers_Sample | {
        success: boolean;
        error: {
            name: string;
            message: any;
        };
    }>;
    getAllSamples(page?: number, limit?: number): Promise<any>;
    getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    getSampleById(sampleId: string): Promise<StabilizedLayers_Sample>;
    updateSampleById(sampleId: string, sample: StabilizedLayers_Sample): Promise<StabilizedLayers_Sample>;
    deleteSampleById(sampleId: string): Promise<StabilizedLayers_Sample>;
}
