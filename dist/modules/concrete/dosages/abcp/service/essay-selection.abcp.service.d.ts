import { MaterialsRepository } from "../../../../../modules/concrete/materials/repository";
import { ConcreteGranulometryRepository } from "../../../../../modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "../../../../../modules/concrete/essays/unitMass/repository";
import { ABCPEssaySelectionDto } from "../dto/abcp-essay-selection.dto";
import { ABCPRepository } from "../repository";
import { EssaySelectionDataDto } from "../dto/save-essay-selection.dto";
import { Model } from "mongoose";
import { ABCPDocument } from "../schemas";
export declare class EssaySelection_ABCP_Service {
    private abcpModel;
    private readonly material_repository;
    private readonly granulometry_repository;
    private readonly unit_mass_repository;
    private readonly abcpRepository;
    private logger;
    constructor(abcpModel: Model<ABCPDocument>, material_repository: MaterialsRepository, granulometry_repository: ConcreteGranulometryRepository, unit_mass_repository: UnitMassRepository, abcpRepository: ABCPRepository);
    getEssays({ cement, coarseAggregate, fineAggregate }: ABCPEssaySelectionDto): Promise<{
        cementData: import("../../../materials/schemas").Material;
        coarseAggregateData: {
            _id: string;
            name: string;
            granulometrys: import("../../../essays/granulometry/schemas").Granulometry[];
            unit_masses: import("../../../essays/unitMass/schemas").UnitMass[];
        };
        fineAggregateData: {
            _id: string;
            name: string;
            granulometrys: import("../../../essays/granulometry/schemas").Granulometry[];
        };
    }>;
    saveEssays(body: EssaySelectionDataDto, userId: string): Promise<boolean>;
}
