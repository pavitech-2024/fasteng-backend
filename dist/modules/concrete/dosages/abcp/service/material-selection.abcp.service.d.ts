import { ConcreteGranulometryRepository } from "../../../../../modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "../../../../../modules/concrete/essays/unitMass/repository";
import { MaterialsRepository } from "../../../../../modules/concrete/materials/repository";
import { ABCPRepository } from "../repository";
import { MaterialSelectionDataDto } from "../dto/save-material-selection.dto";
import { Model } from "mongoose";
import { ABCPDocument } from "../schemas";
export declare class MaterialSelection_ABCP_Service {
    private abcpModel;
    private readonly material_repository;
    private readonly granulometry_repository;
    private readonly unit_mass_repository;
    private readonly abcpRepository;
    private logger;
    constructor(abcpModel: Model<ABCPDocument>, material_repository: MaterialsRepository, granulometry_repository: ConcreteGranulometryRepository, unit_mass_repository: UnitMassRepository, abcpRepository: ABCPRepository);
    getMaterials(userId: string): Promise<import("../../../materials/schemas").Material[]>;
    saveMaterials(body: MaterialSelectionDataDto, userId: string): Promise<boolean>;
}
