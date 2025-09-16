import { CbrRepository } from "../../essays/cbr/repository";
import { CompressionRepository } from "../../essays/compression/repository";
import { HrbRepository } from "../../essays/hrb/repository";
import { SucsRepository } from "../../essays/sucs/repository";
import { Model } from "mongoose";
import { SampleDocument } from "../schemas";
import { GranulometryRepository } from "../../essays/granulometry/repository";
export declare class GetEssaysBySample_Service {
    private sampleModel;
    private readonly granulometryRepository;
    private readonly cbrRepository;
    private readonly hrbRepository;
    private readonly sucsRepository;
    private readonly compressionRepository;
    private logger;
    constructor(sampleModel: Model<SampleDocument>, granulometryRepository: GranulometryRepository, cbrRepository: CbrRepository, hrbRepository: HrbRepository, sucsRepository: SucsRepository, compressionRepository: CompressionRepository);
    getEssaysBySample(sample: any): Promise<any[]>;
    findTypeExperiment(typeSample: any): string[];
}
