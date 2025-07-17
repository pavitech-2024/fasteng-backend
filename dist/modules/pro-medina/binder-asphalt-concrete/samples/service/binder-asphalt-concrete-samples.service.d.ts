import { BinderAsphaltConcrete_SamplesRepository } from "../repository";
import { BinderAsphaltConcrete_Sample } from "../schemas";
import { CreateBinderAsphaltConcreteSampleDto } from "../dto/create-binder-asphalt-concrete-samples.dto";
import { CommonQueryFilter } from "../../../../../utils/queryFilter";
export declare class BinderAsphaltConcreteSamplesService {
    private readonly binderAsphaltConcrete_SamplesRepository;
    private logger;
    constructor(binderAsphaltConcrete_SamplesRepository: BinderAsphaltConcrete_SamplesRepository);
    createSample(sample: CreateBinderAsphaltConcreteSampleDto): Promise<BinderAsphaltConcrete_Sample>;
    getAllSamples(options: {
        page: number;
        limit: number;
    }): Promise<BinderAsphaltConcrete_Sample[]>;
    getSample(sampleId: string): Promise<BinderAsphaltConcrete_Sample>;
    getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    updateSample(sample: BinderAsphaltConcrete_Sample): Promise<BinderAsphaltConcrete_Sample>;
    deleteSample(sampleId: string): Promise<BinderAsphaltConcrete_Sample>;
}
