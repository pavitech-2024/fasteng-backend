import { MaterialsRepository } from "../../../materials/repository";
import { CoarseAggregateSpecificMassRepository } from "../repository";
export declare class GeneralData_CoarseAggregate_Service {
    private readonly coarseAggregateRepository;
    private readonly materialsRepository;
    private logger;
    constructor(coarseAggregateRepository: CoarseAggregateSpecificMassRepository, materialsRepository: MaterialsRepository);
    verifyInitCoarseAggregate({ name, material }: any): Promise<boolean>;
}
