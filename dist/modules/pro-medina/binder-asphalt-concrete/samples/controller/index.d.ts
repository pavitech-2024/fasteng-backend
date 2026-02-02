import { BinderAsphaltConcrete_Sample } from '../schemas';
import { BinderAsphaltConcreteSamplesService } from '../service/binder-asphalt-concrete-samples.service';
import { CreateBinderAsphaltConcreteSampleDto } from '../dto/create-binder-asphalt-concrete-samples.dto';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';
export declare class BinderAsphaltConcreteSamplesController {
    private readonly binderAsphaltConcreteSamplesService;
    private logger;
    constructor(binderAsphaltConcreteSamplesService: BinderAsphaltConcreteSamplesService);
    createSample(sample: CreateBinderAsphaltConcreteSampleDto): Promise<BinderAsphaltConcrete_Sample | {
        success: boolean;
        error: {
            name: string;
            message: any;
        };
    }>;
    getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    getAllSamples(page?: number, limit?: number): Promise<BinderAsphaltConcrete_Sample[]>;
    getSampleById(sampleId: string): Promise<BinderAsphaltConcrete_Sample>;
    updateSampleById(sampleId: string, sample: BinderAsphaltConcrete_Sample): Promise<BinderAsphaltConcrete_Sample>;
    deleteSampleById(sampleId: string): Promise<BinderAsphaltConcrete_Sample>;
}
