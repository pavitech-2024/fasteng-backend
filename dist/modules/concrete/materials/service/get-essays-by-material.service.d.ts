import { ConcreteGranulometryRepository } from "../../essays/granulometry/repository";
import { ChapmanRepository } from "../../essays/chapman/repository";
import { UnitMassRepository } from "../../essays/unitMass/repository";
import { SandIncreaseRepository } from "../../essays/sand-increase/repository";
import { CoarseAggregateSpecificMassRepository } from "../../essays/coarseAggregate/repository";
export declare class GetEssaysByMaterial_Service {
    private readonly granulometryRepository;
    private readonly chapmanRepository;
    private readonly unitMassRepository;
    private readonly sandIncreaseRepository;
    private readonly coarseAggregateSpecificMassRepository;
    private logger;
    constructor(granulometryRepository: ConcreteGranulometryRepository, chapmanRepository: ChapmanRepository, unitMassRepository: UnitMassRepository, sandIncreaseRepository: SandIncreaseRepository, coarseAggregateSpecificMassRepository: CoarseAggregateSpecificMassRepository);
    getEssaysByMaterial(material: any): Promise<any[]>;
    findTypeExperiment(typeMaterial: any): string[];
}
