import { MaterialsRepository } from "../../../../../modules/concrete/materials/repository";
import { ConcreteGranulometryRepository } from "../../../../../modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "../../../../../modules/concrete/essays/unitMass/repository";
import { Calc_ABCP_Dto, Calc_ABCP_Out } from "../dto/abcp-calculate-results.dto";
export declare class Calculate_ABCP_Results_Service {
    private readonly material_repository;
    private readonly granulometry_repository;
    private readonly unit_mass_repository;
    private logger;
    constructor(material_repository: MaterialsRepository, granulometry_repository: ConcreteGranulometryRepository, unit_mass_repository: UnitMassRepository);
    calculateAbcpDosage({ materialSelectionData, essaySelectionData, insertParamsData }: Calc_ABCP_Dto): Promise<{
        success: boolean;
        result: Calc_ABCP_Out;
    }>;
    calculateAc(fcj: number, cementResistance: number): any;
    calculateCa(reduction: number, maxDiameter: number): number;
    calculateCC(ca: number, ac: number): number;
    calculateCb(maxDiameter: number, finenessModule: number, unitMass: number): number;
    calculateCareia(cc: number, SPCement: number, cb: number, SPBrita: number, ca: number, SPAreia: number): number;
}
