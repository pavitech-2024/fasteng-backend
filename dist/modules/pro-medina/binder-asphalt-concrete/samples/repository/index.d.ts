import { Model } from 'mongoose';
import { BinderAsphaltConcrete_Sample, BinderAsphaltConcrete_SamplesDocument } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';
export declare class BinderAsphaltConcrete_SamplesRepository {
    private binderAsphaltConcrete_sampleModel;
    constructor(binderAsphaltConcrete_sampleModel: Model<BinderAsphaltConcrete_SamplesDocument>);
    create(binderAsphaltConcrete_sample: any): Promise<BinderAsphaltConcrete_Sample>;
    find(): Promise<BinderAsphaltConcrete_Sample[]>;
    findAll(options: {
        page: number;
        limit: number;
    }): Promise<any>;
    findAllByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    findOne(binderAsphaltConcrete_samplesFilterQuery: any): Promise<BinderAsphaltConcrete_Sample>;
    findOneById(sampleId: string): Promise<BinderAsphaltConcrete_Sample>;
    findOneAndUpdate(binderAsphaltConcrete_samplesFilterQuery: any, binderAsphaltConcrete_sample: Partial<BinderAsphaltConcrete_Sample>): Promise<BinderAsphaltConcrete_Sample>;
    findOneAndDelete(binderAsphaltConcrete_samplesFilterQuery: any): Promise<BinderAsphaltConcrete_Sample>;
}
